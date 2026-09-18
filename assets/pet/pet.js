/*!
 * pet.js — 「人工智能导论」文档站的角落桌宠
 *
 * 由 deskpet.js 驱动。素材与核心逻辑来自 dsh-pet：
 *   https://github.com/PC2005-cloud/dsh-pet  （MIT License）
 * 这里只做三件事：挑一组贴合课程的动作、写课程相关的台词、加一个「隐藏」入口。
 *
 * 行为：
 *   · 只在桌面端（≥900px）出现；移动端整块不加载
 *   · 先用首帧探测 VP9 透明通道，不支持就降级成静态立绘，绝不显示黑框
 *   · 右下角常驻，待机/打盹/偶尔表演；点击有反应；可拖拽甩动
 *   · 悬停出现小工具条，可以关掉，关掉后记在 localStorage
 */
(function () {
  'use strict';

  var HIDE_KEY = 'aico-pet-hidden';
  var POS_KEY = 'aico-pet-pos';

  /* 挑一组贴合课程内容的动作（其余 100 个动作不下载，靠 allow 白名单挡掉） */
  /* 注意：这里的 id 必须是 deskpet.js 注册表里的 key（驼峰），
     不是 webm 文件名（短横线）—— allowed() 直接拿 key 去比。 */
  var ALLOW = [
    /* 必需：待机 / 拖拽 / 落地 */
    'idle', 'drag', 'squash',
    /* 待机系 */
    'sleep', 'lookAround', 'yawn', 'stretch', 'startled', 'wakeUp',
    /* 碎碎念：会配气泡台词 */
    'muse', 'museThink', 'museScreen',
    /* 吃货系：吃 token 和计费那一页呼应 */
    'eatToken', 'hotpot', 'iceCream',
    /* 点击反应池：5 个，每次点击随机抽一个（这是点击手感的关键） */
    'clickWave', 'clickJoy', 'clickAngry', 'clickShy', 'clickGiggle'
  ];
  /* 不同点击反应配不同台词，让每一下都有回应 */
  var CLICK_LINES = {
    clickAngry:  ['别戳了别戳了', '再点我要记仇了', '哼，不理你了'],
    clickShy:    ['……干嘛突然点我', '诶、等一下', '别、别盯着看'],
    clickGiggle: ['嘿嘿', '被你发现了', '戳到痒痒肉了'],
    clickJoy:    ['在的在的', '需要帮忙吗？', '来啦来啦'],
    clickWave:   ['嗨～', '有事说事', '我在听']
  };
  /* 表演时随机的课程台词 */
  var ACT_LINES = [
    '上下文快满了，该开新会话了',
    '需要留下的东西，让它写进文件',
    '先让它出个计划，再放它动手',
    '别把 API Key 贴进群里！',
    'vibe coding 也要看真实结果',
    '卡住三次就改需求，别改代码',
    '让它自己跑一遍，别替它转述报错',
    '这个结论记得写进 notes.md'
  ];

  /* 被点时的台词 */
  var POKE_LINES = [
    '干嘛呀，我在看报错呢',
    '点我一下能省 token 吗？',
    '诶——别拽我尾巴',
    '嗯？要我帮你读论文吗',
    '先划好边界再让我动手哦'
  ];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function injectCss() {
    if (document.getElementById('aico-pet-css')) return;
    var style = document.createElement('style');
    style.id = 'aico-pet-css';
    style.textContent = [
      '#pet-root .pet-dock{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);',
      'display:flex;gap:6px;margin-bottom:6px;opacity:0;visibility:hidden;pointer-events:auto;',
      'transition:opacity .18s ease,visibility .18s ease}',
      '#pet-root:hover .pet-dock,#pet-root .pet-dock:hover,#pet-root .pet-dock:focus-within{opacity:1;visibility:visible}',
      '#pet-root.speaking .pet-dock{bottom:calc(100% + 84px)}',
      '#pet-root .pet-dock button{border:1px solid var(--line);border-radius:999px;background:var(--bg, #fff);',
      'color:var(--ink-3, #6b7490);font-size:11.5px;line-height:1;padding:5px 9px;cursor:pointer;',
      'font-family:var(--font, sans-serif);box-shadow:0 2px 8px rgba(20,26,53,.10)}',
      '#pet-root .pet-dock button:hover{color:var(--blue-d, #2f4be0);border-color:var(--blue-line, #c9d5ff)}',
      '#pet-root .pet-bubble{background:var(--blue, #4d6bfe)}',
      '#pet-root .pet-bubble::after{background:var(--blue, #4d6bfe)}',
      '@media (max-width:899px){#pet-root{display:none !important}}',
      '@media print{#pet-root{display:none !important}}'
    ].join('');
    document.head.appendChild(style);
  }

  /* 降级立绘：不支持 VP9 透明通道时用静态图，避免出现黑底方块 */
  function staticFallback(base) {
    injectCss();
    var root = document.createElement('div');
    root.id = 'pet-root';
    root.style.cssText = 'position:fixed;right:18px;bottom:12px;z-index:1200;pointer-events:auto;' +
      'transition:transform .18s ease;transform:translateY(0)';
    var img = document.createElement('img');
    img.src = base + 'fallback.jpg';
    img.alt = '';
    img.style.cssText = 'display:block;width:190px;height:auto;border:0;border-radius:14px;' +
      'background:none;cursor:pointer;filter:drop-shadow(0 6px 18px rgba(20,26,53,.18))';
    root.appendChild(img);
    document.body.appendChild(root);
    img.addEventListener('click', function () {
      root.style.transform = 'translateY(-6px)';
      setTimeout(function () { root.style.transform = 'translateY(0)'; }, 220);
    });
    return root;
  }

  /* 探针偶尔会因为网络抖动读不到视频首帧而误判「不支持透明」，
     那就再试一次；成功过就记在本机，之后不再探测。 */
  function probeWithRetry(lib) {
    var KEY = 'aico-pet-alpha';
    try { if (localStorage.getItem(KEY) === '1') return Promise.resolve(true); } catch (_) {}
    function mark(ok) {
      if (ok) { try { localStorage.setItem(KEY, '1'); } catch (_) {} }
      return ok;
    }
    return lib.probeAlphaSupport().then(function (ok) {
      if (ok) return mark(true);
      return new Promise(function (r) { setTimeout(r, 800); })
        .then(function () { return lib.probeAlphaSupport(); })
        .then(mark);
    });
  }

  function boot() {
    if (window.innerWidth < 900) return;
    try { if (localStorage.getItem(HIDE_KEY) === '1') return; } catch (_) {}

    var lib = window.DeskPetLib;
    if (!lib) return;
    var base = window.__PET_ASSET_BASE__ ||
      (function () {
        var s = document.querySelector('script[data-pet-base]');
        return s ? s.getAttribute('data-pet-base') : 'assets/pet/';
      })();

    injectCss();

    /* 先立刻挂上静态图，探针通过后再无缝换成会动的宠物。
       这样网络慢时不会出现一段时间「右下角什么都没有」。 */
    var placeholder = staticFallback(base);

    probeWithRetry(lib).then(function (ok) {
      if (!ok) return;                       // 两次都失败：留在静态图
      if (placeholder && placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);

      var pet = new lib.DeskPet({
        allow: ALLOW,
        roam: false,
        width: { min: 168, max: 260, ratio: 0.17 },
        posKey: POS_KEY,
        defaultFx: 0.97,
        ariaLabel: '文档站小助手，可以拖动'
      });

      pet.onActBubble = function () { pet.bubble(pick(ACT_LINES)); };
      pet.onPokeBubble = function () {
        var byAction = CLICK_LINES[pet.action];
        pet.bubble(byAction ? pick(byAction) : pick(POKE_LINES));
      };

      /* 点击手感：lib 的 poke() 是从 clickPool 里纯随机抽，会连着抽到同一个，
         看起来像「点了没反应」。这里包一层：
           1) 抽到和上一次相同就重摇（打盹被点醒除外）；
           2) 第一次点击必定说话，之后 35% 概率。 */
      var noop = function () {};
      var superPoke = pet.poke.bind(pet);
      var lastClick = '';
      var clicks = 0;
      pet.poke = function () {
        clicks += 1;
        var hook = pet.onPokeBubble;
        pet.onPokeBubble = noop;   // 先屏蔽 lib 内部的随机说话，统一到下面触发
        superPoke();
        var isClick = pet.clickPool.indexOf(pet.action) !== -1;
        if (isClick && pet.action === lastClick && pet.clickPool.length > 1) {
          var other = pet.clickPool.filter(function (a) { return a !== lastClick; });
          pet.play(other[Math.floor(Math.random() * other.length)]);
        }
        lastClick = pet.action;
        pet.onPokeBubble = hook;
        if (clicks === 1 || Math.random() < 0.35) hook();
      };

      // 悬停工具条：隐藏
      var dock = document.createElement('div');
      dock.className = 'pet-dock';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = '隐藏';
      btn.title = '不再显示（记在本机）';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        try { localStorage.setItem(HIDE_KEY, '1'); } catch (_) {}
        pet.destroy();
        dock.remove();
      });
      pet.root.appendChild(dock);
      dock.appendChild(btn);

      pet.start();
      window.__coursePet = pet;   // 调试用句柄：控制台里 __coursePet.poke() 即可逗它
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
