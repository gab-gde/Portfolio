/**
 * preview-card.js
 * Image preview card — follows cursor on project hover (like Dennis Snellenberg)
 * Big visible slide up/down with beige background showing between transitions
 */

const PreviewCard = (() => {
  const card = document.getElementById('previewCard');
  const pBg  = document.getElementById('pBg');
  const pImg = document.getElementById('pImg');

  let mx = 0, my = 0;
  let pcx = 0, pcy = 0;
  let currentIndex = -1;
  let isAnimating = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function tick() {
    pcx += (mx - pcx) * 0.11;
    pcy += (my - pcy) * 0.11;
    card.style.left = (pcx - 240) + 'px';
    card.style.top  = (pcy - 190) + 'px';
    requestAnimationFrame(tick);
  })();

  const items = document.querySelectorAll('.project-item');

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      const newImg = item.dataset.img;
      if (!newImg) return;

      card.classList.add('show');
      document.body.classList.add('c-proj');

      // First hover — no slide, just show
      if (currentIndex === -1) {
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(0)';
        pImg.style.opacity = '1';
        pImg.src = newImg;
        currentIndex = index;
        return;
      }

      // Same project — no change
      if (index === currentIndex) return;

      // Different project — slide animation
      if (isAnimating) return;
      isAnimating = true;

      var dir = index > currentIndex ? 1 : -1; // 1=going down, -1=going up
      currentIndex = index;

      // Phase 1: slide current image OUT (100% of container height)
      pImg.style.transition = 'transform .4s cubic-bezier(.76,0,.24,1), opacity .25s ease';
      pImg.style.transform = 'translateY(' + (dir * -100) + '%)';
      pImg.style.opacity = '0';

      // Phase 2: after slide out, swap image, position off-screen, slide IN
      setTimeout(function() {
        pImg.src = newImg;
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(' + (dir * 100) + '%)';
        pImg.style.opacity = '0';

        // Force reflow
        void pImg.offsetHeight;

        // Slide in
        pImg.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), opacity .35s ease';
        pImg.style.transform = 'translateY(0)';
        pImg.style.opacity = '1';

        setTimeout(function() { isAnimating = false; }, 500);
      }, 380);
    });

    item.addEventListener('mouseleave', () => {
      card.classList.remove('show');
      document.body.classList.remove('c-proj');
      currentIndex = -1;
      isAnimating = false;
    });

    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href && href !== '#') window.location.href = href;
    });
  });
})();
