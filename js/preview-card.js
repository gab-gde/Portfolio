/**
 * preview-card.js
 * Image preview card — follows cursor on project hover (like Dennis Snellenberg)
 */

const PreviewCard = (() => {
  const card = document.getElementById('previewCard');
  const pBg  = document.getElementById('pBg');
  const pLbl = document.getElementById('pLbl');
  const pImg = document.getElementById('pImg');

  let mx = 0, my = 0;
  let pcx = 0, pcy = 0;

  // Track mouse globally
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Lag the card behind the cursor
  (function tick() {
    pcx += (mx - pcx) * 0.11;
    pcy += (my - pcy) * 0.11;
    card.style.left = (pcx - 240) + 'px';
    card.style.top  = (pcy - 190) + 'px';
    requestAnimationFrame(tick);
  })();

  // Show / hide on project hover
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      pBg.style.background = item.dataset.color || '#111';
      pLbl.textContent     = item.dataset.label  || '';
      if (item.dataset.img) {
        pImg.src = item.dataset.img;
        pImg.style.display = 'block';
      } else {
        pImg.style.display = 'none';
      }
      card.classList.add('show');
      document.body.classList.add('c-proj');
    });

    item.addEventListener('mouseleave', () => {
      card.classList.remove('show');
      document.body.classList.remove('c-proj');
    });

    // Click navigates to project page
    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href && href !== '#') window.location.href = href;
    });
  });
})();
