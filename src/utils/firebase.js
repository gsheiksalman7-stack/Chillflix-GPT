// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBGF4V1KWfrb67Jfq-Ie6hdXKjHGu53s0",
  authDomain: "chillflix-8a6fb.firebaseapp.com",
  projectId: "chillflix-8a6fb",
  storageBucket: "chillflix-8a6fb.firebasestorage.app",
  messagingSenderId: "236727172883",
  appId: "1:236727172883:web:2c15ffec7f474ed0eaa4e6",
  measurementId: "G-3MJPMSL2WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth()