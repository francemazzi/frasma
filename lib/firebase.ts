// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAE_ltPSRvcTczi_XdjsXHUR3sCkYhifUM",
  authDomain: "frasma-4d8cc.firebaseapp.com",
  projectId: "frasma-4d8cc",
  storageBucket: "frasma-4d8cc.appspot.com",
  messagingSenderId: "739805919081",
  appId: "1:739805919081:web:b8a6518f4fef13233b6ff8",
  measurementId: "G-WE9ZZZGG1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (!firebase.getApp.length) {
  firebase.initializeApp(firebaseConfig);
}

// export const auth = firebase.getAuth();
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
