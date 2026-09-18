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
  var ALLOW = [
    'idle',        // 待机呼吸（必需）
    'sleep',       // 打盹，招牌动作
    'drag',        // 拖拽（DeskPet 必需）
    'squash',      // 落地挤压（DeskPet 必需）
    'look-around', // 东张西望
    'yawn',        // 打哈欠
    'muse',        // 碎碎念
    'eat-token',   // 吃 token —— 和计费那一页呼应
    'click-wave',  // 被点时的反应
    'wake-up'      // 睡着被点醒
  ];

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

    lib.probeAlphaSupport().then(function (ok) {
      if (!ok) { staticFallback(base); return; }

      var pet = new lib.DeskPet({
        allow: ALLOW,
        roam: false,
        width: { min: 168, max: 260, ratio: 0.17 },
        posKey: POS_KEY,
        defaultFx: 0.97,
        ariaLabel: '文档站小助手，可以拖动'
      });

      pet.onActBubble = function () { pet.bubble(pick(ACT_LINES)); };
      pet.onPokeBubble = function () { pet.bubble(pick(POKE_LINES)); };

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
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
