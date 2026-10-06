/* =========================================================
   Calculate Fees page logic.
   - selections: { itemId: quantity }
   - Discount tier is looked up from NL_DATA (single source
     of truth), so it can never disagree with the report.
   ========================================================= */

const nlFmt = (n) =>
  "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const nlSelections = {};

function nlItemRowHTML(item) {
  return `
    <div class="item-row" data-item="${item.id}">
      <div>
        <strong>${item.name}</strong><br/>
        <span class="item-price">R${item.price.toLocaleString("en-ZA")}</span>
      </div>
      <div class="stepper">
        <button type="button" class="is-sub" aria-label="Decrease ${item.name}">&minus;</button>
        <output>0</output>
        <button type="button" class="is-add" aria-label="Increase ${item.name}">+</button>
      </div>
    </div>`;
}

function nlRenderItemRows() {
  const mount = document.getElementById("fees-item-list");
  if (!mount) return;
  mount.innerHTML = NL_DATA.allItems.map(nlItemRowHTML).join("");

  mount.querySelectorAll(".item-row").forEach((row) => {
    const id = row.dataset.item;
    const output = row.querySelector("output");
    row.querySelector(".is-add").addEventListener("click", () => {
      nlSelections[id] = (nlSelections[id] || 0) + 1;
      output.textContent = nlSelections[id];
      nlRecalculate();
    });
    row.querySelector(".is-sub").addEventListener("click", () => {
      nlSelections[id] = Math.max(0, (nlSelections[id] || 0) - 1);
      output.textContent = nlSelections[id];
      nlRecalculate();
    });
  });
}

function nlCalculateTotals() {
  const lineItems = [];
  let totalBookings = 0;
  let subtotal = 0;

  NL_DATA.allItems.forEach((item) => {
    const qty = nlSelections[item.id] || 0;
    if (qty > 0) {
      const lineTotal = qty * item.price;
      lineItems.push({ ...item, qty, lineTotal });
      totalBookings += qty;
      subtotal += lineTotal;
    }
  });

  const discountRate = NL_DATA.discountFor(totalBookings);
  const discountAmount = subtotal * discountRate;
  const afterDiscount = subtotal - discountAmount;
  const vat = afterDiscount * NL_DATA.vatRate;
  const grandTotal = afterDiscount + vat;

  return { lineItems, totalBookings, subtotal, discountRate, discountAmount, afterDiscount, vat, grandTotal };
}

function nlRecalculate() {
  const t = nlCalculateTotals();
  const summary = document.getElementById("fees-summary-lines");
  const chip = document.getElementById("fees-discount-chip");
  const proceedBtn = document.getElementById("fees-proceed-btn");

  if (t.lineItems.length === 0) {
    summary.innerHTML = `<p class="summary-line">Add a package or experience to see your total.</p>`;
    chip.textContent = "No items selected";
  } else {
    summary.innerHTML =
      t.lineItems
        .map(
          (li) =>
            `<div class="summary-line"><span>${li.qty} &times; ${li.name}</span><span>${nlFmt(li.lineTotal)}</span></div>`
        )
        .join("") +
      `<div class="summary-line"><span>Subtotal</span><span>${nlFmt(t.subtotal)}</span></div>` +
      `<div class="summary-line discount"><span>Discount (${Math.round(t.discountRate * 100)}%)</span><span>-${nlFmt(t.discountAmount)}</span></div>` +
      `<div class="summary-line"><span>After Discount</span><span>${nlFmt(t.afterDiscount)}</span></div>` +
      `<div class="summary-line"><span>VAT (${Math.round(NL_DATA.vatRate * 100)}%)</span><span>${nlFmt(t.vat)}</span></div>` +
      `<div class="summary-line total"><span>Grand Total</span><span>${nlFmt(t.grandTotal)}</span></div>`;

    chip.textContent =
      t.discountRate > 0
        ? `${t.totalBookings} bookings — ${Math.round(t.discountRate * 100)}% discount applied`
        : `${t.totalBookings} booking — book another to unlock a discount`;
  }

  // Highlight the active row in the discount reference table
  document.querySelectorAll("#fees-tier-ref li").forEach((li) => {
    const lo = Number(li.dataset.min);
    const hi = li.dataset.max === "inf" ? Infinity : Number(li.dataset.max);
    li.classList.toggle("active", t.totalBookings >= lo && t.totalBookings <= hi);
  });

  proceedBtn.disabled = t.lineItems.length === 0;
  return t;
}

