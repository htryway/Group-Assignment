/* =========================================================
   Next Level Gaming & Esports Arena — shared components
   The logo, nav and footer are built here ONCE and injected
   into every page, so the brand mark and links can never
   drift out of sync between pages again.

   Logo and icon artwork lives in real files under /assets,
   not generated inline — see assets/logo/ and assets/icons/.
   ========================================================= */

const NL_LOGO_BADGE = "assets/logo/badge.svg";
const NL_ICON = (name) => `assets/icons/${name}.svg`;

const NL_NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About Us" },
  { href: "overview.html", label: "Packages" },
  { href: "experiences.html", label: "Experiences" },
  { href: "fees.html", label: "Calculate Fees" },
  { href: "contact.html", label: "Contact" },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function nlLogoMarkup(size) {
  return `
    <img src="${NL_LOGO_BADGE}" width="${size}" height="${size}" alt="Next Level logo" class="nl-badge" />
    <span class="nav-wordmark">
      <strong>NEXT LEVEL</strong>
      <small>GAMING</small>
    </span>`;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const here = currentPage();

  const links = NL_NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="nav-link${l.href === here ? " is-active" : ""}"${
      l.href === here ? ' aria-current="page"' : ""
    }>${l.label}</a>`
  ).join("");

  mount.innerHTML = `
    <div class="nav-wrap">
      <a href="index.html" class="nav-logo">${nlLogoMarkup(40)}</a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-links" id="nav-links">
        ${links}
      </nav>
      <a href="fees.html" class="btn btn-primary nav-cta">Book Now</a>
    </div>
  `;

  const toggle = mount.querySelector(".nav-toggle");
  const navLinks = mount.querySelector("#nav-links");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const c = NL_DATA.contact;

  const socialLinks = [
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "twitter", label: "Twitter" },
    { key: "youtube", label: "YouTube" },
  ];

  mount.innerHTML = `
    <div class="footer-grid container">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo">${nlLogoMarkup(36)}</a>
        <p>Africa's ultimate premium esports arena. World-class gaming rigs, high-performance
          network infrastructure and immersive experiences in Sandton, Johannesburg.</p>
        <div class="footer-social">
          ${socialLinks
            .map(
              (s) => `
            <a href="${c.social[s.key]}" aria-label="${s.label}">
              <img src="${NL_ICON(s.key)}" width="16" height="16" alt="" />
            </a>`
            )
            .join("")}
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About Us</a>
        <a href="overview.html">Packages</a>
        <a href="experiences.html">Experiences</a>
        <a href="fees.html">Calculate Fees</a>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <p class="footer-icon-line"><img src="${NL_ICON("location")}" width="14" height="14" alt="" />${c.address}</p>
        <a class="footer-icon-line" href="tel:${c.phoneHref}"><img src="${NL_ICON("phone")}" width="14" height="14" alt="" />${c.phone}</a>
        <a class="footer-icon-line" href="mailto:${c.email}"><img src="${NL_ICON("email")}" width="14" height="14" alt="" />${c.email}</a>
      </div>
      <div class="footer-col">
        <h4>Operating Hours</h4>
        ${c.hours.map((h) => `<p><span>${h.day}</span><span>${h.time}</span></p>`).join("")}
      </div>
    </div>
    <div class="footer-bottom container">
      <p>&copy; 2026 Next Level Gaming &amp; Esports Arena. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
