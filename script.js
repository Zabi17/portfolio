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

// Light/Dark mode toggle
const modeBtn = document.getElementById("mode-btn");

// 🔹 Set dark mode ON by default
document.body.classList.add("dark");
modeBtn.textContent = "☀️"; // show sun icon initially

// 🔹 Toggle between light and dark
modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

/*------------- For smooth animattion-------------- */
const track = document.getElementById("image-track");
const projectsSection = document.getElementById("projects");

let isActive = false;
let autoScrollSpeed = 0.09; // Adjust for speed (lower = slower)
let currentPercentage = 0;
let animationFrame;
let resumeTimer;

// ✅ Check if user is viewing the Projects section
function isInProjectsView() {
  const rect = projectsSection.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// ✅ Animate both track and images
function animateTrack(percent, duration = 1200) {
  track.animate(
    { transform: `translate(${percent}%, -50%)` },
    { duration, fill: "forwards", easing: "ease-out" }
  );

  for (const image of track.getElementsByTagName("img")) {
    image.animate(
      { objectPosition: `${100 + percent}% 50%` },
      { duration, fill: "forwards", easing: "ease-out" }
    );
  }
}

// === Mouse events ===
window.onmousedown = (e) => {
  if (!isInProjectsView() || e.button !== 0) return; // Only left-click in projects
  isActive = true;
  track.dataset.mouseDownAt = e.clientX;
  cancelAnimationFrame(animationFrame);
  clearTimeout(resumeTimer);
};

window.onmouseup = () => {
  if (!isActive) return;
  isActive = false;
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage || "0";

  // Smooth return easing
  const final = Math.max(Math.min(currentPercentage, 0), -100);
  animateTrack(final, 1500);

  // ✅ Resume auto-scroll after a short pause
  resumeTimer = setTimeout(() => {
    requestAnimationFrame(autoScroll);
  }, 2500);
};

window.onmousemove = (e) => {
  if (!isActive || e.buttons !== 1) return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  let percentage = (mouseDelta / maxDelta) * -100;
  let nextPercentage =
    parseFloat(track.dataset.prevPercentage || "0") + percentage;

  nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
  currentPercentage = nextPercentage;
  track.dataset.percentage = nextPercentage;

  animateTrack(nextPercentage, 400);
};

// === Touch events ===
window.ontouchstart = (e) => {
  if (!isInProjectsView()) return;
  isActive = true;
  track.dataset.mouseDownAt = e.touches[0].clientX;
  cancelAnimationFrame(animationFrame);
  clearTimeout(resumeTimer);
};

window.ontouchend = () => {
  if (!isActive) return;
  isActive = false;
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage || "0";
  animateTrack(currentPercentage, 1500);

  resumeTimer = setTimeout(() => {
    requestAnimationFrame(autoScroll);
  }, 2500);
};

window.ontouchmove = (e) => {
  if (!isActive) return;
  window.onmousemove({ clientX: e.touches[0].clientX, buttons: 1 });
};

// === Auto-scroll ===
function autoScroll() {
  if (!isActive && isInProjectsView()) {
    currentPercentage -= autoScrollSpeed;
    if (currentPercentage < -100) currentPercentage = 0;
    animateTrack(currentPercentage, 4000);
  }
  animationFrame = requestAnimationFrame(autoScroll);
}

// Start looping
autoScroll();

/* ----Auto Typing------ */
var typed = new Typed(".highlight", {
  strings: ["Zabi Ahmed", "Web Developer", "Programmer", "Coding Enthusiast !"],
  typeSpeed: 100,
  backSpeed: 30,
  loop: true,
});
