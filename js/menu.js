/**
 * menu.js
 * Side panel menu — Dennis Snellenberg style
 * Right panel, dark bg, large nav links, socials at bottom
 */

const Menu = (() => {

  // ── Inject panel HTML ──
  const panel = document.createElement('div');
  panel.id = 'menuPanel';
  panel.innerHTML = `
    <div class="mp-inner">
      <div class="mp-top">
        <span class="mp-label">Navigation</span>
        <ul class="mp-links">
          <li><a href="index.html"><span class="mpl-inner">Home</span></a></li>
          <li><a href="index.html#work"><span class="mpl-inner">Work</span></a></li>
          <li><a href="about.html"><span class="mpl-inner">About</span></a></li>
          <li><a href="contact.html"><span class="mpl-inner">Contact</span></a></li>
        </ul>
      </div>
      <div class="mp-bottom">
        <span class="mp-label">Socials</span>
        <div class="mp-socials">
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
          <a href="https://malt.fr/" target="_blank" rel="noopener">Malt</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  // ── Inject styles ──
  const style = document.createElement('style');
  style.textContent = `
    #menuPanel {
      position: fixed;
      top: 0; right: 0;
      width: 360px;
      height: 100vh;
      background: #1a1a1a;
      z-index: 800;
      transform: translateX(100%);
      visibility: hidden;
      display: flex;
      flex-direction: column;
    }

    .mp-inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 44px 44px 40px;
    }

    .mp-label {
      display: block;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: rgba(255,255,255,.25);
      margin-bottom: 20px;
    }

    .mp-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      margin-top: 8px;
    }

    .mp-links li {
      overflow: hidden;
      border-top: 1px solid rgba(255,255,255,.07);
      padding: 10px 0;
    }
    .mp-links li:last-child {
      border-bottom: 1px solid rgba(255,255,255,.07);
    }

    .mp-links a {
      display: block;
      font-size: clamp(38px, 5.5vw, 62px);
      font-weight: 600;
      color: #fff;
      text-decoration: none;
      letter-spacing: -.03em;
      line-height: 1.05;
      transition: opacity .2s;
    }
    .mp-links a:hover { opacity: .35; }

    .mpl-inner {
      display: block;
      transform: translateY(110%);
    }

    .mp-bottom { }

    .mp-socials {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .mp-socials a {
      font-size: 12px;
      color: rgba(255,255,255,.35);
      text-decoration: none;
      letter-spacing: .04em;
      transition: color .2s;
    }
    .mp-socials a:hover { color: #fff; }

    /* Close button — blue circle like Dennis */
    #menuClose {
      position: fixed;
      top: 22px;
      right: 22px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #3d5af1;
      border: none;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      z-index: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transform: scale(.7);
      transition: background .2s, transform .2s;
    }
    #menuClose:hover { background: #2a45d4; transform: scale(1.06) !important; }

    /* Backdrop */
    #menuBackdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 790;
      opacity: 0;
      pointer-events: none;
    }

    /* Ham morphs to hidden when panel open */
    #hamBtn.open { opacity: 0 !important; pointer-events: none !important; }
  `;
  document.head.appendChild(style);

  // ── Close button ──
  const closeBtn = document.createElement('button');
  closeBtn.id = 'menuClose';
  closeBtn.innerHTML = '✕';
  document.body.appendChild(closeBtn);

  // ── Backdrop ──
  const backdrop = document.createElement('div');
  backdrop.id = 'menuBackdrop';
  document.body.appendChild(backdrop);

  const hamBtn  = document.getElementById('hamBtn');
  const items   = panel.querySelectorAll('.mpl-inner');
  const bottom  = panel.querySelector('.mp-bottom');

  let isOpen = false;

  // ── Open ──
  function open() {
    isOpen = true;
    hamBtn.classList.add('open');

    panel.style.visibility = 'visible';
    backdrop.style.pointerEvents = 'auto';

    // Panel slides in
    gsap.to(panel, { x: 0, duration: .65, ease: 'power4.inOut' });

    // Backdrop fades in
    gsap.to(backdrop, { opacity: 1, duration: .4 });

    // Links slide up with stagger
    gsap.fromTo(items,
      { y: '110%' },
      { y: '0%', duration: .7, ease: 'power4.out', stagger: .07, delay: .3 }
    );

    // Bottom fades in
    gsap.fromTo(bottom,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: .5, delay: .65, ease: 'power2.out' }
    );

    // Close btn appears
    gsap.to(closeBtn, {
      opacity: 1, scale: 1, duration: .35, delay: .3, ease: 'back.out(1.4)',
      pointerEvents: 'auto'
    });
    closeBtn.style.pointerEvents = 'auto';
  }

  // ── Close ──
  function close() {
    isOpen = false;
    hamBtn.classList.remove('open');

    gsap.to(items, { y: '110%', duration: .35, ease: 'power3.in', stagger: .04 });
    gsap.to(bottom, { opacity: 0, duration: .2 });
    gsap.to(closeBtn, { opacity: 0, scale: .7, duration: .25, pointerEvents: 'none' });
    closeBtn.style.pointerEvents = 'none';

    gsap.to(backdrop, { opacity: 0, duration: .4 });

    gsap.to(panel, {
      x: '100%',
      duration: .6,
      ease: 'power4.inOut',
      delay: .1,
      onComplete: () => { panel.style.visibility = 'hidden'; }
    });

    backdrop.style.pointerEvents = 'none';
  }

  // ── Init ──
  gsap.set(panel, { x: '100%' });
  gsap.set(bottom, { opacity: 0 });

  hamBtn.addEventListener('click', () => isOpen ? close() : open());
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) close(); });

  // Close on link click
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { document.body.style.overflow = ''; });
  });

  return { open, close };
})();
