// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ─── Mobile Nav Toggle ───
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Floating Particles ───
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 30;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 1;
  const x = Math.random() * 100;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 15;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}%;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
  `;
  particlesContainer.appendChild(p);
}

// ─── Scroll-Reveal Observer ───
const revealEls = document.querySelectorAll(
  '.timeline-item, .career-card, .reform-card, .event-item, .collapse-event, .legacy-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── Active Nav Highlight ───
const sections = document.querySelectorAll('section[id], header[id]');
const navAs = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── Parallax hero ───
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const offset = window.scrollY * 0.3;
    heroContent.style.transform = `translateY(${offset}px)`;
  }
}, { passive: true });

// ─── Smooth counter animation ───
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const isYear = target > 1000;
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = isYear ? value : value;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('.fact-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const raw = entry.target.textContent.trim();
      const num = parseInt(raw.replace(/\D/g, ''), 10);
      if (!isNaN(num)) animateCounter(entry.target, num);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ─── Active nav link style ───
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--accent) !important;
  }
  .nav-links a.active::after {
    transform: scaleX(1) !important;
  }
`;
document.head.appendChild(style);
