// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCwuk1pYHnTjA656TRMFPDNpuHqKYEgqdc",
    authDomain: "arc-tech-1c0c7.firebaseapp.com",
    projectId: "arc-tech-1c0c7",
    storageBucket: "arc-tech-1c0c7.firebasestorage.app",
    messagingSenderId: "630860272842",
    appId: "1:630860272842:web:3c428f101d615dfb829033",
    measurementId: "G-SVXL4ZPTCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
