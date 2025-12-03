import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    'AIzaSyA4LU4hYcwxPKzW22eLBZ5Qrm83NqR3d-4',
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'siga-8d770.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'siga-8d770',
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    'siga-8d770.firebasestorage.app',
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '737541935480',
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    '1:737541935480:web:cc686ca11108274ae2b88d',
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-HTHRV0SH65',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
