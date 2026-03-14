/**
 * smooth-scroll.js — Lenis smooth scroll for the Dennis "heavy" feel
 * Must be loaded AFTER lenis CDN and BEFORE other scripts
 */

const lenis = new Lenis({
  duration: 1.2,
  easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
  touchMultiplier: 2,
});

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Sync with GSAP ScrollTrigger if available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}
