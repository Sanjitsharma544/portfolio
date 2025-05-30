// Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyArUblMGjSboVjL0y9uXvcmD9yGCIeKLwQ",
  authDomain: "sanjit-kumar.firebaseapp.com",
  databaseURL: "https://sanjit-kumar-default-rtdb.firebaseio.com",
  projectId: "sanjit-kumar",
  storageBucket: "sanjit-kumar.firebasestorage.app",
  messagingSenderId: "607938989487",
  appId: "1:607938989487:web:ed76b81e87bc0873de335a",
  measurementId: "G-HNL7GT7S9C"
};*/
// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


    function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}
//Submit Form Data to Firebase
    document.getElementById("submit").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent form submission

  // Get input values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Reference to Firebase database
  const dbRef = ref(database, "phone");

  // Push data to Firebase
  push(dbRef, {
    name: name,
    phone:phone,
    email: email,
    message: message,
    timestamp: Date.now()

  })
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset(); // Clear the form
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message.");
    });
}
// for to write data

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sanjit-kumar-default-rtdb.firebaseio.com"
});

//
const db = admin.firestore();
function sendTelegramNotification(formData) {
  // Replace these with your actual Telegram Bot token and chat ID.
  const TELEGRAM_BOT_TOKEN = '7479865106:AAF-WWEWDRTUvTK5Zq7dOtPYA2g3uRIPR5w';
  const TELEGRAM_CHAT_ID = '5819112565';
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




function toggleMenu() {
  const menuOverlay = document.getElementById("menuOverlay");
  // Toggle the active class to show or hide the menu overlay
  menuOverlay.classList.toggle("active");
} 
