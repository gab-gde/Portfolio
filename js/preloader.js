/**
 * preloader.js
 * Loading screen — count up then slide away
 */

const Preloader = (() => {
  const preLine = document.getElementById('preLine');
  const prePct  = document.getElementById('prePct');
  const preTxt  = document.getElementById('preTxt');
  const preEl   = document.getElementById('preloader');

  // Animate name in
  gsap.fromTo(preTxt,
    { y: '110%' },
    { y: '0%', duration: .9, ease: 'power4.out', delay: .1 }
  );

  // Count bar up to 100%
  gsap.to({ v: 0 }, {
    v: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate() {
      const v = Math.round(this.targets()[0].v);
      preLine.style.width = v + '%';
      prePct.textContent  = v + '%';
    },
    onComplete() {
      const tl = gsap.timeline({ onComplete: () => Animations.runIntro() });
      tl.to(preTxt, { y: '110%', duration: .5, ease: 'power3.in' }, 0)
        .to(preEl,   { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '.2');
    }
  });
})();
