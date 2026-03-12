/**
 * preview-card.js
 * Image preview card — follows cursor on project hover (like Dennis Snellenberg)
 * Slides image up/down when switching between projects
 */

const PreviewCard = (() => {
  const card = document.getElementById('previewCard');
  const pBg  = document.getElementById('pBg');
  const pLbl = document.getElementById('pLbl');
  const pImg = document.getElementById('pImg');

  let mx = 0, my = 0;
  let pcx = 0, pcy = 0;
  let currentIndex = -1;

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
      const direction = index > currentIndex ? 1 : -1; // 1 = down, -1 = up

      if (currentIndex !== -1 && newImg && pImg.src !== newImg) {
        // Slide out current image
        pImg.style.transition = 'transform .35s cubic-bezier(.76,0,.24,1), opacity .2s';
        pImg.style.transform = 'translateY(' + (direction * -40) + 'px)';
        pImg.style.opacity = '0';

        setTimeout(() => {
          pImg.src = newImg;
          // Start from opposite direction
          pImg.style.transition = 'none';
          pImg.style.transform = 'translateY(' + (direction * 40) + 'px)';
          pImg.style.opacity = '0';

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              pImg.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1), opacity .3s';
              pImg.style.transform = 'translateY(0)';
              pImg.style.opacity = '1';
            });
          });
        }, 250);
      } else if (newImg) {
        pImg.src = newImg;
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(0)';
        pImg.style.opacity = '1';
      }

      currentIndex = index;
      pBg.style.background = item.dataset.color || '#e8e5de';
      if (pLbl) pLbl.textContent = item.dataset.label || '';
      card.classList.add('show');
      document.body.classList.add('c-proj');
    });

    item.addEventListener('mouseleave', () => {
      card.classList.remove('show');
      document.body.classList.remove('c-proj');
      currentIndex = -1;
    });

    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href && href !== '#') window.location.href = href;
    });
  });
})();
