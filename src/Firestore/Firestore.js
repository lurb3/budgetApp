import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCCymmn2LrN6KoCmgJkhIHgiRquET8rOYA",
    authDomain: "reacbudgetapp.firebaseapp.com",
    databaseURL: "https://reacbudgetapp.firebaseio.com",
    projectId: "reacbudgetapp",
    storageBucket: "reacbudgetapp.appspot.com",
    messagingSenderId: "20853837864"
};
firebase.initializeApp(config);
export default firebase;