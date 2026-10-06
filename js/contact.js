document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const check = (input, testFn, message) => {
    const field = input.closest(".field");
    const valid = testFn(input.value.trim());
    field.classList.toggle("has-error", !valid);
    field.querySelector(".field-error").textContent = message;
    return valid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const phone = document.getElementById("contact-phone");
    const message = document.getElementById("contact-message");

    const ok =
      check(name, (v) => v.length >= 2, "Enter your full name.") &
      check(email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email address.") &
      check(phone, (v) => /^[+0-9()\s-]{7,}$/.test(v), "Enter a valid phone number.") &
      check(message, (v) => v.length >= 10, "Tell us a little more (at least 10 characters).");

    const successEl = document.getElementById("contact-success");
    if (ok) {
      form.reset();
      successEl.style.display = "block";
      successEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      successEl.style.display = "none";
    }
  });
});
