/**
 * smooth-scroll.js
 * Lenis-like inertia scroll — drives ScrollTrigger
 */

const SmoothScroll = (() => {
  let current = 0;
  let target  = 0;
  const EASE  = 0.09;

  const maxScroll = () =>
    document.body.scrollHeight - window.innerHeight;

  // Wheel
  window.addEventListener('wheel', e => {
    e.preventDefault();
    target = Math.max(0, Math.min(target + e.deltaY * 1.1, maxScroll()));
  }, { passive: false });

  // Keyboard
  window.addEventListener('keydown', e => {
    const map = {
      ArrowDown : 100,
      ArrowUp   : -100,
      PageDown  : window.innerHeight * .9,
      PageUp    : -window.innerHeight * .9,
      End       : maxScroll(),
      Home      : -maxScroll(),
    };
    if (map[e.key] !== undefined)
      target = Math.max(0, Math.min(target + map[e.key], maxScroll()));
  });

  // Touch
  let touchY = 0;
  window.addEventListener('touchstart', e => {
    touchY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    const delta = touchY - e.touches[0].clientY;
    touchY = e.touches[0].clientY;
    target = Math.max(0, Math.min(target + delta, maxScroll()));
  }, { passive: true });

  // RAF loop
  (function tick() {
    current += (target - current) * EASE;
    if (Math.abs(target - current) < 0.05) current = target;
    window.scrollTo(0, current);
    ScrollTrigger.update();
    requestAnimationFrame(tick);
  })();

  // Anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) target = Math.max(0, Math.min(el.offsetTop - 20, maxScroll()));
    });
  });

  return {
    scrollTo: y => {
      target = Math.max(0, Math.min(y, maxScroll()));
    }
  };
})();
