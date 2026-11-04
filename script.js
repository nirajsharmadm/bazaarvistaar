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


// Open the exact pricing accordion when arriving from a service-card link.
function openLinkedServicePricing() {
  const rawHash = window.location.hash.slice(1);
  if (!rawHash) return;
  let targetId;
  try { targetId = decodeURIComponent(rawHash); } catch { targetId = rawHash; }
  const target = document.getElementById(targetId);
  if (!target || !target.matches("details.service-accordion")) return;

  // Close other service panels so only the requested service is shown.
  document.querySelectorAll("details.service-accordion[open]").forEach(panel => {
    if (panel !== target) panel.open = false;
  });
  target.open = true;

  // Wait for the details content to expand, then align it below the sticky header.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

window.addEventListener("load", openLinkedServicePricing);
window.addEventListener("hashchange", openLinkedServicePricing);
