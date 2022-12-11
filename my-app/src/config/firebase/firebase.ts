import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyDlhhdAhp-u8Z5knDFzsqcd-SOM4S-FoO8",
  authDomain: "react-eth-swap.firebaseapp.com",
  databaseURL: "https://react-eth-swap-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-eth-swap",
  storageBucket: "react-eth-swap.appspot.com",
  messagingSenderId: "248034315420",
  appId: "1:248034315420:web:d43bc0b2dcffc3641a3159"
}

const app = firebase.initializeApp(config);

export const auth = getAuth(app);

export default app;