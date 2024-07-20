// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics, setDefaultEventParameters } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKK3qxfUhmMia82PoOxsSt_1LF5NkjbDE",
  authDomain: "userauth-8e01a.firebaseapp.com",
  databaseURL: "https://userauth-8e01a-default-rtdb.firebaseio.com",
  projectId: "userauth-8e01a",
  storageBucket: "userauth-8e01a.appspot.com",
  messagingSenderId: "251704771304",
  appId: "1:251704771304:web:e1f2739c1cd1bb114aff5d",
  measurementId: "G-TH77Y8GDTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
export default app;