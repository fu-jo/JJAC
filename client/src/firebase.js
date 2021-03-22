import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAmqgJYuv_rCMZOs4AyEj9Wy58f3xe6r-U",
  authDomain: "jjac-a2e9c.firebaseapp.com",
  databaseURL: "https://jjac-a2e9c-default-rtdb.firebaseio.com/",
  projectId: "jjac-a2e9c",
  storageBucket: "jjac-a2e9c.appspot.com",
  messagingSenderId: "455608075987",
  appId: "1:455608075987:web:bd7d8e8858f57528123626",
  measurementId: "G-VWN08GDHZ3"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export default firebase
