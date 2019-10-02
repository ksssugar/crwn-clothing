import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDukxMC5bvsG9JLg-Y0dTB3-chEgjeFCoM",
    authDomain: "crown-db-2a2f3.firebaseapp.com",
    databaseURL: "https://crown-db-2a2f3.firebaseio.com",
    projectId: "crown-db-2a2f3",
    storageBucket: "",
    messagingSenderId: "1033626948832",
    appId: "1:1033626948832:web:ea02886d718ab83dde2c85",
    measurementId: "G-8WXJ700752"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;