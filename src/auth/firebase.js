import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

//* Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxABgp5cby1FwKQi5SrT2UuMn1dHW-VPk",
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const createUser = async(email, password, navigate, displayName) => {
  try {
    let userCredentials = await createUserWithEmailAndPassword(auth, email, password) 
    console.log(userCredentials);
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    })
    navigate("/") 
    toastSuccessNotify("Registered successfully")
  }
  catch (error) {
    alert(error.message);
    toastErrorNotify(error.message);
  }
}

export const signIn = async(email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    navigate("/")
    toastSuccessNotify("Logged successfully")
  } catch (error) {
    toastErrorNotify(error.message);
  }
}


export const userObserver = (setCurrentUser) => {  
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const {email, displayName, photoURL} = user
    setCurrentUser(user)
  } else { 
console.log("User is signed out");
  }
  })
}

export const logOut = () => {
  signOut(auth)
  toastSuccessNotify("User is signed out");
}

// export const signUpWithGoogle = (navigate) => {
// const provider = new GoogleAuthProvider()
//   signInWithPopup(auth, provider).then((result) => {
//     console.log(result);
//     navigate("/")
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// }

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};
