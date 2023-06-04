// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2CML05xx4YsJxi38XCtOsGkDOQFV7CdE",
  authDomain: "crud-com-firebase-45c0a.firebaseapp.com",
  projectId: "crud-com-firebase-45c0a",
  storageBucket: "crud-com-firebase-45c0a.appspot.com",
  messagingSenderId: "241790185579",
  appId: "1:241790185579:web:fe1fa8d4006337fb04012e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
