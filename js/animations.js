/**
 * animations.js
 * All GSAP ScrollTrigger animations
 * runIntro() is called by preloader.js after the loading screen exits
 */

gsap.registerPlugin(ScrollTrigger);

const Animations = (() => {

  /* ──────────────────────────────────────
     HELPER — fade in any element when it enters viewport
  ────────────────────────────────────── */
  function fadeIn(el, delay = 0) {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: .9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          // Once the animation plays, kill the trigger
          toggleActions: 'play none none none',
        }
      }
    );
  }

  /* ──────────────────────────────────────
     1. HERO INTRO — called after preloader
  ────────────────────────────────────── */
  function runIntro() {
    if (runIntro._done) return;
    runIntro._done = true;

    // Refresh all trigger positions now that preloader is gone
    ScrollTrigger.refresh();

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('#heroNav',   { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: .8  }, 0.1)
      .fromTo('#nameSlider',  { opacity: 0, y: 70  }, { opacity: 1, y: 0, duration: 1.3 }, 0.28)
      .fromTo('#heroPhoto', { opacity: 0, y: 55  }, { opacity: 1, y: 0, duration: 1.2 }, 0.36)
      .fromTo('#heroRole',  { opacity: 0, x: 28  }, { opacity: 1, x: 0, duration: .9  }, 0.56)
      .fromTo('#locBadge',  { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: .85 }, 0.64)
      .fromTo('#heroArrow', { opacity: 0         }, { opacity: .6,       duration: .6  }, 0.85);
  }

  /* Instant show — for return visits (no re-animation) */
  function showInstant() {
    if (runIntro._done) return;
    runIntro._done = true;
    ScrollTrigger.refresh();
    gsap.set('#heroNav',    { opacity: 1, y: 0 });
    gsap.set('#nameSlider', { opacity: 1, y: 0 });
    gsap.set('#heroPhoto',  { opacity: 1, y: 0 });
    gsap.set('#heroRole',   { opacity: 1, x: 0 });
    gsap.set('#locBadge',   { opacity: 1, x: 0 });
    gsap.set('#heroArrow',  { opacity: .6 });
  }

  /* ──────────────────────────────────────
     2. HERO NAME — scroll-direction marquee (like Dennis Snellenberg)
  ────────────────────────────────────── */
  // Moved to standalone block below module for proper scroll access

  /* ──────────────────────────────────────
     3. PHOTO — parallax
  ────────────────────────────────────── */
  gsap.to('#photoInner', {
    y: '-12%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end:   'bottom top',
      scrub: 1,
    }
  });

  /* ──────────────────────────────────────
     4. HERO ELEMENTS — fade out on scroll (fromTo so scrub reverses correctly)
  ────────────────────────────────────── */
  gsap.fromTo('#heroRole',
    { y: 0, opacity: 1 },
    { y: -68, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '36% top', scrub: true } }
  );
  gsap.fromTo('#heroArrow',
    { y: 0, opacity: .6 },
    { y: -48, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '26% top', scrub: true } }
  );
  gsap.fromTo('#locBadge',
    { y: 0, opacity: 1 },
    { y: 26, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '6% top', end: '33% top', scrub: true } }
  );
  gsap.fromTo('#heroNav',
    { y: 0, opacity: 1 },
    { opacity: 0, y: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: '16% top', end: '40% top', scrub: true } }
  );

  /* ──────────────────────────────────────
     5. FLOATING UI — handled by menu.js on all pages
  ────────────────────────────────────── */

  /* ──────────────────────────────────────
     6. WORK LABEL
  ────────────────────────────────────── */
  gsap.fromTo('.work-label',
    { opacity: 0, y: 26 },
    {
      opacity: 1, y: 0, duration: .85, ease: 'power3.out',
      scrollTrigger: { trigger: '.work-label', start: 'top 88%', toggleActions: 'play none none none' }
    }
  );

  /* ──────────────────────────────────────
     7. PROJECT ITEMS
  ────────────────────────────────────── */
  document.querySelectorAll('.project-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 26 },
      {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out', delay: i * .07,
        scrollTrigger: { trigger: '.projects-list', start: 'top 83%', toggleActions: 'play none none none' }
      }
    );

    // Name slides from alternating sides on scroll
    const dir = i % 2 === 0 ? -18 : 18;
    gsap.fromTo(item.querySelector('.project-name'),
      { x: dir },
      { x: 0, ease: 'none',
        scrollTrigger: { trigger: item, start: 'top 88%', end: 'top 30%', scrub: 1.8 }
      }
    );
  });

  /* ──────────────────────────────────────
     8. STATS
  ────────────────────────────────────── */
  document.querySelectorAll('.stat-col').forEach((col, i) => {
    gsap.fromTo(col,
      { opacity: 0, y: 26 },
      {
        opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .06,
        scrollTrigger: { trigger: '.stats-section', start: 'top 84%', toggleActions: 'play none none none' }
      }
    );
  });

  document.querySelectorAll('.cnt').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      once: true,
      onEnter() {
        gsap.fromTo({ v: 0 }, {
          v: +el.dataset.t,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].v); }
        });
      }
    });
  });

  /* ──────────────────────────────────────
     9. ABOUT STRIP — clip reveal
  ────────────────────────────────────── */
  gsap.fromTo('.clip-line',
    { y: '110%' },
    {
      y: '0%', duration: 1.05, ease: 'power4.out', stagger: .12,
      scrollTrigger: { trigger: '.about-strip', start: 'top 78%', toggleActions: 'play none none none' }
    }
  );

  gsap.fromTo('.cta-circle',
    { opacity: 0, scale: .8 },
    { opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.about-strip', start: 'top 78%', toggleActions: 'play none none none' }
    }
  );

  /* ──────────────────────────────────────
     10. CONTACT STRIP
  ────────────────────────────────────── */
  gsap.fromTo('.contact-strip .contact-email',
    { opacity: 0, y: 28 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-strip', start: 'top 82%', toggleActions: 'play none none none' }
    }
  );

  gsap.fromTo('.contact-bottom',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-bottom', start: 'top 90%', toggleActions: 'play none none none' }
    }
  );

  return { runIntro, showInstant };

})();

/* ══════════════════════════════════════════════════════════════
   HERO NAME — Infinite text move on scroll (Dennis Snellenberg)
   Two copies of text, xPercent loops -100 ↔ 0, direction flips on scroll
══════════════════════════════════════════════════════════════ */
(function() {
  var firstText = document.getElementById('firstName');
  var secondText = document.getElementById('secondName');
  var slider = document.getElementById('nameSlider');
  if (!firstText || !secondText || !slider) return;

  var xPercent = 0;
  var direction = -1; // -1 = moving left (default)

  // Position second text right after first
  gsap.set(secondText, { left: secondText.getBoundingClientRect().width });

  // ScrollTrigger: translates slider on scrub + reads scroll direction
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(slider, {
    scrollTrigger: {
      trigger: document.documentElement,
      scrub: 0.25,
      start: 0,
      end: window.innerHeight,
      onUpdate: function(e) { direction = e.direction * -1; }
    },
    x: '-500px'
  });

  function animate() {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText, { xPercent: xPercent });
    gsap.set(secondText, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  requestAnimationFrame(animate);
})();
