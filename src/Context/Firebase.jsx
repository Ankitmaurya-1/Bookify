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
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

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

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const isLoggedIn = user ? true : false;

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const handleCreateNewListing = async (name, isbn, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );

    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageUrl: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        isLoggedIn,
        signinWithGoogle,
        signupWithEmailandPassword,
        signinWithEmailandPassword,
        handleCreateNewListing,
        listAllBooks,
        getImageUrl,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
