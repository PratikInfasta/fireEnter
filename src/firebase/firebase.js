// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';     // ✅ Firestore
import { getDatabase } from 'firebase/database';        // Realtime Database
import { getStorage } from 'firebase/storage';          // Optional: Storage
// import { getAuth } from 'firebase/auth';                // Optional: Auth

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-abcqofKKMTsuMUUAsTEW9YZXUGC-XJU",
  authDomain: "hellofirebase-6a550.firebaseapp.com",
  // databaseURL: "https://hellofirebase-6a550-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hellofirebase-6a550",
  storageBucket: "hellofirebase-6a550.appspot.com",
  messagingSenderId: "657024742304",
  appId: "1:657024742304:android:7741ee7c3c97a4e12d6ac5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const firestore = getFirestore(app);   // 🔥 Firestore
export const db = getDatabase(app);           // 📡 Realtime Database
// export const auth = getAuth(app);             // 🔐 Auth
export const storage = getStorage(app);       // 📦 Storage
