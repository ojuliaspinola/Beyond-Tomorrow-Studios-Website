// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Reveal on scroll ----------
const revealTargets = document.querySelectorAll(
  ".section__head, .who__lead, .service, .clients li, .feature__copy, .feature__art, .founder, .founders__note, .callout__grid, .merch__copy, .boxes"
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

// ---------- Active section highlight in nav ----------
const sections = document.querySelectorAll("main > section[id]");
const navLinks = document.querySelectorAll(".nav__links a");
if ("IntersectionObserver" in window && sections.length) {
  const active = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => {
            a.dataset.active =
              a.getAttribute("href") === "#" + id ? "true" : "false";
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => active.observe(s));
}

// ---------- Theme toggle ----------
(function () {
  const root = document.documentElement;
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  const sync = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    sync();
  });

  sync();
})();

// ---------- Sleep Swimmer gallery ----------
(function () {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const track = gallery.querySelector("[data-gallery-track]");
  const prev = gallery.querySelector("[data-gallery-prev]");
  const next = gallery.querySelector("[data-gallery-next]");
  const dotsHost = gallery.querySelector("[data-gallery-dots]");
  const slides = Array.from(track.children);
  if (!slides.length) return;

  // Build dots
  const dots = slides.map((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "gallery__dot";
    d.setAttribute("aria-label", `Go to screenshot ${i + 1}`);
    d.addEventListener("click", () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    });
    dotsHost.appendChild(d);
    return d;
  });

  const setActive = (i) => {
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  };
  setActive(0);

  // Track scroll → active dot
  let raf = 0;
  track.addEventListener("scroll", () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const i = Math.round(track.scrollLeft / track.clientWidth);
      setActive(Math.max(0, Math.min(slides.length - 1, i)));
    });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  });
  next.addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  });

  // Keyboard support
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next.click();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev.click();
    }
  });
})();

// ---------- Sparkle trail (anywhere on the page) ----------
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // No mouse on touch-only devices; skip to save work
  if (!window.matchMedia("(hover: hover)").matches) return;

  let lastX = -9999;
  let lastY = -9999;

  document.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (dx * dx + dy * dy < 16 * 16) return; // distance throttle
    lastX = e.clientX;
    lastY = e.clientY;

    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    // position: fixed in CSS, so use viewport coords directly
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    const size = 8 + Math.random() * 10;
    sparkle.style.setProperty("--sparkle-size", size + "px");
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 850);
  });

  // Reset throttle reference if cursor leaves the window so the next
  // re-entry sparkle isn't suppressed by stale coords.
  document.addEventListener("mouseleave", () => {
    lastX = -9999;
    lastY = -9999;
  });
})();
