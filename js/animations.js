/**
 * animations.js
 * All GSAP ScrollTrigger animations
 * runIntro() is called by preloader.js after the loading screen exits
 */

gsap.registerPlugin(ScrollTrigger);

const Animations = (() => {

  /* ──────────────────────────────────────
     1. HERO INTRO — called after preloader
  ────────────────────────────────────── */
  function runIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('#heroNav',   { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: .8  }, 0.1)
      .fromTo('#heroName',  { opacity: 0, y: 70  }, { opacity: 1, y: 0, duration: 1.3 }, 0.28)
      .fromTo('#heroPhoto', { opacity: 0, y: 55  }, { opacity: 1, y: 0, duration: 1.2 }, 0.36)
      .fromTo('#heroRole',  { opacity: 0, x: 28  }, { opacity: 1, x: 0, duration: .9  }, 0.56)
      .fromTo('#locBadge',  { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: .85 }, 0.64)
      .fromTo('#heroArrow', { opacity: 0         }, { opacity: .6,       duration: .6  }, 0.85);
  }

  /* ──────────────────────────────────────
     2. HERO NAME — slides left on scroll (Dennis style)
  ────────────────────────────────────── */
  gsap.to('#heroName', {
    x: '-8%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end:   'bottom top',
      scrub: 1.6,
    }
  });

  /* ──────────────────────────────────────
     3. PHOTO INNER — parallax (moves slower than page)
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
     4. HERO ELEMENTS — fade out as user scrolls
  ────────────────────────────────────── */
  gsap.to('#heroRole', {
    y: -68, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '36% top', scrub: true }
  });

  gsap.to('#heroArrow', {
    y: -48, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '26% top', scrub: true }
  });

  gsap.to('#locBadge', {
    y: 26, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '6% top', end: '33% top', scrub: true }
  });

  gsap.to('#heroNav', {
    opacity: 0, y: -12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '16% top', end: '40% top', scrub: true }
  });

  /* ──────────────────────────────────────
     5. FLOATING UI — appears after hero (Dennis style)
  ────────────────────────────────────── */
  const aboutBubble = document.getElementById('aboutBubble');
  const hamBtn      = document.getElementById('hamBtn');

  ScrollTrigger.create({
    trigger: '.work-section',
    start: 'top 68%',
    onEnter() {
      aboutBubble.classList.add('vis');
      hamBtn.classList.add('vis');
      gsap.to([aboutBubble, hamBtn], {
        opacity: 1, duration: .5, stagger: .07, ease: 'power2.out'
      });
    },
    onLeaveBack() {
      aboutBubble.classList.remove('vis');
      hamBtn.classList.remove('vis');
      gsap.to([aboutBubble, hamBtn], { opacity: 0, duration: .3 });
    }
  });

  /* ──────────────────────────────────────
     6. WORK LABEL
  ────────────────────────────────────── */
  gsap.to('.work-label', {
    opacity: 1, y: 0, duration: .85, ease: 'power3.out',
    scrollTrigger: { trigger: '.work-label', start: 'top 88%' }
  });

  /* ──────────────────────────────────────
     7. PROJECT ITEMS — stagger + horizontal offset
  ────────────────────────────────────── */
  document.querySelectorAll('.project-item').forEach((item, i) => {
    // Fade in stagger
    gsap.to(item, {
      opacity: 1, y: 0, duration: .9, ease: 'power3.out', delay: i * .07,
      scrollTrigger: { trigger: '.projects-list', start: 'top 83%' }
    });

    // Name slides in from alternating sides
    const dir = i % 2 === 0 ? -18 : 18;
    gsap.fromTo(item.querySelector('.project-name'),
      { x: dir },
      {
        x: 0, ease: 'none',
        scrollTrigger: { trigger: item, start: 'top 88%', end: 'top 30%', scrub: 1.8 }
      }
    );
  });

  /* ──────────────────────────────────────
     8. STATS — count-up on enter
  ────────────────────────────────────── */
  document.querySelectorAll('.stat-col').forEach((col, i) => {
    gsap.to(col, {
      opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .06,
      scrollTrigger: { trigger: '.stats-section', start: 'top 84%' }
    });
  });

  document.querySelectorAll('.cnt').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      once: true,
      onEnter() {
        gsap.fromTo(
          { v: 0 },
          {
            v: +el.dataset.t,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].v); }
          }
        );
      }
    });
  });

  /* ──────────────────────────────────────
     9. ABOUT — clip-reveal line by line
  ────────────────────────────────────── */
  gsap.to('.clip-line', {
    y: '0%', duration: 1.05, ease: 'power4.out', stagger: .12,
    scrollTrigger: { trigger: '.about-section', start: 'top 78%' }
  });

  /* ──────────────────────────────────────
     10. GENERIC g-init FADES
  ────────────────────────────────────── */
  document.querySelectorAll('.g-init').forEach(el => {
    // Already handled individually above
    const skip = ['.project-item', '.work-label', '.stat-col'];
    if (skip.some(s => el.matches(s))) return;

    gsap.to(el, {
      opacity: 1, y: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* ──────────────────────────────────────
     11. CONTACT EMAIL
  ────────────────────────────────────── */
  gsap.to('.contact-email', {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-section', start: 'top 80%' }
  });

  return { runIntro };

})();
