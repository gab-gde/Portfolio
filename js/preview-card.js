/**
 * preview-card.js — Round bubble preview, smooth slide
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
    card.style.left = (pcx - 260) + 'px';
    card.style.top  = (pcy - 260) + 'px';
    requestAnimationFrame(tick);
  })();

  const items = document.querySelectorAll('.project-item');

  // Preload
  items.forEach(item => {
    const src = item.dataset.img;
    if (src) { const i = new Image(); i.src = src; }
  });

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

      const newImg = item.dataset.img;
      const bgColor = item.dataset.color || '#e8e5de';
      if (!newImg) return;

      card.classList.add('show');
      pBg.style.background = bgColor;
      document.body.classList.add('c-proj');

      if (currentIndex === -1) {
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(0) scale(1)';
        pImg.src = newImg;
        currentIndex = index;
        return;
      }

      if (index === currentIndex) return;

      var dir = index > currentIndex ? -1 : 1;
      currentIndex = index;

      // Instant jump + smooth slide in
      pImg.style.transition = 'none';
      pImg.style.transform = 'translateY(' + (dir * -35) + '%) scale(.92)';
      pImg.src = newImg;
      void pImg.offsetHeight;

      pImg.style.transition = 'transform .4s cubic-bezier(.25,.1,.25,1)';
      pImg.style.transform = 'translateY(0) scale(1)';
    });

    item.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(function() {
        card.classList.remove('show');
        document.body.classList.remove('c-proj');
        currentIndex = -1;
        hideTimer = null;
      }, 100);
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
