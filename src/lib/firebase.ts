// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsP1VClHZg0IaiJhcZtU0Mjh0tXldo4Xk",
    authDomain: "elevepic.firebaseapp.com",
    databaseURL: "https://elevepic-default-rtdb.firebaseio.com",
    projectId: "elevepic",
    storageBucket: "elevepic.firebasestorage.app",
    messagingSenderId: "1083711925686",
    appId: "1:1083711925686:web:958acb8c7d3e3aac806517",
    measurementId: "G-8V1MFVC521"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);
const db = getFirestore(app);

// Initialize Analytics conditionally (client-side only)
let analytics;

if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, analytics, storage, db };
