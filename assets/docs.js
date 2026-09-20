/* ============================================================
   人工智能导论 · 实操手册
   页面外壳由本脚本渲染，改导航只需改下面的 NAV。
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 导航（加页面 = 在这里加一行） ---------------- */

  var NAV = [
    { group: '开始', items: [
      { f: 'index.html',        n: '0', t: '这份手册怎么用' },
      { f: 'c-vibe.html',       n: '1', t: '先说说 vibe coding' }
    ]},
    { group: '原理 · 第 1 节课', items: [
      { f: 'c-agent.html',      n: '2', t: '模型与 Agent' },
      { f: 'c-prompt.html',     n: '3', t: '怎么跟 Agent 说话' },
      { f: 'c-session.html',    n: '4', t: '会话与上下文' },
      { f: 'c-paradigms.html',  n: '5', t: '三种经典范式' },
      { f: 'c-loop.html',       n: '6', t: 'Agent 循环' },
      { f: 'c-harness.html',    n: '7', t: 'Harness：模型怎么变成产品' },
      { f: 'c-skills.html',     n: '8', t: '怎么用 Skill' },
      { f: 'c-tools.html',      n: '9', t: '工具地图与怎么选' }
    ]},
    { group: '动手 · 第 2–3 节课', items: [
      { f: 'api.html',          n: '10', t: '拿到你的 API Key' },
      { f: 'node.html',         n: '11', t: '安装 Node.js' },
      { f: 'dsh.html',          n: '12', t: 'DeepSeek Harness' },
      { f: 'claude-code.html',  n: '13', t: 'Claude Code' },
      { f: 'codex.html',        n: '14', t: 'Codex' },
      { f: 'cc-switch.html',    n: '15', t: 'cc-switch' }
    ]},
    { group: '其他', items: [
      { f: 'relay.html',        n: '16', t: '想用别的模型' },
      { f: 'tasks.html',        n: '17', t: '四个练习任务' }
    ]},
    { group: '帮助', items: [
      { f: 'help.html',         n: '18', t: '排错 · 术语 · 速查' }
    ]}
  ];
  var FLAT = [];
  NAV.forEach(function (g) { g.items.forEach(function (it) { FLAT.push(it); }); });

  /* 当前是哪个页面。
     注意：Cloudflare 的 assets 用 auto-trailing-slash，会把 /c-loop.html 307 跳到 /c-loop，
     所以 location 最后一段可能没有 .html，必须归一化后再跟 NAV 比对，
     否则 curIdx 会变成 -1 —— 侧栏就没有当前项高亮，上下页按钮也会双双变空。 */
  var here = (function (path) {
    var last = decodeURIComponent(path.split('/').pop() || '');
    last = last.replace(/\.html?$/i, '');
    return last ? last + '.html' : 'index.html';
  })(location.pathname);
  var curIdx = -1;
  FLAT.forEach(function (it, i) { if (it.f === here) curIdx = i; });
  var cur = curIdx >= 0 ? FLAT[curIdx] : FLAT[0];

  /* ---------------- 工具 ---------------- */

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); }
    catch (e) { return null; }
  }
  function toast(msg) {
    var t = document.getElementById('docs-toast');
    if (!t) { t = el('div', ''); t.id = 'docs-toast';
      t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);' +
        'background:rgba(16,21,39,.94);color:#fff;padding:9px 16px;border-radius:10px;' +
        'font:600 13.5px/1 var(--font);z-index:99;opacity:0;transition:opacity .2s;pointer-events:none';
      document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = '1';
    clearTimeout(t._h); t._h = setTimeout(function () { t.style.opacity = '0'; }, 1600);
  }

  /* ---------------- 明暗 ---------------- */

  function applyTheme(v) { document.documentElement.setAttribute('data-theme', v); store('docs-theme', v); }

  /* ---------------- 操作系统 ---------------- */

  function guessOS() {
    var ua = (navigator.userAgent || '') + ' ' + (navigator.platform || '');
    return /Win/i.test(ua) ? 'win' : 'mac';
  }
  function applyOS(v) {
    document.documentElement.setAttribute('data-os', v);
    store('docs-os', v);
    document.querySelectorAll('[data-set-os]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-set-os') === v);
    });
  }

  /* ---------------- 侧栏 ---------------- */

  /* ---------------- 手机端：目录抽屉 ---------------- */

  /* 窄屏下侧栏变成浮层。加一层遮罩，点遮罩或按 Esc 都能关掉，
     否则手指划到正文却还在抽屉里，只能再点一次「目录」。 */
  function setNav(open) {
    var sb = document.getElementById('sidebar');
    if (!sb) return;
    sb.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    var mb = document.getElementById('menubtn');
    if (mb) mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    var bd = document.getElementById('navbackdrop');
    if (open && !bd) {
      bd = el('div'); bd.id = 'navbackdrop';
      bd.addEventListener('click', function () { setNav(false); });
      document.body.appendChild(bd);
    }
    if (bd) bd.hidden = !open;
  }

  /* ---------------- 窄屏：宽表 / 大图的可滑动提示 ---------------- */

  /* 那些图是按 600px 画的，手机上必须横向滑才看得清（缩到 390px 字就糊了）。
     但「能滑」这件事本身没有提示，很多人以为内容被截断了 —— 溢出时才加一行字。 */
  function buildScrollHints() {
    ['.fig', '.tw'].forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (box) {
        var need = box.scrollWidth > box.clientWidth + 2;
        var prev = box.previousElementSibling;
        var has = prev && prev.classList && prev.classList.contains('scrollhint');
        if (need && !has) {
          var h = el('div', 'scrollhint', '← 左右滑动看完整内容 →');
          box.parentNode.insertBefore(h, box);
        } else if (!need && has) {
          prev.remove();
        }
      });
    });
  }

  var hintTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(hintTimer);
    hintTimer = setTimeout(buildScrollHints, 180);
  });
  window.addEventListener('orientationchange', function () { setTimeout(buildScrollHints, 320); });

  function buildSidebar() {
    var sb = document.getElementById('sidebar');
    if (!sb) return;
    var h = '<a class="brand" href="index.html"><b>人工智能导论 · 实操手册</b>' +
            '<span>把 AI 装进你的电脑</span></a><nav>';
    NAV.forEach(function (g) {
      h += '<div class="grp">' + g.group + '</div>';
      g.items.forEach(function (it) {
        h += '<a href="' + it.f + '"' + (it.f === here ? ' class="on"' : '') + '>' +
             '<span class="num">' + it.n + '</span><span>' + it.t + '</span></a>';
      });
    });
    sb.innerHTML = h + '</nav>';
  }

  /* ---------------- 顶栏 ---------------- */

  function buildTopbar() {
    var tb = document.getElementById('topbar');
    if (!tb) return;
    tb.innerHTML =
      '<button class="iconbtn" id="menubtn" aria-label="目录">☰ 目录</button>' +
      '<div class="crumb">实操手册 <span class="muted">/</span> <b>' + cur.t + '</b></div>' +
      '<div class="spacer"></div>' +
      '<div class="os-switch" role="group" aria-label="切换操作系统">' +
        '<button data-set-os="mac"><span class="full">macOS / Linux</span><span class="short">Mac</span></button>' +
        '<button data-set-os="win"><span class="full">Windows</span><span class="short">Win</span></button>' +
      '</div>' +
      '<button class="iconbtn" id="themebtn" title="切换明暗">◐</button>';

    tb.querySelectorAll('[data-set-os]').forEach(function (b) {
      b.addEventListener('click', function () {
        applyOS(b.getAttribute('data-set-os'));
        toast(b.getAttribute('data-set-os') === 'win' ? '已切换为 Windows 命令' : '已切换为 macOS / Linux 命令');
      });
    });
    var mb = document.getElementById('menubtn');
    if (mb) {
      mb.setAttribute('aria-expanded', 'false');
      mb.addEventListener('click', function () {
        var sb = document.getElementById('sidebar');
        setNav(!(sb && sb.classList.contains('open')));
      });
    }
    var tb2 = document.getElementById('themebtn');
    if (tb2) tb2.addEventListener('click', function () {
      applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------------- 正文标题锚点 + 右侧目录 ---------------- */

  function buildTOC() {
    var art = document.querySelector('article');
    if (!art) return;
    var hs = art.querySelectorAll('h2, h3');
    if (hs.length < 2) return;
    document.body.classList.add('has-toc');

    var list = [];
    hs.forEach(function (h, i) {
      if (!h.id) h.id = 'sec-' + (i + 1);
      var a = el('a', 'anchor', '#');
      a.href = '#' + h.id;
      h.appendChild(a);
      list.push(h);
    });

    var toc = document.getElementById('toc');
    if (!toc) return;
    var h = '<div class="h">本页内容</div>';
    list.forEach(function (x) {
      h += '<a href="#' + x.id + '"' + (x.tagName === 'H3' ? ' class="lv3"' : '') + '>' +
           x.textContent.replace(/#$/, '') + '</a>';
    });
    toc.innerHTML = h;

    var links = toc.querySelectorAll('a');
    function spy() {
      var y = window.scrollY + 96, best = 0;
      list.forEach(function (x, i) { if (x.offsetTop <= y) best = i; });
      links.forEach(function (l, i) { l.classList.toggle('on', i === best); });
    }
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () { spy(); tick = false; });
    }, { passive: true });
    spy();
  }

  /* ---------------- 代码块复制 ---------------- */

  function buildCopy() {
    document.querySelectorAll('pre').forEach(function (pre) {
      // 页面里可能已经手写了 .codeblock 包裹层，两种写法都要能处理
      var box;
      if (pre.parentNode && pre.parentNode.classList && pre.parentNode.classList.contains('codeblock')) {
        box = pre.parentNode;
      } else {
        box = el('div', 'codeblock');
        pre.parentNode.insertBefore(box, pre);
        box.appendChild(pre);
      }
      if (box.querySelector('.copy')) return;

      var lang = pre.getAttribute('data-lang');
      var codeEl = pre.querySelector('code');
      if (!lang && codeEl) lang = codeEl.getAttribute('data-lang');
      if (lang) {
        if (!box.querySelector('.lang')) box.appendChild(el('span', 'lang', lang));
      } else {
        pre.classList.add('nohead');
      }

      var btn = el('button', 'copy', '复制');
      btn.type = 'button';
      box.appendChild(btn);

      btn.addEventListener('click', function () {
        var text = pre.innerText.replace(/\n$/, '');
        var done = function () {
          btn.textContent = '已复制'; btn.classList.add('done');
          setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('done'); }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
        } else { fallback(text, done); }
      });
    });

    function fallback(text, done) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-1000px;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); }
      catch (e) { toast('复制失败，请手动选中复制'); }
      document.body.removeChild(ta);
    }
  }

  /* ---------------- 勾选清单（进度会被记住） ---------------- */

  function buildChecklist() {
    var lists = document.querySelectorAll('.checklist');
    if (!lists.length) return;

    lists.forEach(function (ul, li) {
      ul.querySelectorAll('li').forEach(function (item, ii) {
        var key = 'docs-check:' + here + ':' + li + ':' + ii;
        var cb = item.querySelector('input[type=checkbox]');
        var lab = item.querySelector('label');
        if (!cb) {
          var txt = item.innerHTML;
          cb = el('input'); cb.type = 'checkbox';
          lab = el('label', '', txt);
          item.innerHTML = ''; item.appendChild(cb); item.appendChild(lab);
        }
        var id = lab && lab.getAttribute('for');
        if (id) cb.id = id;
        if (store(key) === '1') cb.checked = true;
        cb.addEventListener('change', function () {
          store(key, cb.checked ? '1' : '0');
          updateCount(ul);
        });
      });
      updateCount(ul);
    });

    function updateCount(ul) {
      var all = ul.querySelectorAll('input[type=checkbox]');
      var on = ul.querySelectorAll('input[type=checkbox]:checked').length;
      var c = ul.nextElementSibling;
      if (!c || !c.classList.contains('done-count')) {
        c = el('div', 'done-count'); ul.parentNode.insertBefore(c, ul.nextSibling);
      }
      c.textContent = on === all.length && all.length
        ? '✓ 全部完成（' + all.length + '/' + all.length + '）'
        : '已完成 ' + on + ' / ' + all.length + ' —— 勾选状态会保存在本机浏览器里';
    }
  }

  /* ---------------- 上下页 ---------------- */

  function buildPager() {
    var p = document.getElementById('pager');
    if (!p) return;
    var prev = curIdx > 0 ? FLAT[curIdx - 1] : null;
    var next = curIdx >= 0 && curIdx < FLAT.length - 1 ? FLAT[curIdx + 1] : null;
    p.innerHTML =
      (prev ? '<a href="' + prev.f + '"><span class="lbl">← 上一页</span><span class="ttl">' + prev.t + '</span></a>'
            : '<span class="empty"></span>') +
      (next ? '<a class="next" href="' + next.f + '"><span class="lbl">下一页 →</span><span class="ttl">' + next.t + '</span></a>'
            : '<span class="empty"></span>');
  }

  /* ---------------- 初始化 ---------------- */

  applyTheme(store('docs-theme') || 'light');
  // 可用 ?os=win / ?os=mac 直接指定并记住，方便把链接发给不同系统的同学
  var m = /[?&]os=(mac|win)/i.exec(location.search);
  applyOS(m ? m[1].toLowerCase() : (store('docs-os') || guessOS()));
  buildSidebar();
  buildTopbar();
  buildTOC();
  buildCopy();
  buildChecklist();
  buildPager();
  buildScrollHints();

  // 页面标题补全
  if (cur && document.title.indexOf('·') < 0) {
    document.title = cur.t + ' · 人工智能导论实操手册';
  }

  /* ---------------- 角落桌宠（可选，延迟加载） ----------------
     素材与核心逻辑来自 dsh-pet（MIT）：https://github.com/PC2005-cloud/dsh-pet
     只在桌面端加载，且等页面空闲之后再拉，不拖慢首屏。 */
  (function loadPet() {
    if (window.innerWidth < 900) return;
    var self = (document.currentScript && document.currentScript.src) || location.href;
    var base;
    try { base = new URL('pet/', self).href; } catch (e) { base = 'assets/pet/'; }

    function attach() {
      window.__PET_ASSET_BASE__ = base + 'webm/';
      var core = document.createElement('script');
      core.src = base + 'deskpet.js';
      core.onload = function () {
        var boot = document.createElement('script');
        boot.src = base + 'pet.js';
        boot.setAttribute('data-pet-base', base);
        document.body.appendChild(boot);
      };
      document.body.appendChild(core);
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(attach, { timeout: 2500 });
    } else {
      window.addEventListener('load', function () { setTimeout(attach, 800); });
    }
  })();

  // 点击正文里的锚点后关掉移动端菜单
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && window.innerWidth <= 860) {
      var sb = document.getElementById('sidebar');
      if (sb) sb.classList.remove('open');
    }
  });
})();
