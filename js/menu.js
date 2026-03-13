/**
 * menu.js
 * Side panel menu — Dennis Snellenberg style
 * Auto-injects #aboutBubble + #hamBtn on all pages if missing.
 * Detects path depth for correct relative links.
 */

const Menu = (() => {

  // Ensure ScrollTrigger is registered
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ── Detect path depth for relative links ──
  const path = window.location.pathname;
  let prefix = '';
  if (path.includes('/projects/')) {
    prefix = '../../';
  }

  // ── Inject aboutBubble if missing ──
  let aboutBubble = document.getElementById('aboutBubble');
  if (!aboutBubble) {
    aboutBubble = document.createElement('a');
    aboutBubble.id = 'aboutBubble';
    aboutBubble.href = prefix + 'about.html';
    aboutBubble.textContent = 'About me';
    document.body.appendChild(aboutBubble);
  }

  // ── Inject hamBtn if missing ──
  let hamBtn = document.getElementById('hamBtn');
  if (!hamBtn) {
    hamBtn = document.createElement('div');
    hamBtn.id = 'hamBtn';
    hamBtn.innerHTML = '<span></span><span></span>';
    document.body.appendChild(hamBtn);
  }

  // ── Floating buttons: start hidden, appear on scroll ──
  gsap.set([aboutBubble, hamBtn], { opacity: 0 });
  aboutBubble.classList.remove('vis');
  hamBtn.classList.remove('vis');

  function showFloating() {
    aboutBubble.classList.add('vis');
    hamBtn.classList.add('vis');
    gsap.to([aboutBubble, hamBtn], { opacity: 1, duration: .5, stagger: .07, ease: 'power2.out' });
  }
  function hideFloating() {
    aboutBubble.classList.remove('vis');
    hamBtn.classList.remove('vis');
    gsap.to([aboutBubble, hamBtn], { opacity: 0, duration: .3 });
  }

  // On homepage: trigger on .work-section
  var workSection = document.querySelector('.work-section');
  if (workSection) {
    ScrollTrigger.create({
      trigger: workSection,
      start: 'top 68%',
      onEnter: showFloating,
      onLeaveBack: hideFloating
    });
  } else {
    // On subpages: show after scrolling 150px, hide when back at top
    var floatingShown = false;
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 150 && !floatingShown) {
        floatingShown = true;
        showFloating();
      } else if (scrollY <= 150 && floatingShown) {
        floatingShown = false;
        hideFloating();
      }
    }, { passive: true });
  }

  // ── Magnetic effect on floating buttons ──
  [aboutBubble, hamBtn].forEach(function(el) {
    el.addEventListener('mousemove', function(e) {
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      el.style.transform = 'translate(' + x * 0.35 + 'px,' + y * 0.35 + 'px)';
    });
    el.addEventListener('mouseleave', function() {
      el.style.transform = 'translate(0,0)';
    });
  });

  // ── Inject panel HTML ──
  const panel = document.createElement('div');
  panel.id = 'menuPanel';
  panel.innerHTML = `
    <div class="mp-inner">
      <div class="mp-top">
        <span class="mp-label">Navigation</span>
        <ul class="mp-links">
          <li><a href="${prefix}index.html"><span class="mpl-inner">Home</span></a></li>
          <li><a href="${prefix}index.html#work"><span class="mpl-inner">Work</span></a></li>
          <li><a href="${prefix}about.html"><span class="mpl-inner">About</span></a></li>
          <li><a href="${prefix}contact.html"><span class="mpl-inner">Contact</span></a></li>
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

    #menuBackdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 790;
      opacity: 0;
      pointer-events: none;
    }

    #hamBtn.open { opacity: 0 !important; pointer-events: none !important; }

    /* Base styles for floating buttons (injected for pages that don't load style.css) */
    #aboutBubble {
      position: fixed;
      top: 50px; right: 108px;
      width: 112px; height: 112px;
      background: #1a1a1a;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 13.5px; font-weight: 400; color: #fff;
      letter-spacing: .01em; cursor: pointer;
      text-decoration: none;
      opacity: 0; pointer-events: none;
      transition: transform .4s cubic-bezier(.16,1,.3,1), background .3s;
      z-index: 700; will-change: transform;
    }
    #aboutBubble:hover { background: #4338ca; }
    #aboutBubble.vis { pointer-events: auto; }

    #hamBtn {
      position: fixed;
      top: 26px; right: 40px;
      width: 52px; height: 52px;
      background: #1a1a1a;
      border-radius: 50%;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 5px; cursor: pointer;
      opacity: 0; pointer-events: none;
      transition: transform .35s cubic-bezier(.16,1,.3,1), background .3s;
      z-index: 700; will-change: transform;
    }
    #hamBtn:hover { background: #4338ca; }
    #hamBtn.vis { pointer-events: auto; }
    #hamBtn span {
      display: block; width: 18px; height: 1.5px;
      background: #fff; border-radius: 2px;
    }

    @media (max-width: 768px) {
      #menuPanel { width: 100%; }
      #aboutBubble { width: 80px; height: 80px; font-size: 11px; top: 30px; right: 80px; }
      #hamBtn { top: 16px; right: 20px; }
    }
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

  const items  = panel.querySelectorAll('.mpl-inner');
  const bottom = panel.querySelector('.mp-bottom');

  let isOpen = false;

  function open() {
    isOpen = true;
    hamBtn.classList.add('open');
    panel.style.visibility = 'visible';
    backdrop.style.pointerEvents = 'auto';

    gsap.to(panel, { x: 0, duration: .65, ease: 'power4.inOut' });
    gsap.to(backdrop, { opacity: 1, duration: .4 });
    gsap.fromTo(items,
      { y: '110%' },
      { y: '0%', duration: .7, ease: 'power4.out', stagger: .07, delay: .3 }
    );
    gsap.fromTo(bottom,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: .5, delay: .65, ease: 'power2.out' }
    );
    gsap.to(closeBtn, {
      opacity: 1, scale: 1, duration: .35, delay: .3, ease: 'back.out(1.4)'
    });
    closeBtn.style.pointerEvents = 'auto';
  }

  function close() {
    isOpen = false;
    hamBtn.classList.remove('open');

    gsap.to(items, { y: '110%', duration: .35, ease: 'power3.in', stagger: .04 });
    gsap.to(bottom, { opacity: 0, duration: .2 });
    gsap.to(closeBtn, { opacity: 0, scale: .7, duration: .25 });
    closeBtn.style.pointerEvents = 'none';
    gsap.to(backdrop, { opacity: 0, duration: .4 });
    gsap.to(panel, {
      x: '100%', duration: .6, ease: 'power4.inOut', delay: .1,
      onComplete: () => { panel.style.visibility = 'hidden'; }
    });
    backdrop.style.pointerEvents = 'none';
  }

  gsap.set(panel, { x: '100%' });
  gsap.set(bottom, { opacity: 0 });

  hamBtn.addEventListener('click', () => isOpen ? close() : open());
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) close(); });

  return { open, close };
})();
