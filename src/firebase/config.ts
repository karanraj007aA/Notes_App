import firebase from 'firebase/app';
import 'firebase/firestore';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
