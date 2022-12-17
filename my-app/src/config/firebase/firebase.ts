import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: "xxx",
  authDomain: "react-eth-swap.firebaseapp.com",
  databaseURL: "https://react-eth-swap-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-eth-swap",
  storageBucket: "react-eth-swap.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx"
}

const app = firebase.initializeApp(config);

export const auth = getAuth(app);

export default app;