// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  ".section__head, .who__lead, .service, .clients li, .feature__copy, .feature__art, .founder, .founders__note, .callout__grid"
);
revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-in"));
}

// Active section highlight in nav
const sections = document.querySelectorAll("main > section[id]");
const navLinks = document.querySelectorAll(".nav__links a");
if ("IntersectionObserver" in window && sections.length) {
  const active = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => {
            a.style.color = a.getAttribute("href") === "#" + id ? "" : "";
            a.dataset.active = a.getAttribute("href") === "#" + id ? "true" : "false";
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => active.observe(s));
}
