// Trigger load animations only once
window.addEventListener("load", () => {
  setTimeout(() => document.body.classList.add("animate-in"), 80);
});

// Sidebar toggle for mobile
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");

function setSidebar(open) {
  sidebar.classList.toggle("open", open);
  backdrop?.classList.toggle("show", open);
  toggleBtn.textContent = open ? "✕" : "☰";
  toggleBtn.setAttribute("aria-expanded", String(open));
}

if (toggleBtn && sidebar) {
  toggleBtn.addEventListener("click", () =>
    setSidebar(!sidebar.classList.contains("open")),
  );
  backdrop?.addEventListener("click", () => setSidebar(false));
  document
    .querySelectorAll(".nav-links a")
    .forEach((a) => a.addEventListener("click", () => setSidebar(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setSidebar(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setSidebar(false);
  });
}

// Scroll animations inside main-content
const mainContent = document.querySelector(".main-content");
const sections = document.querySelectorAll(".section");

if (mainContent && sections.length) {
  const obsOptions = {
    root: mainContent,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add("visible");
        observer.unobserve(el);
      }
    });
  }, obsOptions);

  // Observe each section
  sections.forEach((s) => sectionObserver.observe(s));

  // Ensure the first section is visible on load
  if (sections[0]) sections[0].classList.add("visible");
}

// Active link highlight
const navLinks = document.querySelectorAll(".nav-links a");
mainContent?.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((section) => {
      if (mainContent.scrollTop >= section.offsetTop - 200)
        current = section.id;
    });
    const atBottom =
      mainContent.scrollTop + mainContent.clientHeight >=
      mainContent.scrollHeight - 4;
    if (atBottom) current = sections[sections.length - 1].id;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  },
  { passive: true },
);

/*----------------------------- btn animation start---------------------------- */

const modeToggleInput = document.getElementById("input");

// Initialize dark mode from localStorage or default to dark
if (localStorage.getItem("theme") === "light") {
  document.body.classList.remove("dark");
  modeToggleInput.checked = false;
} else {
  document.body.classList.add("dark");
  modeToggleInput.checked = true;
}

// Listen for changes to the toggle (switch)
modeToggleInput.addEventListener("change", function () {
  document.body.classList.toggle("dark", this.checked);
  try {
    localStorage.setItem("theme", this.checked ? "dark" : "light");
  } catch (e) {}
});

/*-----------------------------  /btn animation end---------------------------- */


/* ----Auto Typing------ */
var typed = new Typed(".highlight", {
  strings: ["Zabi Ahmed", "Web Developer", "Programmer", "Coding Enthusiast !"],
  typeSpeed: 80,
  backSpeed: 30,
  loop: true,
});
