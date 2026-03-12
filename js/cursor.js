/**
 * cursor.js
 * Custom cursor — dot + ring with lag
 */

const Cursor = (() => {
  const dot  = document.getElementById('cur');
  const ring = document.getElementById('curR');

  let mx = 0, my = 0;
  let dx = 0, dy = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Smooth tracking loop
  (function tick() {
    dx += (mx - dx) * 0.22;
    dy += (my - dy) * 0.22;
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;

    dot.style.cssText  = `left:${dx}px;top:${dy}px`;
    ring.style.cssText = `left:${rx}px;top:${ry}px`;

    requestAnimationFrame(tick);
  })();

  // Hover state — enlarge ring on interactive elements
  const hoverTargets = 'a, button, #hamBtn, #aboutBubble, #locBadge, .project-item';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
  });
})();
