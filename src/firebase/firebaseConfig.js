import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9HLniqbrLiQD1L9u8gnalB-P7qbNpsCM",
    authDomain: "globosapp-cae3c.firebaseapp.com",
    projectId: "globosapp-cae3c",
    storageBucket: "globosapp-cae3c.appspot.com",
    messagingSenderId: "277268355601",
    appId: "1:277268355601:web:57e942a732d9cd0682efb0",
    measurementId: "G-E5W5XV5NE6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export {
      db,
      googleAuthProvider,
      firebase
  }