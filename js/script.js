const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Filter project cards by their category.
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
}));

// Client-side required field and email validation. No message is sent to a server.
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  const validEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  if (name.length < 2) {
    formStatus.textContent = "Please enter your name (at least 2 characters).";
    contactForm.elements.name.focus(); return;
  }
  if (!validEmail) {
    formStatus.textContent = "Please enter a valid email address.";
    contactForm.elements.email.focus(); return;
  }
  if (message.length < 10) {
    formStatus.textContent = "Please enter a message of at least 10 characters.";
    contactForm.elements.message.focus(); return;
  }
  formStatus.textContent = "Validation successful! This demo does not send the message.";
  contactForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
