// Screen-activity engine. Works with touch (smartboard, iPad), mouse, keyboard arrows, or a presentation clicker.
// Page markup: <main class="stage"> with <section class="slide"> children. Inside a slide:
//   .reveal                        appears one at a time on Next (like PowerPoint builds)
//   [data-count]                   kids tap to number it 1, 2, 3...; the slide's .counter shows the total
//   .choices > .choice[data-right] tap: the right one turns green, others say "try again"
//   .notes                         teacher talking points (never shown to the class by default)
// Ways to open the same file:
//   normal              the board. 📝 pops this slide's notes up for a moment (or press N).
//   ?presenter          presenter view for the teacher's laptop: notes, current + next slide, timer.
//                       It opens/controls the board window; tapping ▶ on either one moves both.
//   ?script             a printable script card: every slide, small, with its notes beside it.
//   ?teacher            preview: every slide's notes shown under it.
(function () {
  var root = document.documentElement, body = document.body, q = location.search;
  var MODE = /[?&]presenter\b/.test(q) ? 'presenter' : /[?&]script\b/.test(q) ? 'script' : /[?&]teacher\b/.test(q) ? 'teacher' : 'board';
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var notesOf = slides.map(function (s) { var n = s.querySelector('.notes'); return n ? n.innerHTML : '<span class="muted">No notes for this slide.</span>'; });
  var cur = 0;

  // ---------- Theme + full screen ----------
  var modes = ['auto', 'light', 'dark'], mode = 'auto', themeBtn = document.getElementById('themeBtn');
  try { mode = localStorage.getItem('kit-theme') || 'auto'; } catch (e) {}
  function applyTheme() { if (mode === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', mode); if (themeBtn) themeBtn.textContent = mode === 'dark' ? '☾ Dark' : (mode === 'light' ? '☀ Light' : '◐ Auto'); }
  if (themeBtn) themeBtn.addEventListener('click', function () { mode = modes[(modes.indexOf(mode) + 1) % 3]; try { localStorage.setItem('kit-theme', mode); } catch (e) {} applyTheme(); });
  applyTheme();
  var fsBtn = document.getElementById('fsBtn');
  if (fsBtn) fsBtn.addEventListener('click', function () {
    var d = document, el = d.documentElement;
    if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else if (el.requestFullscreen || el.webkitRequestFullscreen) (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
  });

  // ---------- Slide state: which slide, and how many reveals are showing ----------
  function reveals(i) { return slides[i].querySelectorAll('.reveal'); }
  function shownCount(i) { return slides[i].querySelectorAll('.reveal.show').length; }
  function setShown(i, k) { Array.prototype.forEach.call(reveals(i), function (r, j) { r.classList.toggle('show', j < k); }); }
  var listeners = [];
  function changed(fromRemote) { listeners.forEach(function (f) { f(fromRemote); }); }
  function next() {
    var k = shownCount(cur);
    if (k < reveals(cur).length) setShown(cur, k + 1);
    else if (cur < slides.length - 1) cur++;
    else return;
    changed(false);
  }
  function back() {
    var k = shownCount(cur);
    if (k > 0) setShown(cur, k - 1);
    else if (cur > 0) cur--;
    else return;
    changed(false);
  }
  function setState(c, k) { cur = Math.max(0, Math.min(slides.length - 1, c)); setShown(cur, k); changed(true); }
  document.addEventListener('keydown', function (e) {
    if (e.target.matches && e.target.matches('input, textarea')) return;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].indexOf(e.key) >= 0) { e.preventDefault(); next(); }
    if (['ArrowLeft', 'PageUp', 'Backspace'].indexOf(e.key) >= 0) { e.preventDefault(); back(); }
    if ((e.key === 'n' || e.key === 'N') && MODE === 'board' && window.kitToggleNotes) window.kitToggleNotes();
  });

  // ---------- Two windows talking: presenter <-> board (works from a plain file, no internet) ----------
  var peer = null;
  function send(msg) { try { if (peer && !peer.closed) peer.postMessage(msg, '*'); } catch (e) {} }
  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (!d.kit) return;
    if (!peer) peer = e.source;
    if (d.kit === 'state') setState(d.cur, d.shown);
    if (d.kit === 'hello') send({ kit: 'state', cur: cur, shown: shownCount(cur) });
    if (d.kit === 'bye' && window.kitStatus) window.kitStatus(false);
  });
  listeners.push(function (fromRemote) { if (!fromRemote) send({ kit: 'state', cur: cur, shown: shownCount(cur) }); });
  window.addEventListener('beforeunload', function () { send({ kit: 'bye' }); });
  function baseURL() { return location.href.split('?')[0].split('#')[0]; }

  // ---------- Tap-to-count and whole-class choices (board) ----------
  slides.forEach(function (s) {
    var n = 0, items = s.querySelectorAll('[data-count]'), out = s.querySelector('.counter');
    Array.prototype.forEach.call(items, function (it) {
      it.addEventListener('click', function () {
        if (it.getAttribute('data-counted')) return;
        n++; it.setAttribute('data-counted', n);
        var bb = it.getBBox ? it.getBBox() : null;
        if (bb && it.ownerSVGElement) {
          var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          t.setAttribute('x', bb.x + bb.width / 2); t.setAttribute('y', bb.y + bb.height / 2 + 14);
          t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', 40); t.setAttribute('class', 'count-badge');
          t.setAttribute('style', 'fill:#fff;stroke:#000;stroke-width:1.5;paint-order:stroke'); t.textContent = n;
          it.parentNode.appendChild(t);
        } else { it.textContent = n; }
        if (out) out.textContent = n;
      });
    });
    var reset = s.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', function () {
      n = 0; if (out) out.textContent = '0';
      Array.prototype.forEach.call(items, function (it) { it.removeAttribute('data-counted'); });
      Array.prototype.forEach.call(s.querySelectorAll('.count-badge'), function (b) { b.remove(); });
    });
  });
  document.querySelectorAll('.choices').forEach(function (g) {
    var say = g.parentNode.querySelector('.say');
    g.querySelectorAll('.choice').forEach(function (b) {
      b.addEventListener('click', function () {
        var ok = b.hasAttribute('data-right');
        b.classList.add(ok ? 'right' : 'try');
        if (say) say.textContent = ok ? (g.getAttribute('data-yes') || 'Yes!') : (g.getAttribute('data-no') || 'Try again!');
      });
    });
  });

  // =====================================================================
  if (MODE === 'board' || MODE === 'teacher') {
    if (MODE === 'teacher') body.classList.add('teacher');
    var nextBtn = document.getElementById('nextBtn'), backBtn = document.getElementById('backBtn'), dots = document.getElementById('dots');
    slides.forEach(function () { dots.appendChild(document.createElement('span')); });
    nextBtn.addEventListener('click', next); backBtn.addEventListener('click', back);
    // Notes drawer: pops up this slide's notes on the board, for a quick peek
    var drawer = document.createElement('div'); drawer.className = 'notes-drawer'; drawer.setAttribute('aria-live', 'polite'); body.appendChild(drawer);
    var notesBtn = document.getElementById('notesBtn');
    var drawerToggle = function () { drawer.classList.toggle('open'); drawer.innerHTML = '<b>Notes · slide ' + (cur + 1) + '</b>' + notesOf[cur]; };
    window.kitToggleNotes = drawerToggle;
    if (notesBtn) notesBtn.addEventListener('click', drawerToggle);
    drawer.addEventListener('click', drawerToggle);
    var presBtn = document.getElementById('presBtn');
    if (presBtn) presBtn.addEventListener('click', function () {
      var w = window.open(baseURL() + '?presenter', 'kit-presenter', 'width=1200,height=800');
      if (w) { peer = w; } else alert('Your browser blocked the presenter window. Allow pop-ups for this file, then tap again.');
    });
    if (window.opener) { peer = window.opener; send({ kit: 'hello' }); }
    var render = function () {
      slides.forEach(function (s, i) { s.classList.toggle('active', i === cur); });
      Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === cur); });
      backBtn.style.visibility = cur === 0 && !shownCount(0) ? 'hidden' : 'visible';
      nextBtn.style.visibility = cur === slides.length - 1 && shownCount(cur) === reveals(cur).length ? 'hidden' : 'visible';
      if (drawer.classList.contains('open')) drawer.innerHTML = '<b>Notes · slide ' + (cur + 1) + '</b>' + notesOf[cur];
    };
    listeners.push(render); render();
  }

  // =====================================================================
  if (MODE === 'script') {
    body.classList.add('script');
    var title = document.title;
    var wrap = document.createElement('div'); wrap.className = 'script-wrap';
    wrap.innerHTML = '<h1 class="script-title">' + title + ' · Script card</h1><p class="script-sub">Each slide with its talking points. Print this, or keep it open on your laptop.</p>';
    slides.forEach(function (s, i) {
      var row = document.createElement('div'); row.className = 'script-row';
      var thumb = document.createElement('div'); thumb.className = 'thumb'; var inner = document.createElement('div'); inner.className = 'thumb-inner';
      var c = s.cloneNode(true); c.classList.add('active'); c.querySelectorAll('.reveal').forEach(function (r) { r.classList.add('show'); }); c.querySelectorAll('.notes').forEach(function (n) { n.remove(); });
      inner.appendChild(c); thumb.appendChild(inner);
      var n = document.createElement('div'); n.className = 'script-notes'; n.innerHTML = '<div class="num">Slide ' + (i + 1) + '</div>' + notesOf[i];
      row.appendChild(thumb); row.appendChild(n); wrap.appendChild(row);
    });
    document.querySelector('.stage').replaceWith(wrap);
  }

  // =====================================================================
  if (MODE === 'presenter') {
    body.classList.add('presenter');
    document.title = 'Presenter · ' + document.title;
    var pv = document.createElement('div'); pv.className = 'pv';
    pv.innerHTML =
      '<div class="pv-top"><span class="pv-title"></span><span class="pv-count"></span><span class="pv-clock" title="Time since you opened this">0:00</span>' +
      '<span class="pv-status"></span><button class="tool" id="openBoard">Open board window ↗</button></div>' +
      '<div class="pv-main"><div class="pv-left"><div class="pv-label">On the board now</div><div class="frame" id="nowFrame"><div class="frame-inner"></div></div>' +
      '<div class="pv-label">Next</div><div class="frame small" id="nextFrame"><div class="frame-inner"></div></div></div>' +
      '<div class="pv-right"><div class="pv-label">Talking points</div><div class="pv-notes" id="pvNotes"></div></div></div>' +
      '<div class="pv-nav"><button class="nav back" id="pvBack">◀ Back</button><span class="pv-tip">Tap ▶ here or on the board. Both move together.</span><button class="nav next" id="pvNext">Next ▶</button></div>';
    document.querySelector('.stage').replaceWith(pv);
    pv.querySelector('.pv-title').textContent = document.title.replace('Presenter · ', '');
    document.getElementById('pvBack').addEventListener('click', back);
    document.getElementById('pvNext').addEventListener('click', next);
    var statusEl = pv.querySelector('.pv-status');
    var setStatus = function (on) { statusEl.textContent = on ? '● Board connected' : '○ Board not connected'; statusEl.className = 'pv-status ' + (on ? 'on' : 'off'); };
    window.kitStatus = setStatus;
    document.getElementById('openBoard').addEventListener('click', function () {
      var w = window.open(baseURL(), 'kit-board', 'width=1280,height=760');
      if (w) { peer = w; setStatus(true); setTimeout(function () { send({ kit: 'state', cur: cur, shown: shownCount(cur) }); }, 600); }
      else alert('Your browser blocked the board window. Allow pop-ups for this file, then tap again.');
    });
    if (window.opener) { peer = window.opener; setStatus(true); send({ kit: 'hello' }); } else setStatus(false);
    window.addEventListener('message', function (e) { if (e.data && e.data.kit && e.data.kit !== 'bye') setStatus(true); });
    function fill(frameId, i, k) {
      var inner = document.querySelector('#' + frameId + ' .frame-inner'); inner.innerHTML = '';
      if (i >= slides.length) { inner.innerHTML = '<div class="end">End</div>'; return; }
      var c = slides[i].cloneNode(true); c.classList.add('active'); c.querySelectorAll('.notes').forEach(function (n) { n.remove(); });
      Array.prototype.forEach.call(c.querySelectorAll('.reveal'), function (r, j) { r.classList.toggle('show', j < k); });
      inner.appendChild(c);
    }
    function fit() { document.querySelectorAll('.frame').forEach(function (f) { f.querySelector('.frame-inner').style.transform = 'scale(' + (f.clientWidth / 1600) + ')'; }); }
    window.addEventListener('resize', fit);
    var renderP = function () {
      var k = shownCount(cur), total = reveals(cur).length;
      fill('nowFrame', cur, k);
      if (k < total) fill('nextFrame', cur, k + 1); else fill('nextFrame', cur + 1, 0);
      document.getElementById('pvNotes').innerHTML = notesOf[cur];
      pv.querySelector('.pv-count').textContent = 'Slide ' + (cur + 1) + ' of ' + slides.length + (total ? ' · step ' + k + ' of ' + total : '');
      fit();
    };
    listeners.push(renderP); renderP();
    var t0 = Date.now(), clock = pv.querySelector('.pv-clock');
    setInterval(function () { var s = Math.floor((Date.now() - t0) / 1000); clock.textContent = Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }, 1000);
  }
})();
