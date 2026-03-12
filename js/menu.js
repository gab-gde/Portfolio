/**
 * menu.js
 * Full-screen overlay menu — Dennis Snellenberg style
 * Large links that slide up, hamburger transforms to ✕
 */

const Menu = (() => {

  // ── Inject overlay HTML ──
  const overlay = document.createElement('div');
  overlay.id = 'menuOverlay';
  overlay.innerHTML = `
    <nav class="menu-nav">
      <ul class="menu-links">
        <li class="menu-item"><a href="index.html"><span class="ml-inner">Work</span></a></li>
        <li class="menu-item"><a href="about.html"><span class="ml-inner">About</span></a></li>
        <li class="menu-item"><a href="contact.html"><span class="ml-inner">Contact</span></a></li>
      </ul>
      <div class="menu-footer">
        <div class="menu-footer-left">
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
          <a href="https://malt.fr/" target="_blank" rel="noopener">Malt</a>
        </div>
        <div class="menu-footer-right">
          <span>hello@gabingoude.fr</span>
        </div>
      </div>
    </nav>
  `;
  document.body.appendChild(overlay);

  // ── Inject styles ──
  const style = document.createElement('style');
  style.textContent = `
    #menuOverlay {
      position: fixed;
      inset: 0;
      background: #1a1a1a;
      z-index: 800;
      display: flex;
      align-items: center;
      padding: 44px;
      pointer-events: none;
      visibility: hidden;
    }

    .menu-nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 80px 0 0;
    }

    .menu-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .menu-item {
      overflow: hidden;
      border-top: 1px solid rgba(255,255,255,.08);
      padding: 18px 0;
    }

    .menu-item:last-child {
      border-bottom: 1px solid rgba(255,255,255,.08);
    }

    .menu-item a {
      display: block;
      font-size: clamp(52px, 10vw, 130px);
      font-weight: 600;
      color: #fff;
      text-decoration: none;
      letter-spacing: -.04em;
      line-height: 1;
      transition: opacity .25s;
    }

    .menu-item a:hover { opacity: .4; }

    .ml-inner {
      display: block;
      transform: translateY(110%);
    }

    .menu-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 8px;
      opacity: 0;
    }

    .menu-footer-left {
      display: flex;
      gap: 28px;
    }

    .menu-footer-left a,
    .menu-footer-right span {
      font-size: 12px;
      color: rgba(255,255,255,.35);
      text-decoration: none;
      letter-spacing: .06em;
      transition: color .2s;
    }

    .menu-footer-left a:hover { color: #fff; }

    /* Hamburger transforms to ✕ */
    #hamBtn.open span:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }
    #hamBtn.open span:nth-child(2) {
      transform: translateY(-6.5px) rotate(-45deg);
    }
    #hamBtn span {
      transition: transform .35s cubic-bezier(.16,1,.3,1);
    }
  `;
  document.head.appendChild(style);

  // ── State ──
  let isOpen = false;
  const hamBtn = document.getElementById('hamBtn');
  const items  = overlay.querySelectorAll('.ml-inner');
  const footer = overlay.querySelector('.menu-footer');

  // ── Open ──
  function open() {
    isOpen = true;
    hamBtn.classList.add('open');
    overlay.style.visibility = 'visible';
    overlay.style.pointerEvents = 'auto';

    gsap.fromTo(overlay,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: .7, ease: 'power4.inOut' }
    );

    gsap.fromTo(items,
      { y: '110%' },
      { y: '0%', duration: .8, ease: 'power4.out', stagger: .07, delay: .35 }
    );

    gsap.to(footer,
      { opacity: 1, duration: .6, delay: .75, ease: 'power2.out' }
    );

    document.body.style.overflow = 'hidden';
  }

  // ── Close ──
  function close() {
    isOpen = false;
    hamBtn.classList.remove('open');

    gsap.to(items, { y: '110%', duration: .4, ease: 'power3.in', stagger: .04 });
    gsap.to(footer, { opacity: 0, duration: .25 });

    gsap.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      duration: .65,
      ease: 'power4.inOut',
      delay: .1,
      onComplete: () => {
        overlay.style.visibility = 'hidden';
        overlay.style.pointerEvents = 'none';
      }
    });

    document.body.style.overflow = '';
  }

  // ── Toggle ──
  hamBtn.addEventListener('click', () => isOpen ? close() : open());

  // ── Close on link click (transition handles navigation) ──
  overlay.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', () => {
      // Let page-transition.js handle the nav, just reset the body overflow
      document.body.style.overflow = '';
    });
  });

  // ── ESC key ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) close();
  });

  // Init clip state
  gsap.set(overlay, { clipPath: 'inset(0 0 100% 0)' });

  return { open, close };

})();
