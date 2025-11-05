// Trigger load animations only once
window.addEventListener("load", () => {
  setTimeout(() => document.body.classList.add("animate-in"), 80);
});

// Sidebar toggle for mobile
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

if (toggleBtn && sidebar) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Optional: close sidebar when resizing up to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) sidebar.classList.remove("open");
  });
}

// Scroll animations inside main-content
const mainContent = document.querySelector(".main-content");
const sections = document.querySelectorAll(".section");

if (mainContent && sections.length) {
  const obsOptions = {
    root: mainContent,
    rootMargin: "0px",
    threshold: 0.15, // 15% of section visible triggers animation
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
mainContent.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (mainContent.scrollTop >= sectionTop - 200) {
      current = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`)
      link.classList.add("active");
  });
});

/*----------------------------- new btn animation---------------------------- */

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
  if (this.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

/*----------------------------- end btn animation---------------------------- */


/* ----Auto Typing------ */
var typed = new Typed(".highlight", {
  strings: ["Zabi Ahmed", "Web Developer", "Programmer", "Coding Enthusiast !"],
  typeSpeed: 100,
  backSpeed: 30,
  loop: true,
});
