// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD3Yvh0NLomx-EUl2eZTf2QzzT6LwI4Rk",
  authDomain: "podcast-app-919c9.firebaseapp.com",
  projectId: "podcast-app-919c9",
  storageBucket: "podcast-app-919c9.appspot.com",
  messagingSenderId: "906947225925",
  appId: "1:906947225925:web:eab245c6c55f7e7952762c",
  measurementId: "G-E0WWQHF2T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db =getFirestore(app);
const storage= getStorage(app);
const auth = getAuth(app);

export {db, storage, auth};
