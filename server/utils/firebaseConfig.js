const dotenv = require('dotenv');
dotenv.config();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEhgH_QSifVGAIduqxu8FFf2Nnd_3J4Cg",
  authDomain: "capstonea15.firebaseapp.com",
  projectId: "capstonea15",
  storageBucket: "capstonea15.appspot.com",
  messagingSenderId: "935316103825",
  appId: "1:935316103825:web:306ee1b2f44eac3a449530",
  measurementId: "G-J6JN7SEC43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = {
  auth
}