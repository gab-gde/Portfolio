/**
 * preview-card.js
 * Dennis Snellenberg style: project color bg shows during slide transition
 */

const PreviewCard = (() => {
  const card = document.getElementById('previewCard');
  const pBg  = document.getElementById('pBg');
  const pImg = document.getElementById('pImg');

  let mx = 0, my = 0;
  let pcx = 0, pcy = 0;
  let currentIndex = -1;
  let isAnimating = false;
  let hideTimer = null;

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
      // Cancel any pending hide
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

      const newImg = item.dataset.img;
      const bgColor = item.dataset.color || '#1a1a1a';
      if (!newImg) return;

      card.classList.add('show');
      document.body.classList.add('c-proj');

      // First hover or re-entering after full leave — just show
      if (currentIndex === -1) {
        pBg.style.background = bgColor;
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(0)';
        pImg.src = newImg;
        currentIndex = index;
        return;
      }

      // Same project
      if (index === currentIndex) return;

      // Different project — SLIDE
      if (isAnimating) return;
      isAnimating = true;

      var dir = index > currentIndex ? 1 : -1;
      currentIndex = index;

      // Change bg color — visible during slide gap
      pBg.style.background = bgColor;

      // Slide OUT — organic, spring-like
      pImg.style.transition = 'transform .7s cubic-bezier(.22,.68,0,1), opacity .5s ease-out';
      pImg.style.transform = 'translateY(' + (dir * -50) + '%) scale(.95)';
      pImg.style.opacity = '0';

      setTimeout(function() {
        pImg.src = newImg;
        pImg.style.transition = 'none';
        pImg.style.transform = 'translateY(' + (dir * 40) + '%) scale(.95)';
        pImg.style.opacity = '0';
        void pImg.offsetHeight;

        // Slide IN — soft spring
        pImg.style.transition = 'transform .75s cubic-bezier(.22,.68,0,1.02), opacity .5s ease-in';
        pImg.style.transform = 'translateY(0) scale(1)';
        pImg.style.opacity = '1';

        setTimeout(function() { isAnimating = false; }, 750);
      }, 300);
    });

    item.addEventListener('mouseleave', () => {
      // Delay the hide so moving between items keeps the card visible
      hideTimer = setTimeout(function() {
        card.classList.remove('show');
        document.body.classList.remove('c-proj');
        currentIndex = -1;
        isAnimating = false;
        hideTimer = null;
      }, 100);
    });

    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href && href !== '#') {
        var cover = document.getElementById('pageCover');
        if (cover) {
          cover.style.transform = 'translateY(0)';
          setTimeout(function(){ window.location.href = href; }, 650);
        } else {
          window.location.href = href;
        }
      }
    });
  });
})();
