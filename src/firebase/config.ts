import firebase, { initializeApp } from 'firebase/app';
import { getFirestore,collection,addDoc,getDocs ,deleteDoc} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAE_d8hA2TqzSGi4yrqjjW3Uj3-C4yJhHo',

  authDomain: 'notesapp-aaf4c.firebaseapp.com',

  projectId: 'notesapp-aaf4c',

  storageBucket: 'notesapp-aaf4c.firebasestorage.app',

  messagingSenderId: '150158978490',

  appId: '1:150158978490:web:1062bf88e106519ef88183',

  measurementId: 'G-7Q1R1HDVJE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {app,db,getFirestore,collection,addDoc,getDocs,deleteDoc};
