// Firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDPZ4nKPpjPeBEwVyUGKffY2A8VorzGTdw",
  authDomain: "list-376df.firebaseapp.com",
  projectId: "list-376df",
  storageBucket: "list-376df.appspot.com",
  messagingSenderId: "147835057647",
  appId: "1:147835057647:web:bfc74ec5604b8f842d321a"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}
