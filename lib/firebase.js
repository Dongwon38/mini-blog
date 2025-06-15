// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDRNcZmChk3Km1U--peWkMCl1nAwI_Eo4",
  authDomain: "mini-blog-9999.firebaseapp.com",
  projectId: "mini-blog-9999",
  storageBucket: "mini-blog-9999.firebasestorage.app",
  messagingSenderId: "393827102290",
  appId: "1:393827102290:web:6624f22da33c427849398b",
  measurementId: "G-2QQEDRL474"
};

// ✅ 앱 중복 초기화를 방지하기 위해 아래처럼 조건 처리
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };