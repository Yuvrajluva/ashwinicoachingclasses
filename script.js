/* ═══════════════════════════════════════════════════════════
   ASHWINI COACHING CLASSES — script.js
   ─────────────────────────────────────────────────────────
   HOW TO CUSTOMISE:
   • WhatsApp number → change WHATSAPP_NUMBER below
   • Navbar scroll threshold → change SCROLL_THRESHOLD below
   ═══════════════════════════════════════════════════════════ */

/* ── CONFIG ─────────────────────────────────────────────── */
const WHATSAPP_NUMBER  = "9660500848"; // Change to your number (no + or spaces)
const SCROLL_THRESHOLD = 60;            // px scrolled before navbar solidifies

/* ── INIT AOS (Animate on Scroll) ───────────────────────── */
AOS.init({
  duration: 700,
  once: true,
  offset: 80,
  easing: "ease-out-cubic",
});

/* ── THEME (Dark / Light) ────────────────────────────────── */
const html           = document.documentElement;
const themeToggle    = document.getElementById("themeToggle");
const themeToggleMob = document.getElementById("themeToggleMobile");
const themeIcon      = document.getElementById("themeIcon");
const themeIconMob   = document.getElementById("themeIconMobile");

// Load saved preference, default to dark
const savedTheme = localStorage.getItem("acc-theme") || "dark";
applyTheme(savedTheme);

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("acc-theme", theme);

  // Swap icon: sun = currently dark (click → go light), moon = currently light (click → go dark)
  const icon = theme === "dark" ? "bi-sun-fill" : "bi-moon-fill";
  if (themeIcon)    themeIcon.className    = `bi ${icon}`;
  if (themeIconMob) themeIconMob.className = `bi ${icon}`;
}

function toggleTheme() {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

themeToggle    && themeToggle.addEventListener("click", toggleTheme);
themeToggleMob && themeToggleMob.addEventListener("click", toggleTheme);

/* ── NAVBAR — solid on scroll ────────────────────────────── */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > SCROLL_THRESHOLD) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Show / hide back-to-top button
  const btn = document.getElementById("backToTop");
  if (btn) {
    btn.classList.toggle("visible", window.scrollY > 500);
  }
});

/* ── MOBILE HAMBURGER MENU ───────────────────────────────── */
const hamburger  = document.getElementById("hamburger");
const hamburgerI = document.getElementById("hamburgerIcon");
const mobileMenu = document.getElementById("mobileMenu");

hamburger && hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburgerI.className = isOpen ? "bi bi-x-lg" : "bi bi-list";
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburgerI.className = "bi bi-list";
  });
});

/* ── SMOOTH SCROLL for all anchor links ──────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // height of fixed navbar
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ── BACK TO TOP ─────────────────────────────────────────── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ── ENROLL NOW — pre-fills course & scrolls to form ─────── */
function enrollCourse(courseName) {
  // Pre-fill the course field in the contact form
  const courseInput = document.getElementById("fcourse");
  if (courseInput) courseInput.value = courseName;

  // Scroll to the contact section
  const contact = document.getElementById("contact");
  if (contact) {
    const offset = 80;
    const top = contact.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    // Briefly highlight the course field so user notices it's filled
    if (courseInput) {
      setTimeout(() => {
        courseInput.style.borderColor = "var(--gold)";
        courseInput.focus();
        setTimeout(() => courseInput.style.borderColor = "", 2000);
      }, 700);
    }
  }
}

// ── Unlock Notes → WhatsApp ───────────────────────────────────
function unlockNotes(subject) {
  // ✏️ EDIT: Change 919876543210 to your WhatsApp number
  const text = `Hello! I want to unlock the *${subject} Notes* from Ashwini Coaching Classes. Please share the complete notes with me. 🙏`;
  window.open('https://wa.me/919876543210?text=' + encodeURIComponent(text), '_blank');
}

/* ── WHATSAPP FORM SUBMIT ────────────────────────────────── */
function submitWhatsApp(e) {
  e.preventDefault();

  const name    = document.getElementById("fname").value.trim()    || "—";
  const phone   = document.getElementById("fphone").value.trim()   || "—";
  const course  = document.getElementById("course-select").value.trim()  || "—";
  const message = document.getElementById("fmessage").value.trim() || "—";

  const text = [
    "*New Enquiry — Ashwini Coaching Classes*",
    "",
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Course / Class:* ${course}`,
    `*Message:* ${message}`,
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

/* ── ACTIVE NAV LINK on scroll (highlight current section) ── */
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll("#navbar .nav-link");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = "";
        link.style.opacity = "";
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.style.color = "var(--gold)";
          link.style.opacity = "1";
        }
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));
