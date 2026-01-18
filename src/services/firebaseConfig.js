import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Firebase configuration
// Get your own config at: https://console.firebase.google.com
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKey123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "warehouse-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "warehouse-racking-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "warehouse-racking-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abc123def456"
}

// Initialize Firebase
let app
let db
let auth

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
} catch (error) {
  console.error("Firebase initialization error:", error)
  // Fallback to localStorage if Firebase fails
}

export { db, auth, app }
export const isFirebaseEnabled = !!db
