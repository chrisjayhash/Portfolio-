// Loading screen
const fill = document.getElementById('loaderFill');
const percent = document.getElementById('loaderPercent');
const loader = document.getElementById('loader');
let progress = 0;

const interval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    fill.style.width = '100%';
    percent.textContent = '100%';
    clearInterval(interval);
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 600);
    }, 300);
  } else {
    fill.style.width = progress + '%';
    fill.style.transition = 'width 0.3s ease';
    percent.textContent = Math.floor(progress) + '%';
  }
}, 200);

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

// Skill bars
const skillSection = document.getElementById('about');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
if (skillSection) skillObserver.observe(skillSection);

// Animated stats counter
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        entry.target.textContent = Math.floor(current);
      }, 16);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(num => statsObserver.observe(num));

// Custom cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
window.addEventListener('mousemove', (e) => {
  cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  cursorOutline.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
});
document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'linear-gradient(45deg, #00a86b, #00d4aa)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}