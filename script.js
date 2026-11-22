// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Footer year
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Contact form: client-side validation, then hand off to the visitor's email app
const form = document.getElementById("contactForm");

if (form) {
  const fields = ["name", "email", "message"];

  const setError = (name, show) => {
    const input = form.elements[name];
    const error = form.querySelector(`[data-error-for="${name}"]`);
    if (input) input.classList.toggle("invalid", show);
    if (error) error.classList.toggle("show", show);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    fields.forEach((name) => {
      const value = form.elements[name].value.trim();
      let ok = value.length > 0;
      if (name === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (ok && (name === "name" || name === "message")) ok = value.length >= 2;
      if (!ok) valid = false;
      setError(name, !ok);
    });

    if (!valid) return;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:rafaqatmuhammadaown537@gmail.com?subject=${subject}&body=${body}`;

    const success = document.getElementById("formSuccess");
    if (success) success.hidden = false;
  });
}
