// import {
//   cert,
//   getApp,
//   getApps,
//   initializeApp,
// } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getStorage } from "firebase/storage";

// const credentials = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY
//     ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
//     : undefined,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   client_email: process.env.FIREBASE_CLIENT_EMAIL, 
// };

// const options = {
//   credential: cert(credentials),
// };

// function createFirebaseAdminApp(config) {
//   if (getApps().length === 0) {
//     return initializeApp(config);
//   } else {
//     return getApp();
//   }
// }

// const firebaseAdmin = createFirebaseAdminApp(options);
// export const adminAuth = getAuth(firebaseAdmin);
// export const Storage = getStorage(adminAuth)



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app, 'gs://produtosclear-3ac3c.appspot.com');