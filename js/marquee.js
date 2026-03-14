/**
 * marquee.js — scrolling tech-stack band
 */

const Marquee = (() => {
  const TAGS = [
    'Full-Stack Development',
    'Next.js & React',
    'Node.js & Express',
    'Supabase',
    'React Native',
    'TypeScript',
    'Stripe & Payments',
    'API Design',
    'Tailwind CSS',
    'PostgreSQL',
  ];

  const track = document.getElementById('mqTrack');
  if (!track) return;

  // 4x duplication for seamless looping
  let html = '';
  for (let i = 0; i < 4; i++) {
    TAGS.forEach(tag => {
      html += '<div class="marquee-item"><span>' + tag + '</span><div class="marquee-sep"></div></div>';
    });
  }
  track.innerHTML = html;
})();
