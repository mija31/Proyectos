import firebase from 'firebase/app';

import "firebase/firestore";

const config = firebase.initializeApp({
    apiKey: "AIzaSyBqhrW6ectETXAoKchy9rRCZTlHLO48cT4",
    authDomain: "sistemanotificacion-1b45a.firebaseapp.com",
    databaseURL: "https://sistemanotificacion-1b45a.firebaseio.com",
    projectId: "sistemanotificacion-1b45a",
    storageBucket: "sistemanotificacion-1b45a.appspot.com",
    messagingSenderId: "673983138821"
});

export const db = config.firestore()

