/* ============================================================
   AIIntroduceCourse — 幻灯片控制脚本
   无任何外部依赖，双击 HTML 即可离线放映。
   ============================================================ */
(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  var stage = document.getElementById('stage');
  var progress = document.getElementById('progress');
  var toastEl = document.getElementById('toast');
  var notesPanel = document.getElementById('notes-panel');
  var current = 0;
  var overview = false;

  /* ---------- 页脚：页码 / 品牌 ---------- */
  slides.forEach(function (s, i) {
    var f = s.querySelector('.footer');
    if (!f) return;
    var pg = f.querySelector('.pgnum');
    if (pg) pg.textContent = (i + 1) + ' / ' + slides.length;
  });

  /* ---------- 缩放舞台 ---------- */
  function fit() {
    if (overview || document.body.classList.contains('overview-on')) return;
    var pad = 0;
    var s = Math.min((window.innerWidth - pad) / 1280, (window.innerHeight - pad) / 720);
    stage.style.transform = 'scale(' + s + ')';
  }

  /* ---------- 显示某页 ---------- */
  function show(i, silent) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, k) { s.classList.toggle('active', k === current); });
    if (progress) {
      progress.style.width = ((current + 1) / slides.length * 100) + '%';
    }
    var pos = document.querySelector('#hud .pos');
    if (pos) pos.textContent = (current + 1) + '/' + slides.length;

    var n = slides[current].querySelector('.notes');
    if (notesPanel) {
      notesPanel.innerHTML = n
        ? '<h4>讲稿 · 第 ' + (current + 1) + ' 页</h4>' + n.innerHTML
        : '<h4>讲稿 · 第 ' + (current + 1) + ' 页</h4><p class="dim">（这一页没有写讲稿，看图说话或让学生自己读。）</p>';
    }

    if (!silent) {
      var h = '#s' + (current + 1);
      if (location.hash !== h) history.replaceState(null, '', h);
    }
  }

  function next() { if (current < slides.length - 1) show(current + 1); }
  function prev() { if (current > 0) show(current - 1); }

  /* ---------- 总览 ---------- */
  function toggleOverview(force) {
    overview = typeof force === 'boolean' ? force : !overview;
    document.body.classList.toggle('overview-on', overview);
    if (!overview) fit();
    toast(overview ? '总览模式：点任意一页跳转，再按 O 退出' : '已退出总览');
  }

  /* ---------- 讲稿 ---------- */
  function toggleNotes(force) {
    var on = typeof force === 'boolean' ? force : !(notesPanel && notesPanel.classList.contains('on'));
    if (notesPanel) notesPanel.classList.toggle('on', on);
    toast(on ? '讲稿模式：按 S 收起' : '已收起讲稿');
  }

  /* ---------- 明暗 ---------- */
  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var nx = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nx);
    try { localStorage.setItem('deck-theme', nx); } catch (e) {}
    toast(nx === 'dark' ? '暗色（适合关灯的教室）' : '亮色（适合开灯 / 投影）');
  }

  /* ---------- 全屏 ---------- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      (document.documentElement.requestFullscreen || function () {}).call(document.documentElement);
    } else {
      (document.exitFullscreen || function () {}).call(document);
    }
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 1900);
  }

  /* ---------- 键盘 ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;

    if (k === 'o' || k === 'O') { e.preventDefault(); toggleOverview(); return; }
    if (k === 's' || k === 'S') { e.preventDefault(); toggleNotes(); return; }
    if (k === 't' || k === 'T') { e.preventDefault(); toggleTheme(); return; }
    if (k === 'f' || k === 'F') { e.preventDefault(); toggleFullscreen(); return; }
    if (k === 'p' || k === 'P') { e.preventDefault(); window.print(); return; }
    if (k === '?' || k === '/') {
      e.preventDefault();
      toast('← → 翻页 · O 总览 · S 讲稿 · F 全屏 · T 明暗 · P 导出 PDF');
      return;
    }
    if (k === 'Escape') { if (overview) { e.preventDefault(); toggleOverview(false); } return; }
    if (overview) {
      if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); next(); }
      if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); prev(); }
      return;
    }

    switch (k) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': case 'Enter':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(slides.length - 1); break;
      default: break;
    }
  });

  /* ---------- 总览里点击跳转 ---------- */
  slides.forEach(function (s, i) {
    s.addEventListener('click', function () {
      if (overview) { show(i); toggleOverview(false); }
    });
  });

  /* ---------- 鼠标滚轮（总览时禁用） ---------- */
  var wheelLock = false;
  window.addEventListener('wheel', function (e) {
    if (overview) return;
    if (wheelLock) return;
    if (Math.abs(e.deltaY) < 12) return;
    wheelLock = true;
    setTimeout(function () { wheelLock = false; }, 520);
    if (e.deltaY > 0) next(); else prev();
  }, { passive: true });

  /* ---------- HUD 按钮 ---------- */
  var hud = document.getElementById('hud');
  if (hud) {
    hud.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'prev') prev();
      else if (a === 'next') next();
      else if (a === 'ov') toggleOverview();
      else if (a === 'notes') toggleNotes();
      else if (a === 'theme') toggleTheme();
      else if (a === 'fs') toggleFullscreen();
      else if (a === 'print') window.print();
    });
  }

  /* ---------- 触摸屏（教室一体机 / 平板） ---------- */
  var tx = 0, ty = 0;
  window.addEventListener('touchstart', function (e) {
    tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (overview) return;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  /* ---------- 溢出体检（控制台提示，备课时用） ---------- */
  function auditOverflow() {
    var bad = [];
    var minGap = Infinity, minGapPage = 0;

    slides.forEach(function (s, i) {
      // 非当前页是 display:none，必须先临时布局出来才能量到真实尺寸
      var wasActive = s.classList.contains('active');
      if (!wasActive) {
        s.style.display = 'flex';
        s.style.visibility = 'hidden';
      }

      var body = s.querySelector('.body');
      if (body) {
        var over = body.scrollHeight - body.clientHeight;
        if (over > 2) bad.push('p' + (i + 1) + ' body +' + over + 'px');
      }
      var slideOver = s.scrollHeight - s.clientHeight;
      if (slideOver > 2) bad.push('p' + (i + 1) + ' slide +' + slideOver + 'px');

      // 内容最低点距离幻灯片下边缘还剩多少
      var sr = s.getBoundingClientRect();
      var maxB = sr.top;
      var els = s.querySelectorAll('.body *');
      for (var k = 0; k < els.length; k++) {
        var r = els[k].getBoundingClientRect();
        if (r.bottom > maxB) maxB = r.bottom;
      }
      var gap = Math.round(sr.bottom - maxB);
      if (gap < minGap) { minGap = gap; minGapPage = i + 1; }

      if (!wasActive) {
        s.style.display = '';
        s.style.visibility = '';
      }
    });

    if (minGap < 8) bad.push('p' + minGapPage + ' 贴底(' + minGap + 'px)');

    var report = bad.length
      ? 'OVERFLOW ' + bad.length + ': ' + bad.join(', ')
      : 'OK ' + slides.length + ' slides, min bottom gap ' + minGap + 'px (p' + minGapPage + ')';

    if (bad.length) console.warn('[deck] 排版问题 → ' + report);
    else console.info('[deck] 排版体检通过：' + report);

    // ?audit=1 时把结果写进标题，方便无头浏览器批量自检
    if (/[?&]audit=1/.test(location.search)) {
      document.title = 'AUDIT::' + report;
    }
  }

  /* ---------- 初始化 ---------- */
  try {
    var saved = localStorage.getItem('deck-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}

  var m = /^#s(\d+)$/.exec(location.hash);
  show(m ? parseInt(m[1], 10) - 1 : 0, true);
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('beforeprint', function () { toggleOverview(false); });
  setTimeout(auditOverflow, 350);

  window.addEventListener('hashchange', function () {
    var mm = /^#s(\d+)$/.exec(location.hash);
    if (mm) show(parseInt(mm[1], 10) - 1, true);
  });

  window.deck = { show: show, next: next, prev: prev, slides: slides };
})();
