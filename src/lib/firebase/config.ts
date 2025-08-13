// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "oushodcloud-landing",
  appId: "1:1025068723943:web:61da3e085002c72da4bc42",
  storageBucket: "oushodcloud-landing.firebasestorage.app",
  apiKey: "AIzaSyDE6X1WFEKyjWM-pYvausslCL1a-5ZN0tY",
  authDomain: "oushodcloud-landing.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1025068723943"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
