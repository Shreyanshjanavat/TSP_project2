
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCsa80MKTF-NOkBr0v8gbj-hXJ-HcifyYk",
  authDomain: "studyplatform-62856.firebaseapp.com",
  projectId: "studyplatform-62856",
  storageBucket: "studyplatform-62856.appspot.com",
  messagingSenderId: "139081496834",
  appId: "1:139081496834:web:6e95c96514c245d36eaa1b"
};
firebase.initializeApp(firebaseConfig);

export default firebase;