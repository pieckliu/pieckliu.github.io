const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const placeholderNotice = document.querySelector('[data-placeholder-notice]');
let noticeTimer;

function setMenuState(isOpen) {
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
}

navToggle.addEventListener('click', () => {
  setMenuState(navToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    setMenuState(false);
    navToggle.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 840) setMenuState(false);
});

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.clearTimeout(noticeTimer);
    placeholderNotice.classList.add('is-visible');
    noticeTimer = window.setTimeout(() => placeholderNotice.classList.remove('is-visible'), 2600);
  });
});

document.querySelector('[data-current-year]').textContent = new Date().getFullYear();
