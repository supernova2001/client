// Firebase initialization for the client app
// Uses the SDK v9 modular APIs

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// NOTE: `storageBucket` should normally end with `appspot.com`.
// If uploads fail, double‑check your bucket name in Firebase console.
const firebaseConfig = {
  apiKey: 'AIzaSyBjLra_Cecz0BeJcZ5_6DQi-BqHU85u9bg',
  authDomain: 'walmart-assessment-7bce2.firebaseapp.com',
  projectId: 'walmart-assessment-7bce2',
  storageBucket: 'walmart-assessment-7bce2.firebasestorage.app',
  messagingSenderId: '842664786180',
  appId: '1:842664786180:web:ed4df801eebd1a8c9ef851',
  measurementId: 'G-NXCLQ5BCQN',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseFunctions = getFunctions(firebaseApp);


