import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import admin from 'firebase-admin'

import serviceAccount from './service-account/firebase-admin-key.json' assert { type: 'json' }

initializeApp({
  credential: cert(serviceAccount)
});

const db = admin.firestore()

// Try fetching some data from a Firestore project
const validateFirestoreConnection = async () => {
  try {
    const databaseInfo = await db;

    // If there are no errors, the connection is successful
    if (process.env.FIREBASE_PROJECT_ID === databaseInfo._projectId) {
        console.log('Connected to Firestore successfully!');
    } else {
        console.log('FIREBASE_PROJECT_ID not defined!');
    }
    return true;
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    return false;
  }
};

export {
  db,
  validateFirestoreConnection,
}
