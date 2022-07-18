import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
//storing a data in firebase
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCRRZATgfk2cA9PkxctgvzZZYq2b60wyQQ",
  authDomain: "bookify-1ff31.firebaseapp.com",
  projectId: "bookify-1ff31",
  storageBucket: "bookify-1ff31.appspot.com",
  messagingSenderId: "823182535244",
  appId: "1:823182535244:web:41831d4d0bcfe42f1ce2e9",
};

export const useFirebase = () => useContext(FirebaseContext);

//creating a instences
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

//Google Provider
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  //to check wether the user is logd in or not
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  // Register Function
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  //Login Function
  const signinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  //Google Function
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  //storing a data in firebase
  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, "uploads/images/${Date.now()}-${cover.name}");
    const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  //function to display the stored collection/books in homepage
  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  //function to get a details
  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  // function to get a URL
  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  //function to Place Order
  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  //function to check wether the user is logd in or not
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getBookById,
        getImageURL,
        placeOrder,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
