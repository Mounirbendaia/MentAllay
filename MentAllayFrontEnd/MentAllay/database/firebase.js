import * as firebase from 'firebase';
import "firebase/firestore";
import 'firebase/storage';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "****************************",
    authDomain: "****************************",
    projectId: "****************************",
    storageBucket: "****************************",
    messagingSenderId: "****************************",
    appId: "****************************",
    measurementId: "****************************"
  };
 firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
  let app;

  if(firebase.apps.lenght === 0){
   app = firebase.initializeApp(firebaseConfig);
  } else{
    app= firebase.app();
  }

const forgotPassword = (Email) => {

    console.log("reset email sent to " + Email);
    sendPasswordResetEmail(auth, Email, null)
        .then(() => {
            alert("reset email sent to " + Email);
        })
        .catch(function (e) {
            console.log(e);
        });
};

const auth = firebase.auth();
const db = app.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref(); 
  export {auth, db,storage,storageRef,forgotPassword}