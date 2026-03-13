/**
 * contact-animations.js
 * Text reveals for the Contact page
 */

gsap.registerPlugin(ScrollTrigger);

// Title text reveal
document.querySelectorAll('.clip-line').forEach(function(line, i) {
  gsap.to(line, {
    y: '0%',
    duration: 1.2,
    delay: 0.15 + i * 0.08,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.ch-title',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    onStart: function() { line.classList.add('vis'); }
  });
});

// Email link fade in
gsap.fromTo('.email-link',
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.email-section', start: 'top 80%', toggleActions: 'play none none none' }
  }
);

// Contact body sections fade in
document.querySelectorAll('.cb-block, .cb-socials, .form-group, .form-submit').forEach(function(el, i) {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: .8, delay: i * 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    }
  );
});
