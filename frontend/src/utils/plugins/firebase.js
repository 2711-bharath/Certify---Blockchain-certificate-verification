import firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBqLPXUu26PRFb6dbfYKSCmM1wA7xQPjJ8",
  authDomain: "certify-14.firebaseapp.com",
  projectId: "certify-14",
  storageBucket: "certify-14.appspot.com",
  messagingSenderId: "1062920692551",
  appId: "1:1062920692551:web:d36f4f6b6ffa292df1e262",
  measurementId: "G-GFP7C8M4TL",
};

// Initialize Firebase
firebase.initializeApp(config);

const storage = firebase.storage();

export { firebase, storage };
