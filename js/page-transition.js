/**
 * page-transition.js — Unified curved page transition
 * 
 * The overlay div is injected inline in each page's <head> so CSS covers
 * the screen BEFORE body renders. This script just animates it.
 */

const PageTransition = (() => {
  // Overlay was already created by inline <script> in <head>
  var overlay = document.getElementById('pageOverlay');
  if (!overlay) {
    // Fallback: create it (shouldn't happen)
    overlay = document.createElement('div');
    overlay.id = 'pageOverlay';
    overlay.innerHTML = '<div class="po-bg"></div><span class="po-text"></span>';
    document.body.appendChild(overlay);
  }

  var bg     = overlay.querySelector('.po-bg');
  var textEl = overlay.querySelector('.po-text');

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

  /* ── ENTER — one fluid slide-up with curve ── */
  function enter(onComplete) {
    overlay.style.pointerEvents = 'all';

    var tl = gsap.timeline({
      onComplete: function() {
        overlay.style.pointerEvents = 'none';
        bg.style.borderRadius = '0';
        if (onComplete) onComplete();
      }
    });

    tl.to(bg, {
      yPercent: -115,
      duration: 1.0,
      ease: 'power4.inOut',
      onUpdate: function() {
        var p = this.progress();
        var curve = Math.sin(p * Math.PI) * 50;
        bg.style.borderRadius = '0 0 50% 50% / 0 0 ' + curve + 'px ' + curve + 'px';
      }
    }, 0.25);

    tl.fromTo(textEl,
      { y: '110%', opacity: 1 },
      { y: '0%', duration: 0.4, ease: 'power3.out' },
    0);
    tl.to(textEl,
      { y: '-110%', duration: 0.3, ease: 'power3.in' },
    0.45);
  }

  /* ── LEAVE — one fluid slide-up from bottom ── */
  function leave(href) {
    overlay.style.pointerEvents = 'all';
    textEl.textContent = getPageName(href);
    gsap.set(bg, { yPercent: 115, borderRadius: '0' });
    gsap.set(textEl, { y: '110%', opacity: 1 });

    var tl = gsap.timeline({
      onComplete: function() { window.location.href = href; }
    });

    tl.to(bg, {
      yPercent: 0,
      duration: 0.85,
      ease: 'power4.inOut',
      onUpdate: function() {
        var p = this.progress();
        var curve = Math.sin(p * Math.PI) * 50;
        bg.style.borderRadius = curve + 'px ' + curve + 'px 0 0 / 50% 50% 0 0';
      }
    }, 0);

    tl.fromTo(textEl,
      { y: '110%' },
      { y: '0%', duration: 0.4, ease: 'power3.out' },
    0.2);

    tl.set(bg, { borderRadius: '0', yPercent: 0 });
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

  window.addEventListener('load', function() {
    if (isHome) {
      // Preloader covers everything, hide overlay
      gsap.set(bg, { yPercent: -115 });
      overlay.style.pointerEvents = 'none';
    } else {
      // bg is already at yPercent:0 (CSS default), run enter
      enter();
    }
  });

  return { enter: enter, leave: leave };
})();
