/**
 * about-animations.js
 * GSAP animations for about.html
 */

gsap.registerPlugin(ScrollTrigger);

// Nav sticky
const nav = document.getElementById('pageNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Header title clip reveal
gsap.fromTo('.ah-title .clip-line',
  { y: '110%' },
  {
    y: '0%', duration: 1.1, ease: 'power4.out', stagger: .1,
    scrollTrigger: { trigger: '.about-header', start: 'top 80%', toggleActions: 'play none none none' }
  }
);

// Intro photo
gsap.fromTo('.ai-photo',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-intro', start: 'top 80%', toggleActions: 'play none none none' }
  }
);

// Intro text
gsap.fromTo('.ai-body',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .15,
    scrollTrigger: { trigger: '.ai-text', start: 'top 82%', toggleActions: 'play none none none' }
  }
);

gsap.fromTo('.ai-cta',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: .7, ease: 'power3.out', delay: .3,
    scrollTrigger: { trigger: '.ai-text', start: 'top 82%', toggleActions: 'play none none none' }
  }
);

// Skills list items
document.querySelectorAll('.ss-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0, duration: .7, ease: 'power3.out', delay: i * .06,
      scrollTrigger: { trigger: '.ss-list', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

// Experience items
document.querySelectorAll('.xp-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .1,
      scrollTrigger: { trigger: '.xp-list', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});
