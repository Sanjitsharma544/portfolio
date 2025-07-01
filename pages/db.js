// db.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

console.log("Firebase initialized:", database);

/**
 * Save contact form data to Firebase
 */
export function saveFormData(formData) {
  const dbRef = ref(database, "phone");
  return push(dbRef, formData);
}

/**
 * Send a Telegram notification
 */
export async function sendTelegramNotification(formData) {
const TELEGRAM_BOT_TOKEN = '7566345404:AAEJsRfi8dQYhgjfwO9JcEZxmz1PEvdRMs4';
const TELEGRAM_CHAT_ID = '6813050265';  // Replace with your chat ID from getUpdates

  const text = `New Form Submission:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
  
  return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text
    })
  })
  .then(response => response.json());
}
