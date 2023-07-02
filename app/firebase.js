// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmiiDeZTQJ-EFSs_V0ZGm-XEuxgES2wTY",
  authDomain: "expense-tracker-5da15.firebaseapp.com",
  projectId: "expense-tracker-5da15",
  storageBucket: "expense-tracker-5da15.appspot.com",
  messagingSenderId: "912083823810",
  appId: "1:912083823810:web:ffad0a550275b69dba1f5b",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
