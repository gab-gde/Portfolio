/**
 * preview-card.js — Dennis Snellenberg exact style
 * Clean vertical slide between projects, beige frame, smooth lerp follow
 */
const PreviewCard = (() => {
  const card = document.getElementById('previewCard');
  const pBg  = document.getElementById('pBg');
  const pImg = document.getElementById('pImg');

  let mx = 0, my = 0;
  let pcx = 0, pcy = 0;
  let currentIndex = -1;
  let hideTimer = null;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function tick() {
    pcx += (mx - pcx) * 0.09;
    pcy += (my - pcy) * 0.09;
    card.style.left = (pcx - 240) + 'px';
    card.style.top  = (pcy - 180) + 'px';
    requestAnimationFrame(tick);
  })();

  const items = document.querySelectorAll('.project-item');

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

      const newImg = item.dataset.img;
      const bgColor = item.dataset.color || "#e8e5de";
      if (!newImg) return;

      card.classList.add('show');
      pBg.style.background = bgColor;
      document.body.classList.add('c-proj');

      // First hover — just show
      if (currentIndex === -1) {
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(0)';
        pImg.src = newImg;
        currentIndex = index;
        return;
      }

      // Same project
      if (index === currentIndex) return;

      // Different project — clean vertical slide
      var dir = index > currentIndex ? -1 : 1;
      currentIndex = index;

      // Slide OUT
      pImg.style.transition = 'transform .45s cubic-bezier(.77,0,.175,1)';
      pImg.style.transform = 'translateY(' + (dir * 100) + '%)';

      // Swap and slide IN
      setTimeout(function() {
        pImg.style.transition = 'none';
        pImg.src = newImg;
        pImg.style.transform = 'translateY(' + (dir * -100) + '%)';
        void pImg.offsetHeight;
        pImg.style.transition = 'transform .45s cubic-bezier(.77,0,.175,1)';
        pImg.style.transform = 'translateY(0)';
      }, 450);
    });

    item.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(function() {
        card.classList.remove('show');
        document.body.classList.remove('c-proj');
        currentIndex = -1;
        hideTimer = null;
      }, 120);
    });

    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href && href !== '#') {
        var cover = document.getElementById('pageCover');
        if (cover) {
          cover.style.transform = 'translateY(0)';
          setTimeout(function(){ window.location.href = href; }, 700);
        } else {
          window.location.href = href;
        }
      }
    });
  });
})();
