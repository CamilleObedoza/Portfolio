/* =============================================================
   CAMILLE OBEDOZA — PORTFOLIO SCRIPT
   Kept intentionally small: a mobile menu toggle, a subtle
   fade-in-on-scroll effect, and the footer year. Nothing here
   needs editing unless you're changing how sections behave.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Reveal everything below the hero ----------
     The page-below wrapper (Get to Know Me, About, Projects,
     Skills, Contact) starts hidden. Clicking the arrow reveals
     it with a fade, scrolls to it, then the arrow fades away
     since its job is done. */
  const scrollArrow = document.getElementById('scrollArrow');
  const pageBelow = document.getElementById('pageBelow');

  if (scrollArrow && pageBelow) {
    scrollArrow.addEventListener('click', () => {
      pageBelow.classList.add('visible');

      // Force a reflow so the fade-in transition actually plays
      // rather than jumping straight to opacity: 1.
      void pageBelow.offsetHeight;
      pageBelow.classList.add('fade-in');

      scrollArrow.classList.add('dismissed');
      scrollArrow.setAttribute('aria-expanded', 'true');

      setTimeout(() => {
        pageBelow.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  // If someone clicks a nav link (About/Projects/Skills/Contact)
  // before the reveal arrow has been used, reveal the hidden
  // content first so the jump actually lands somewhere visible.
  if (pageBelow && !pageBelow.classList.contains('visible')) {
    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (!pageBelow.classList.contains('visible')) {
          pageBelow.classList.add('visible');
          void pageBelow.offsetHeight;
          pageBelow.classList.add('fade-in');
          if (scrollArrow) {
            scrollArrow.classList.add('dismissed');
            scrollArrow.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
  }


  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu once a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Subtle fade-in on scroll ----------
     Adds a .reveal class to the sections and cards below, then
     removes it once they've scrolled into view. This is the only
     motion on the page — kept gentle on purpose. */
  const revealTargets = document.querySelectorAll(
    '.about-text, .project-card, .skill-group, .contact-inner'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
