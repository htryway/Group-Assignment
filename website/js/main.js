/* Next Level Gaming — shared site JavaScript
   One file, included on every page. Each block below checks for the
   elements it needs before doing anything, so it's safe to load this
   same file everywhere even though most features only apply to one page. */

document.addEventListener("DOMContentLoaded", () => {
  initToast();
  initAuthForms();
  initPackageTabs();
  initGalleryFilter();
  initFaqAccordion();
  initFeeCalculator();
  initContactForm();
  initMap();
  initToastLinks();
});

/* ---------- Toast (small popup message at the bottom of the screen) ---------- */

function initToast() {
  if (document.getElementById("toast")) return;
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = "toast";
  document.body.appendChild(toast);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// Any link or button with a data-toast attribute shows that message instead
// of doing nothing (this is what the "Register" buttons and "Add to
// Calendar" link use, since there's no real backend behind them yet).
function initToastLinks() {
  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(el.dataset.toast);
    });
  });
}

/* ---------- Home page: Sign In / Sign Up tabs ---------- */

function initAuthForms() {
  const tabs = document.querySelectorAll("#at button");
  const forms = document.querySelectorAll(".auth form");
  if (!tabs.length || !forms.length) return;

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.toggle("on", b === btn));
      forms.forEach((f) => f.classList.toggle("on", f.id === btn.dataset.f));
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".msg");
      if (form.id === "su") {
        const pass = form.querySelector("#p2");
        const confirm = form.querySelector("#c2");
        if (pass && confirm && pass.value !== confirm.value) {
          msg.textContent = "Passwords do not match.";
          return;
        }
      }
      msg.textContent = form.id === "si" ? "Signed in! Redirecting..." : "Account created! Redirecting...";
      setTimeout(() => (location.href = "packages.html"), 900);
    });
  });
}

/* ---------- Packages page: tab-switching feature panel ---------- */

function initPackageTabs() {
  const title = document.getElementById("pt");
  if (!title) return; // only the packages page has this element

  const PACKAGES = [
    [
      "Ultimate Gamer Pass",
      "Gain elite access to our premier gaming rigs. Includes high-spec RTX 4080 PCs, professional 240Hz monitors, top-tier mechanical gear, and full access to our massive console lineup.",
      "R1 500",
      "/ full day",
      "ultimate",
    ],
    [
      "VIP Gaming Experience",
      "A premium private booth with a platter and soda, plus tournament entry. Best for 1 - 4 players.",
      "R2 500",
      "/ session",
      "vip",
    ],
    [
      "Esports Training",
      "One-on-one coaching in a private coaching room with energy drinks and tournament entry. Up to 5 players.",
      "R1 800",
      "/ session",
      "stage",
    ],
    [
      "Birthday Party Package",
      "A party room with full catering and cake, a custom match and a tournament referee for 10 - 20 players.",
      "R4 500",
      "/ party",
      "events",
    ],
  ];

  const desc = document.getElementById("pd");
  const price = document.getElementById("pp");
  const unit = document.getElementById("pu");
  const img = document.getElementById("pi");

  document.querySelectorAll("#tabs .chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#tabs .chip").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      const pkg = PACKAGES[btn.dataset.i];
      title.textContent = pkg[0];
      desc.textContent = pkg[1];
      price.textContent = pkg[2];
      unit.textContent = pkg[3];
      img.src = "img/" + pkg[4] + ".jpg";
      img.alt = pkg[0];
    });
  });
}

/* ---------- Gallery page: category filter chips ---------- */

function initGalleryFilter() {
  const gallery = document.querySelector(".gal");
  if (!gallery) return; // only the gallery page has this element

  document.querySelectorAll("#tabs .chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#tabs .chip").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      document.querySelectorAll(".gal figure").forEach((fig) => {
        const show = !btn.dataset.c || fig.dataset.c === btn.dataset.c;
        fig.classList.toggle("hide", !show);
      });
    });
  });
}

/* ---------- FAQs page: accordion ---------- */

function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-q");
    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      items.forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- Fees page: interactive fee calculator ---------- */

const VAT_RATE = 0.15;

// More than 3 bookings gets the top discount tier.
function discountFor(totalBookings) {
  if (totalBookings <= 1) return 0;
  if (totalBookings === 2) return 0.05;
  if (totalBookings === 3) return 0.1;
  return 0.15;
}

function formatR(n) {
  return "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function initFeeCalculator() {
  const calc = document.getElementById("calc");
  if (!calc) return; // only the fees page has this element

  const items = Array.from(calc.querySelectorAll(".calc-row")).map((row) => ({
    row,
    price: parseFloat(row.dataset.price),
    qty: 0,
    qtyEl: row.querySelector(".qty span"),
  }));

  const subtotalEl = document.getElementById("calcSubtotal");
  const discountEl = document.getElementById("calcDiscount");
  const vatEl = document.getElementById("calcVat");
  const totalEl = document.getElementById("calcTotal");
  const noteEl = document.getElementById("calcNote");

  function recalc() {
    const totalBookings = items.reduce((sum, it) => sum + it.qty, 0);
    const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0);
    const rate = discountFor(totalBookings);
    const discount = subtotal * rate;
    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * VAT_RATE;
    const total = afterDiscount + vat;

    subtotalEl.textContent = formatR(subtotal);
    discountEl.textContent = "-" + formatR(discount);
    vatEl.textContent = formatR(vat);
    totalEl.textContent = formatR(total);
    noteEl.textContent =
      totalBookings > 0
        ? `${totalBookings} booking${totalBookings > 1 ? "s" : ""} selected — ${Math.round(rate * 100)}% squad discount applied.`
        : "Select at least one package to see your total.";
  }

  items.forEach((it) => {
    it.row.querySelector(".qty .sub").addEventListener("click", () => {
      it.qty = Math.max(0, it.qty - 1);
      it.qtyEl.textContent = it.qty;
      recalc();
    });
    it.row.querySelector(".qty .add").addEventListener("click", () => {
      it.qty += 1;
      it.qtyEl.textContent = it.qty;
      recalc();
    });
  });

  recalc();
}

/* ---------- Contact page: fake-submit contact form ---------- */

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.querySelector(".msg");
    msg.textContent = "Message sent! We'll get back to you within one business day.";
    form.reset();
  });
}

/* ---------- Contact page: map ---------- */

const ARENA_ADDRESS = "Block G, Maverick Esports Park, Sandton, Johannesburg, 2196";

function initMap() {
  const frame = document.getElementById("mapFrame");
  if (!frame) return; // only the contact page has this element

  // GOOGLE_MAPS_API_KEY comes from js/config.js, loaded before this file.
  // Same key as the mobile app (EXPO_PUBLIC_GOOGLE_MAPS_API_KEY in .env) —
  // sharing one unrestricted key across both is fine for a demo/prototype,
  // but before a public launch it's worth splitting into two keys (one
  // restricted to this domain, one to the app's package name) since a
  // single key can't be locked down for both platforms at once.
  const hasKey = typeof GOOGLE_MAPS_API_KEY === "string" && GOOGLE_MAPS_API_KEY.trim().length > 0;
  const encoded = encodeURIComponent(ARENA_ADDRESS);

  frame.src = hasKey
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encoded}`
    : `https://www.google.com/maps?q=${encoded}&output=embed`;
}
