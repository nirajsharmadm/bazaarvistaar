const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("enquiryForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const config = window.BAZAARVISTAAR_CONFIG || {};
  const number = (config.whatsappNumber || "").replace(/\D/g, "");
  if (!number || number.includes("XXXXXXXXXX")) {
    alert("Please add your WhatsApp Business number in config.js before receiving enquiries.");
    return;
  }

  const data = new FormData(form);
  const message = [
    "Hello BazaarVistaar! I would like to enquire about your services.",
    "",
    `Name: ${data.get("name")}`,
    `Business: ${data.get("business")}`,
    `Mobile: ${data.get("phone")}`,
    `Service required: ${data.get("service")}`
  ].join("\n");

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});


document.querySelectorAll(".pricing-whatsapp").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    const config = window.BAZAARVISTAAR_CONFIG || {};
    const number = (config.whatsappNumber || "").replace(/\\D/g, "");
    if (!number) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const plan = button.dataset.plan || "a pricing plan";
    const message = `Hello BazaarVistaar! I’m interested in the ${plan} plan. Please share the details and next steps.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
});
