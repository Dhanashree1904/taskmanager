// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "workflowmanagermini.firebaseapp.com",
  projectId: "workflowmanagermini",
  storageBucket: "workflowmanagermini.firebasestorage.app",
  messagingSenderId: "665316258390",
  appId: "1:665316258390:web:9e281075b6778eaefd81f7",
  measurementId: "G-BXN0YBL2X7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);