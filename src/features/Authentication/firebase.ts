import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const env = process.env.ENV || 'dev';
const bucket =
  env === 'dev'
    ? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV
    : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PROD;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: "your databaseURL here",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: bucket,
  messagingSenderId: `241723989064`,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export { messaging, firebase };
