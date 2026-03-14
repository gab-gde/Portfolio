/**
 * about-animations.js
 * Text reveals + scroll animations for the About page
 * Dennis Snellenberg style: clip-line reveals, staggered fades
 */

gsap.registerPlugin(ScrollTrigger);

// Title text reveal — lines slide up
document.querySelectorAll('.clip-line').forEach(function(line, i) {
  gsap.to(line, {
    y: '0%',
    duration: 1.2,
    delay: 0.15 + i * 0.08,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.ah-title',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    onStart: function() { line.classList.add('vis'); }
  });
});

// Photo reveal — clip-path slides up
var photoImg = document.querySelector('.ai-photo img');
if (photoImg) {
  ScrollTrigger.create({
    trigger: '.ai-photo',
    start: 'top 75%',
    onEnter: function() { photoImg.classList.add('vis'); }
  });
}

// Text paragraphs fade in
document.querySelectorAll('.ai-body, .ai-cta').forEach(function(el, i) {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: function() {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
        onStart: function() { el.classList.add('vis'); }
      });
    }
  });
});

// Skills items — staggered reveal
document.querySelectorAll('.ss-item').forEach(function(item, i) {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 90%',
    onEnter: function() {
      gsap.to(item, {
        opacity: 1, y: 0,
        duration: .8,
        delay: i * 0.04,
        ease: 'power3.out',
        onStart: function() { item.classList.add('vis'); }
      });
    }
  });
});

// Experience items — staggered reveal
document.querySelectorAll('.xp-item').forEach(function(item, i) {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 90%',
    onEnter: function() {
      gsap.to(item, {
        opacity: 1, y: 0,
        duration: .8,
        delay: i * 0.06,
        ease: 'power3.out',
        onStart: function() { item.classList.add('vis'); }
      });
    }
  });
});

// Photo parallax — subtle float
gsap.fromTo('.ai-photo img',
  { yPercent: -8 },
  {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.ai-photo',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  }
);
