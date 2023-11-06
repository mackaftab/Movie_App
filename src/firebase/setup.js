
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBMvhh5Oa2jPmSHZ4Q1BDPRshjP51Ckgx0",
  authDomain: "movieapp-742ed.firebaseapp.com",
  projectId: "movieapp-742ed",
  storageBucket: "movieapp-742ed.appspot.com",
  messagingSenderId: "354803243886",
  appId: "1:354803243886:web:c1352edaa05715d9b03f7f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app)