/**
 * RideX Motors - Firebase Configuration & Initialization
 * 
 * Replace the values below with your Firebase Project credentials:
 * Firebase Console > Project Settings > General > Your Apps > Web App
 */

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "ridexmotors.firebaseapp.com",
  projectId: "ridexmotors",
  storageBucket: "ridexmotors.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-RIDEX12345"
};

// Global Firebase Wrapper with Safe Fallback Detection
window.RIDEX_FIREBASE = {
  isConfigured() {
    return (
      firebaseConfig.apiKey &&
      firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
      firebaseConfig.projectId !== "ridexmotors"
    );
  },
  app: null,
  auth: null,
  db: null,
  storage: null
};

// Initialize Firebase if library is loaded and keys are set
try {
  if (typeof firebase !== "undefined" && window.RIDEX_FIREBASE.isConfigured()) {
    window.RIDEX_FIREBASE.app = firebase.initializeApp(firebaseConfig);
    window.RIDEX_FIREBASE.auth = firebase.auth();
    window.RIDEX_FIREBASE.db = firebase.firestore();
    window.RIDEX_FIREBASE.storage = firebase.storage();
    console.log("⚡ RideX Motors: Firebase Cloud Services initialized successfully.");
  } else {
    console.info("ℹ️ RideX Motors: Running in LocalStorage / Seed Database mode (Firebase ready to connect).");
  }
} catch (error) {
  console.warn("⚠️ RideX Motors Firebase initialization error:", error);
}
