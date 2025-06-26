// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRJM8d_WzCfjwHRCa34XA0AKa8ue8Wv0Q",
  authDomain: "portfolio-68be4.firebaseapp.com",
  projectId: "portfolio-68be4",
  storageBucket: "portfolio-68be4.appspot.com",
  messagingSenderId: "316696425331",
  appId: "1:316696425331:web:3f7557627c764debe20b06",
  measurementId: "G-BWK3XQYMQ7",
  databaseURL: "https://portfolio-68be4-default-rtdb.firebaseio.com"
};

// Initialize Firebaseñ
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  
const database = getDatabase(app);

// Validation functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

// Submit Form Data to Firebase
document.getElementById("submit").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent form submission
  console.log("Form submission initiated");
  // Get input values
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate input
  if (!name || !isValidPhone(phone) || !isValidEmail(email) || !message) {
    alert("Please fill all fields with valid information.");
    return;
  }

  // Reference to Firebase database
  const dbRef = ref(database, "phone");

  // Data format
  const formData = {
    name: name,
    phone: phone,
    email: email,
    message: message,
    timestamp: Date.now()
  };

  // Push data to Firebase
  push(dbRef, formData)
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset(); // Clear the form
      // Optionally send Telegram notification
      // sendTelegramNotification(formData);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message.");
    });
}

// Optional: Telegram notification (remove if not needed)
function sendTelegramNotification(formData) {
  const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
  const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
  const text = `New Form Submission:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
  
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text
    })
  })
  .then(response => response.json())
  .then(data => console.log('Telegram response:', data))
  .catch(error => console.error('Error sending Telegram notification:', error));
}

// Menu toggle function
function toggleMenu() {
  const menuOverlay = document.getElementById("menuOverlay");
  menuOverlay.classList.toggle("active");
}