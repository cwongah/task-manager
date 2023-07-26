// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2xJHOlnxseBgoXUDroNsdbuhYWpT3unI",
  authDomain: "task-manager-4817a.firebaseapp.com",
  projectId: "task-manager-4817a",
  storageBucket: "task-manager-4817a.appspot.com",
  messagingSenderId: "932546699290",
  appId: "1:932546699290:web:0c5a89e9fe66c945c571a3",
  measurementId: "G-H1MZGQDD06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
export const db = getFirestore()
// export const emailProvider =  new EmailAuthProvider()
// export const gmailProvider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);