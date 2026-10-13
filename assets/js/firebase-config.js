/**
 * RideX Motors - Firebase Configuration & Initialization
 */

const firebaseConfig = {
  apiKey: "AIzaSyBVnn772269zI5QqHKOQCeOFNOVRn_dVz8",
  authDomain: "health-shark.firebaseapp.com",
  projectId: "health-shark",
  storageBucket: "health-shark.firebasestorage.app",
  messagingSenderId: "282353171783",
  appId: "1:282353171783:web:a53306e0d4b1f55382e062",
  measurementId: "G-ZRFMNJCNJZ"
};

// Global Firebase Wrapper with Safe Fallback Detection
window.RIDEX_FIREBASE = {
  isConfigured() {
    return (
      firebaseConfig.apiKey &&
      firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY"
    );
  },
  app: null,
  auth: null,
  db: null,
  storage: null,
  analytics: null
};

// Initialize Firebase if library is loaded and keys are set
try {
  if (typeof firebase !== "undefined" && window.RIDEX_FIREBASE.isConfigured()) {
    window.RIDEX_FIREBASE.app = firebase.initializeApp(firebaseConfig);
    window.RIDEX_FIREBASE.auth = firebase.auth();
    window.RIDEX_FIREBASE.db = firebase.firestore();
    window.RIDEX_FIREBASE.storage = firebase.storage();
    try {
      if (typeof firebase.analytics === "function") {
        window.RIDEX_FIREBASE.analytics = firebase.analytics();
      }
    } catch (e) {}
    console.log("⚡ RideX Motors: Firebase Cloud Services initialized successfully with project:", firebaseConfig.projectId);
  } else {
    console.info("ℹ️ RideX Motors: Running in LocalStorage / Seed Database mode.");
  }
} catch (error) {
  console.warn("⚠️ RideX Motors Firebase initialization error:", error);
}