/* ---------- Customer detail validation ---------- */
function nlValidateField(input, testFn, message) {
  const field = input.closest(".field");
  const valid = testFn(input.value.trim());
  field.classList.toggle("has-error", !valid);
  const errorEl = field.querySelector(".field-error");
  if (errorEl) errorEl.textContent = message;
  return valid;
}

function nlValidateCustomerDetails() {
  const name = document.getElementById("fees-name");
  const email = document.getElementById("fees-email");
  const phone = document.getElementById("fees-phone");

  const nameOk = nlValidateField(name, (v) => v.length >= 2, "Enter your full name.");
  const emailOk = nlValidateField(
    email,
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    "Enter a valid email address."
  );
  const phoneOk = nlValidateField(
    phone,
    (v) => /^[+0-9()\s-]{7,}$/.test(v),
    "Enter a valid phone number."
  );

  return nameOk && emailOk && phoneOk;
}

/* ---------- Invoice ---------- */
function nlBookingReference() {
  return "NL-2026-" + Math.floor(1000 + Math.random() * 9000);
}

function nlShowInvoice(totals) {
  const box = document.getElementById("fees-invoice");
  const name = document.getElementById("fees-name").value.trim();
  const email = document.getElementById("fees-email").value.trim();
  const phone = document.getElementById("fees-phone").value.trim();
  const ref = nlBookingReference();
  const today = new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });

  box.innerHTML = `
    <h3>Invoice — ${ref}</h3>
    <p>Issued ${today} to <strong>${name}</strong> (${email}, ${phone})</p>
    <table>
      <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Line Total</th></tr></thead>
      <tbody>
        ${totals.lineItems
          .map(
            (li) =>
              `<tr><td>${li.name}</td><td>${li.qty}</td><td>${nlFmt(li.price)}</td><td>${nlFmt(li.lineTotal)}</td></tr>`
          )
          .join("")}
      </tbody>
    </table>
    <div class="summary-line"><span>Subtotal</span><span>${nlFmt(totals.subtotal)}</span></div>
    <div class="summary-line discount"><span>Discount (${Math.round(totals.discountRate * 100)}%)</span><span>-${nlFmt(totals.discountAmount)}</span></div>
    <div class="summary-line"><span>VAT (${Math.round(NL_DATA.vatRate * 100)}%)</span><span>${nlFmt(totals.vat)}</span></div>
    <div class="summary-line total"><span>Grand Total</span><span>${nlFmt(totals.grandTotal)}</span></div>
    <button type="button" class="btn btn-secondary mt-lg" onclick="window.print()">Print Invoice</button>
  `;
  box.classList.add("is-visible");
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function nlPrefillFromQueryString() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id && NL_DATA.allItems.some((i) => i.id === id)) {
    nlSelections[id] = 1;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  nlPrefillFromQueryString();
  nlRenderItemRows();

  // Reflect any pre-filled quantities in the stepper outputs
  Object.entries(nlSelections).forEach(([id, qty]) => {
    const row = document.querySelector(`.item-row[data-item="${id}"] output`);
    if (row) row.textContent = qty;
  });

  nlRecalculate();

  const form = document.getElementById("fees-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const detailsOk = nlValidateCustomerDetails();
    const totals = nlRecalculate();
    if (!detailsOk || totals.lineItems.length === 0) {
      if (totals.lineItems.length === 0) {
        alert("Select at least one package or experience before calculating your fees.");
      }
      return;
    }
    nlShowInvoice(totals);
  });
});
