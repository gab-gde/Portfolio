/**
 * preloader.js — Homepage first visit only
 * If already visited this session, hides itself instantly.
 */

const Preloader = (() => {
  var preEl   = document.getElementById('preloader');
  var preTxt  = document.getElementById('preTxt');
  var preLine = document.getElementById('preLine');
  var prePct  = document.getElementById('prePct');

  if (!preEl || !preTxt || !preLine || !prePct) return { active: false };

  // Already visited? Skip preloader entirely.
  if (sessionStorage.getItem('preloaderDone')) {
    preEl.style.display = 'none';
    return { active: false };
  }

  // First visit — run preloader
  sessionStorage.setItem('preloaderDone', '1');

  gsap.fromTo(preTxt,
    { y: '110%' },
    { y: '0%', duration: 0.9, ease: 'power4.out', delay: 0.15 }
  );

  gsap.to({ v: 0 }, {
    v: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate() {
      var v = Math.round(this.targets()[0].v);
      preLine.style.width = v + '%';
      prePct.textContent  = v + '%';
    },
    onComplete() {
      var tl = gsap.timeline({
        onComplete: function() {
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

  return { active: true };
})();
