// contact.js
import { saveFormData, sendTelegramNotification } from './db.js';

    console.log("contact page script loaded");

// Validation functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

// Submit Form Data
document.getElementById("submit").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();
  console.log("Form submission initiated");

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !isValidPhone(phone) || !isValidEmail(email) || !message) {
    alert("Please fill all fields with valid information.");
    return;
  }

  const formData = {
    name,
    phone,
    email,
    message,
    timestamp: Date.now()
  };

  console.log("Sending form data:", formData);

  saveFormData(formData)
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset();
      // Optional: also send Telegram
      return sendTelegramNotification(formData);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message.");
    });
}

// Menu toggle
function toggleMenu() {
  console.log("contact page toggle called");
  const menuOverlay = document.getElementById("menuOverlay");
  const contentWrapper = document.querySelector('.content-wrapper');
  document.body.classList.toggle('menu-open');
  menuOverlay.classList.toggle("active");
}

// Update Footer Year
document.getElementById("year").textContent = new Date().getFullYear();
