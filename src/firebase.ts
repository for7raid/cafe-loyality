// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYI9ezn4aadQXLXLSvM_qeUSPHE8Ih0dk",
  authDomain: "cafe-loyality.firebaseapp.com",
  projectId: "cafe-loyality",
  storageBucket: "cafe-loyality.appspot.com",
  messagingSenderId: "735433177833",
  appId: "1:735433177833:web:6c418d460d52e6159a0e78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
auth.onAuthStateChanged(user => {
  if (!user) {
    //signInWithPopup(auth, new GoogleAuthProvider());
    signInAnonymously(auth);
  }
})