/**
 * page-transition.js
 * Handles the page-to-page transition curtain
 * Works on every page — replaces preloader.js on subpages
 */

const PageTransition = (() => {

  // Inject the curtain div if not present
  const curtain = document.createElement('div');
  curtain.id = 'pageCurtain';
  curtain.innerHTML = `
    <div class="curtain-inner">
      <div class="curtain-name"><span>Gabin Goude</span></div>
    </div>
  `;
  document.body.appendChild(curtain);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #pageCurtain {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
    }
    .curtain-inner {
      position: absolute;
      inset: 0;
      background: #1a1a1a;
      transform: translateY(0%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .curtain-name {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: clamp(32px, 6vw, 72px);
      font-weight: 600;
      letter-spacing: -.04em;
      color: #fff;
      overflow: hidden;
    }
    .curtain-name span {
      display: block;
      transform: translateY(110%);
    }
  `;
  document.head.appendChild(style);

  const inner  = curtain.querySelector('.curtain-inner');
  const nameEl = curtain.querySelector('.curtain-name span');

  // PAGE ENTER — curtain slides up to reveal page
  function enter(onComplete) {
    const tl = gsap.timeline({ onComplete });
    tl.fromTo(nameEl, { y: '110%' }, { y: '0%', duration: .6, ease: 'power3.out' }, 0)
      .to(nameEl, { y: '-110%', duration: .5, ease: 'power3.in' }, .9)
      .to(inner, { yPercent: -100, duration: .8, ease: 'power4.inOut' }, 1.0)
      .set(curtain, { pointerEvents: 'none' });
  }

  // PAGE LEAVE — curtain slides in before navigating
  function leave(href) {
    curtain.style.pointerEvents = 'all';
    gsap.set(inner, { yPercent: 100 });
    gsap.set(nameEl, { y: '110%' });

    const tl = gsap.timeline({
      onComplete: () => { window.location.href = href; }
    });
    tl.to(inner, { yPercent: 0, duration: .7, ease: 'power4.inOut' }, 0)
      .fromTo(nameEl, { y: '110%' }, { y: '0%', duration: .5, ease: 'power3.out' }, .3);
  }

  // Intercept all internal links
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || a.target === '_blank') return;

    e.preventDefault();
    leave(href);
  });

  // Run enter animation on load
  window.addEventListener('load', () => {
    gsap.set(inner, { yPercent: 0 });
    enter();
  });

  return { enter, leave };
})();
