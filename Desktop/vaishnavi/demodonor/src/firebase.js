import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzkG0Oet4rEDXGxf0z8PBPj2lAsVD2KEo",
    authDomain: "demodonor.firebaseapp.com",
    projectId: "demodonor",
    storageBucket: "demodonor.firebasestorage.app",
    messagingSenderId: "191295114545",
    appId: "1:191295114545:web:c9486aeed27502c030f410",
    measurementId: "G-VHQB6B8MHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
