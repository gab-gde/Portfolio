/**
 * preloader.js — Homepage only
 * Shows "Gabin Goude" name + counting bar, then slides away
 * After preloader exits, triggers the GSAP intro animations
 */

const Preloader = (() => {
  const preEl   = document.getElementById('preloader');
  const preTxt  = document.getElementById('preTxt');
  const preLine = document.getElementById('preLine');
  const prePct  = document.getElementById('prePct');

  if (!preEl || !preTxt || !preLine || !prePct) return {};

  // Name slides in
  gsap.fromTo(preTxt,
    { y: '110%' },
    { y: '0%', duration: 0.9, ease: 'power4.out', delay: 0.15 }
  );

  // Count bar 0→100%
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
      // Exit preloader with curved slide-up
      const tl = gsap.timeline({
        onComplete: () => {
          preEl.style.display = 'none';
          // Trigger homepage intro animations
          if (typeof Animations !== 'undefined' && Animations.runIntro) {
            Animations.runIntro();
          }
        }
      });

      tl.to(preTxt, { y: '-110%', duration: 0.45, ease: 'power3.in' }, 0)
        .to(preEl, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onUpdate: function() {
            const p = this.progress();
            const curve = Math.sin(p * Math.PI) * 100;
            preEl.style.borderRadius = '0 0 50% 50% / 0 0 ' + curve + 'px ' + curve + 'px';
          }
        }, 0.15);
    }
  });

  return { started: true };
})();
