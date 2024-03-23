import { useContext, createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD8TSLOfutanQGD_i7iFwUIv2ucRUQEYm0",
  authDomain: "bookify1-55b91.firebaseapp.com",
  projectId: "bookify1-55b91",
  storageBucket: "bookify1-55b91.appspot.com",
  messagingSenderId: "1090503864501",
  appId: "1:1090503864501:web:62a591b16ef9a15fc94efc",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signupWithEmailandPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinWithEmailandPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        isLoggedIn,
        signinWithGoogle,
        signupWithEmailandPassword,
        signinWithEmailandPassword,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
