// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navDropdown = document.getElementById('nav-dropdown');

if (navToggle && navDropdown) {
  navToggle.addEventListener('click', () => {
    navDropdown.classList.toggle('open');
  });

  // Close menu on link click
  navDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navDropdown.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navDropdown.contains(e.target)) {
      navDropdown.classList.remove('open');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection observer for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('md3-reveal');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.md3-card, .md3-section__title, .md3-section__subtitle').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.md3-card, .md3-section__title, .md3-section__subtitle').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});

// Simple class to handle reveal state
document.addEventListener('scroll', () => {
  document.querySelectorAll('.md3-card, .md3-section__title, .md3-section__subtitle').forEach(el => {
    if (el.classList.contains('md3-reveal')) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});

// Copy email to clipboard
function copyEmail(email, subject) {
  const text = subject ? `${email} (subject: ${subject})` : email;
  navigator.clipboard.writeText(email).then(() => {
    alert(`Email copied!\n${email}`);
  }).catch(() => {
    prompt('Copy this email:', email);
  });
}
