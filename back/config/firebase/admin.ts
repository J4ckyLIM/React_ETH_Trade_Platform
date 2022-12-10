import * as admin from 'firebase-admin';

export type App = admin.app.App;

const serviceAccount = require('../../../config/serviceAccount.json');

const firebaseApp: App = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default firebaseApp;