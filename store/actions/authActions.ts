import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const authWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (e) {
    console.log(e);
  }
};

export const authWithFacebook = async () => {
  try {
    await signInWithRedirect(auth, facebookProvider);
  } catch (e) {
    console.log(e);
  }
};

//logout

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
};
