import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCSS0O7ku0xOarzarjVzzQHLg-hX1nqRTg',
    authDomain: 'facebook-messenger-clone-6617d.firebaseapp.com',
    databaseURL: 'https://facebook-messenger-clone-6617d.firebaseio.com',
    projectId: 'facebook-messenger-clone-6617d',
    storageBucket: 'facebook-messenger-clone-6617d.appspot.com',
    messagingSenderId: '929096286134',
    appId: '1:929096286134:web:887b18954af25d2eddcb17',
    measurementId: 'G-9D0CL2N2EQ',
});

const db = firebaseApp.firestore();

export default db;
