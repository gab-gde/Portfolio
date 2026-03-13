/**
 * preview-card.js
 * Like Dennis Snellenberg: project bg color shows during image slide transition
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
      const bgColor = item.dataset.color || '#1a1a1a';
      if (!newImg) return;

      card.classList.add('show');
      document.body.classList.add('c-proj');

      // First hover — just show, no slide
      if (currentIndex === -1) {
        pBg.style.background = bgColor;
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(0)';
        pImg.style.opacity = '1';
        pImg.src = newImg;
        currentIndex = index;
        return;
      }

      if (index === currentIndex) return;
      if (isAnimating) return;
      isAnimating = true;

      var dir = index > currentIndex ? 1 : -1;
      currentIndex = index;

      // Set new bg color immediately — it shows through as image slides out
      pBg.style.transition = 'background .3s';
      pBg.style.background = bgColor;

      // Slide current image out
      pImg.style.transition = 'transform .45s cubic-bezier(.76,0,.24,1)';
      pImg.style.transform = 'translateY(' + (dir * -100) + '%)';

      setTimeout(function() {
        // Swap image, position offscreen
        pImg.src = newImg;
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(' + (dir * 100) + '%)';

        void pImg.offsetHeight;

        // Slide new image in
        pImg.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
        pImg.style.transform = 'translateY(0)';

        setTimeout(function() { isAnimating = false; }, 500);
      }, 420);
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
