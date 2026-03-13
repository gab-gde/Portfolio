/**
 * preloader.js — Homepage only
 * Shows "Gabin Goude" + counting bar, then curved slide away
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
      const tl = gsap.timeline({
        onComplete: () => {
          preEl.style.display = 'none';
          if (typeof Animations !== 'undefined' && Animations.runIntro) {
            Animations.runIntro();
          }
        }
      });

      tl.to(preTxt, { y: '-110%', duration: 0.4, ease: 'power3.in' }, 0)
        .to(preEl, {
          yPercent: -115,
          duration: 0.9,
          ease: 'power3.inOut',
          onUpdate: function() {
            var p = this.progress();
            var curve = Math.sin(p * Math.PI) * 60;
            preEl.style.borderRadius = '0 0 50% 50% / 0 0 ' + curve + 'px ' + curve + 'px';
          }
        }, 0.15);
    }
  });

  return { started: true };
})();
