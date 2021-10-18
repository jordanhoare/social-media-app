// CONSOLE:  https://console.firebase.google.com/project/socialapp-bfde5/
// DOCS:  https://firebase.google.com/docs/storage/web/upload-files
// SECURITY:  https://firebase.google.com/docs/storage/security/rules-conditions#public


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf80c5U2-3tCqL8Dxe8JtPbuDohluP3_Q",
  authDomain: "socialapp-bfde5.firebaseapp.com",
  projectId: "socialapp-bfde5",
  storageBucket: "socialapp-bfde5.appspot.com",
  messagingSenderId: "701517272978",
  appId: "1:701517272978:web:53a27f02972a8c0a8e134b",
  measurementId: "G-QP4M1N3YBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 