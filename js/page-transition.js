/**
 * page-transition.js — Unified curved page transition system
 * Works on every page. Homepage: preloader handles entry.
 */

const PageTransition = (() => {
  /* ── Inject overlay HTML ── */
  const overlay = document.createElement('div');
  overlay.id = 'pageOverlay';
  overlay.innerHTML = '<div class="po-bg"></div><span class="po-text"></span>';
  document.body.appendChild(overlay);

  const bg     = overlay.querySelector('.po-bg');
  const textEl = overlay.querySelector('.po-text');

  /* ── Page name map ── */
  function getPageName(href) {
    if (!href) return '';
    const h = href.toLowerCase();
    if (h.includes('index.html') || h === '/' || h === './')
      return 'Home';
    if (h.includes('about'))   return 'About';
    if (h.includes('contact')) return 'Contact';
    if (h.includes('restaurant')) return 'Maison Élysée';
    if (h.includes('kami'))    return 'TERRA';
    if (h.includes('aura'))    return 'AURA Studio';
    if (h.includes('aurum'))   return 'Aurum Stays';
    return '';
  }

  /* ── ENTER — reveal page (overlay slides up away) ── */
  function enter(onComplete) {
    gsap.set(bg, { yPercent: 0, borderRadius: '0' });
    gsap.set(textEl, { y: '110%', opacity: 1 });
    overlay.classList.add('active');

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.classList.remove('active');
        gsap.set(bg, { borderRadius: '0' });
        if (onComplete) onComplete();
      }
    });

    tl
      .to(textEl, { y: '0%', duration: 0.5, ease: 'power3.out' }, 0)
      .to(textEl, { y: '-110%', duration: 0.4, ease: 'power3.in' }, 0.65)
      .to(bg, {
        yPercent: -115,
        duration: 0.9,
        ease: 'power3.inOut',
        onUpdate: function() {
          var p = this.progress();
          // Gentle curve, peaks mid-animation
          var curve = Math.sin(p * Math.PI) * 50;
          bg.style.borderRadius = '0 0 50% 50% / 0 0 ' + curve + 'px ' + curve + 'px';
        }
      }, 0.7);
  }

  /* ── LEAVE — cover page (overlay slides up from bottom) ── */
  function leave(href) {
    overlay.classList.add('active');
    textEl.textContent = getPageName(href);

    gsap.set(bg, { yPercent: 115, borderRadius: '0' });
    gsap.set(textEl, { y: '110%', opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => { window.location.href = href; }
    });

    tl
      .to(bg, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onUpdate: function() {
          var p = this.progress();
          var curve = Math.sin(p * Math.PI) * 50;
          bg.style.borderRadius = curve + 'px ' + curve + 'px 0 0 / 50% 50% 0 0';
        }
      }, 0)
      .to(textEl, { y: '0%', duration: 0.45, ease: 'power3.out' }, 0.3)
      .set(bg, { borderRadius: '0' }, 0.8);
  }

  /* ── Intercept internal links ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || a.target === '_blank')
      return;
    e.preventDefault();
    leave(href);
  });

  /* ── Project items (data-href) ── */
  document.addEventListener('click', e => {
    const item = e.target.closest('.project-item[data-href]');
    if (!item) return;
    e.preventDefault();
    leave(item.dataset.href);
  });

  /* ── Detect homepage ── */
  const path = window.location.pathname;
  const isHome = (
    path === '/' ||
    path.endsWith('/index.html') ||
    path.endsWith('/portfolio/') ||
    path.endsWith('/Portfolio/')
  );

  /* ── On page load ── */
  window.addEventListener('load', () => {
    if (isHome) {
      gsap.set(bg, { yPercent: -115 });
      overlay.classList.remove('active');
    } else {
      gsap.set(bg, { yPercent: 0 });
      overlay.classList.add('active');
      requestAnimationFrame(() => enter());
    }
  });

  return { enter, leave };
})();
