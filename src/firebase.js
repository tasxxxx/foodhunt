import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAOLOKgG87rzx_6VmcjDxTSZ3-CqvfzlDQ",
    authDomain: "bt3103-project-8c8a0.firebaseapp.com",
    projectId: "bt3103-project-8c8a0",
    storageBucket: "bt3103-project-8c8a0.appspot.com",
    messagingSenderId: "690856668159",
    appId: "1:690856668159:web:6e70e6de3e5ba05e2b55ca",
    measurementId: "G-E6CVSMS1NT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//initialize firebase auth
//const auth = firebase.auth();
//const auth = getAuth();


//export default { firebaseApp, auth };
export default firebaseApp