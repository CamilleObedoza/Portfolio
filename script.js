/* =============================================================
   CAMILLE OBEDOZA — PORTFOLIO SCRIPT
   Kept intentionally small: a mobile menu toggle, a subtle
   fade-in-on-scroll effect, and the footer year. Nothing here
   needs editing unless you're changing how sections behave.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

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
