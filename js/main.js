const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = [...document.querySelectorAll('.nav-link[data-page-link]')];
const pageLinks = [...document.querySelectorAll('[data-page-link]')];
const pageViews = [...document.querySelectorAll('[data-page]')];
const placeholderNotice = document.querySelector('[data-placeholder-notice]');
let noticeTimer;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function setMenuState(isOpen) {
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
}

navToggle.addEventListener('click', () => {
  setMenuState(navToggle.getAttribute('aria-expanded') !== 'true');
});

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

function getPageIdFromHash() {
  const pageId = window.location.hash.slice(1);
  return pageViews.some((page) => page.dataset.page === pageId) ? pageId : 'home';
}

function showPage(pageId, updateHistory = false) {
  const targetPage = pageViews.find((page) => page.dataset.page === pageId);
  if (!targetPage) return;

  pageViews.forEach((page) => {
    const isActive = page === targetPage;
    page.hidden = !isActive;
    page.classList.toggle('is-active', isActive);
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${pageId}`;
    link.classList.toggle('is-active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (updateHistory && window.location.hash !== `#${pageId}`) {
    window.history.pushState({ page: pageId }, '', `#${pageId}`);
  }

  setMenuState(false);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

pageLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const pageId = link.getAttribute('href').slice(1);
    if (!pageViews.some((page) => page.dataset.page === pageId)) return;
    event.preventDefault();
    showPage(pageId, true);
  });
});

window.addEventListener('popstate', () => showPage(getPageIdFromHash()));
showPage(getPageIdFromHash());

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.clearTimeout(noticeTimer);
    placeholderNotice.classList.add('is-visible');
    noticeTimer = window.setTimeout(() => placeholderNotice.classList.remove('is-visible'), 2600);
  });
});

document.querySelector('[data-current-year]').textContent = new Date().getFullYear();
