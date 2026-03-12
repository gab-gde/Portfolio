/**
 * contact-animations.js
 * GSAP animations for contact.html
 */

gsap.registerPlugin(ScrollTrigger);

// Nav sticky
const nav = document.getElementById('pageNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Header clip reveal
gsap.fromTo('.ch-title .clip-line',
  { y: '110%' },
  {
    y: '0%', duration: 1.1, ease: 'power4.out', stagger: .1,
    scrollTrigger: { trigger: '.contact-header', start: 'top 80%', toggleActions: 'play none none none' }
  }
);

// Email link
gsap.fromTo('.email-link',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.email-section', start: 'top 82%', toggleActions: 'play none none none' }
  }
);

// Info blocks
document.querySelectorAll('.cb-block, .cb-socials').forEach((block, i) => {
  gsap.fromTo(block,
    { opacity: 0, y: 22 },
    {
      opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .1,
      scrollTrigger: { trigger: '.cb-info', start: 'top 84%', toggleActions: 'play none none none' }
    }
  );
});

// Form
gsap.fromTo('.cb-form',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: '.cb-form', start: 'top 84%', toggleActions: 'play none none none' }
  }
);

// Form submit button feedback
const btn = document.getElementById('formSubmit');
if (btn) {
  btn.addEventListener('click', () => {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      gsap.fromTo(btn, { x: 0 }, { x: [-8, 8, -6, 6, 0], duration: .4, ease: 'power2.out' });
      return;
    }

    // Replace with your form handler (Formspree, Netlify Forms, etc.)
    btn.querySelector('.fs-text').textContent = 'Message sent ✓';
    btn.style.background = '#22c55e';
  });
}
