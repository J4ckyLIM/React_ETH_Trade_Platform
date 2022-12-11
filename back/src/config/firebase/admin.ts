import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../serviceAccount.json';

export type App = admin.app.App;


const firebaseApp: App = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export default firebaseApp;