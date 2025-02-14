import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "splitkaro-69fa3.firebaseapp.com",
  projectId: "splitkaro-69fa3",
  storageBucket: "splitkaro-69fa3.firebasestorage.app",
  messagingSenderId: "184801560993",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-JLT6WSG8TZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;