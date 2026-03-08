/* Garden Grove Auto Care - Main JS */

(function () {
  'use strict';

  // ---- Mobile Nav ----
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open', !isOpen);

      // Toggle tabindex for accessibility
      const links = navLinks.querySelectorAll('a');
      links.forEach(function (link) {
        link.setAttribute('tabindex', isOpen ? '-1' : '0');
        link.setAttribute('aria-hidden', String(isOpen));
      });
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        navLinks.querySelectorAll('a').forEach(function (l) {
          l.setAttribute('tabindex', '-1');
          l.setAttribute('aria-hidden', 'true');
        });
      });
    });

    // Set initial aria state for nav links (hidden on mobile)
    function setInitialTabIndex() {
      const isMobile = window.innerWidth <= 768;
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.setAttribute('tabindex', isMobile ? '-1' : '0');
        link.setAttribute('aria-hidden', String(isMobile));
      });
    }

    setInitialTabIndex();
    window.addEventListener('resize', setInitialTabIndex);
  }

  // ---- Scroll to Top ----
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Intersection Observer for animations ----
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    animatedEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  // ---- Form Submission Feedback ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      const btn = form.querySelector('.form-submit');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
    });
  }

})();
