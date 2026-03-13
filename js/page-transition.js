/**
 * page-transition.js — Unified curved page transition
 *
 * Overlay structure (injected in <head> of every page):
 *   #pageOverlay
 *     .po-bg          — dark background that slides
 *     .po-text-wrap   — centered container, overflow:hidden
 *       .po-text      — the page name that slides in/out
 *
 * On leave(): sets sessionStorage flag so destination page knows
 * it came from an internal navigation (preloader should skip).
 */

const PageTransition = (() => {
  var overlay  = document.getElementById('pageOverlay');
  var bg       = overlay.querySelector('.po-bg');
  var textWrap = overlay.querySelector('.po-text-wrap');
  var textEl   = overlay.querySelector('.po-text');

  function getPageName(href) {
    if (!href) return '';
    var h = href.toLowerCase();
    if (h.includes('index.html') || h === '/' || h === './') return 'Home';
    if (h.includes('about'))      return 'About';
    if (h.includes('contact'))    return 'Contact';
    if (h.includes('restaurant')) return 'Maison Élysée';
    if (h.includes('kami'))       return 'TERRA';
    if (h.includes('aura'))       return 'AURA Studio';
    if (h.includes('aurum'))      return 'Aurum Stays';
    return '';
  }

  /* ── ENTER — bg slides up with curve, text slides in then out ── */
  function enter(onComplete) {
    overlay.style.pointerEvents = 'all';
    gsap.set(bg, { yPercent: 0, borderRadius: '0' });
    gsap.set(textEl, { yPercent: 110 });

    var tl = gsap.timeline({
      onComplete: function() {
        overlay.style.pointerEvents = 'none';
        bg.style.borderRadius = '0';
        if (onComplete) onComplete();
      }
    });

    // Text in
    tl.to(textEl, { yPercent: 0, duration: 0.45, ease: 'power3.out' }, 0);
    // Text out
    tl.to(textEl, { yPercent: -110, duration: 0.35, ease: 'power3.in' }, 0.55);
    // BG slides up with curve — single fluid motion
    tl.to(bg, {
      yPercent: -110,
      duration: 1.0,
      ease: 'power4.inOut',
      onUpdate: function() {
        var p = this.progress();
        var curve = Math.sin(p * Math.PI) * 55;
        bg.style.borderRadius = '0 0 50% 50% / 0 0 ' + curve + 'px ' + curve + 'px';
      }
    }, 0.3);
  }

  /* ── LEAVE — bg slides up from bottom with curve, text slides in ── */
  function leave(href) {
    // Flag for destination page: "I came from internal navigation"
    try { sessionStorage.setItem('ptNav', '1'); } catch(e) {}

    overlay.style.pointerEvents = 'all';
    textEl.textContent = getPageName(href);
    gsap.set(bg, { yPercent: 110, borderRadius: '0' });
    gsap.set(textEl, { yPercent: 110 });

    var tl = gsap.timeline({
      onComplete: function() {
        gsap.set(bg, { borderRadius: '0', yPercent: 0 });
        window.location.href = href;
      }
    });

    // BG slides up
    tl.to(bg, {
      yPercent: 0,
      duration: 0.85,
      ease: 'power4.inOut',
      onUpdate: function() {
        var p = this.progress();
        var curve = Math.sin(p * Math.PI) * 55;
        bg.style.borderRadius = curve + 'px ' + curve + 'px 0 0 / 50% 50% 0 0';
      }
    }, 0);
    // Text in
    tl.to(textEl, { yPercent: 0, duration: 0.45, ease: 'power3.out' }, 0.2);
  }

  /* ── Intercept links ── */
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || a.target === '_blank')
      return;
    e.preventDefault();
    leave(href);
  });

  document.addEventListener('click', function(e) {
    var item = e.target.closest('.project-item[data-href]');
    if (!item) return;
    e.preventDefault();
    leave(item.dataset.href);
  });

  /* ── On load ── */
  var path = window.location.pathname;
  var isHome = (
    path === '/' ||
    path.endsWith('/index.html') ||
    path.endsWith('/portfolio/') ||
    path.endsWith('/Portfolio/')
  );

  // Did we arrive from internal navigation?
  var cameFromNav = false;
  try {
    cameFromNav = sessionStorage.getItem('ptNav') === '1';
    sessionStorage.removeItem('ptNav');
  } catch(e) {}

  // Set immediately so preloader.js (loaded next) can check this
  if (cameFromNav) {
    window.__ptCameFromNav = true;
  }

  window.addEventListener('load', function() {
    if (isHome && !cameFromNav) {
      // Fresh visit / refresh: preloader handles reveal, hide overlay
      gsap.set(bg, { yPercent: -110 });
      overlay.style.pointerEvents = 'none';
    } else if (isHome && cameFromNav) {
      // Return to homepage: preloader already skipped (flag set at module scope)
      if (typeof Animations !== 'undefined' && Animations.showInstant) {
        Animations.showInstant();
      }
      enter();
    } else {
      // Subpage
      enter();
    }
  });

  return { enter: enter, leave: leave };
})();
