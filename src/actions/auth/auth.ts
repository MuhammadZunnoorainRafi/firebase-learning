import { auth } from '@/firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: name });
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const logout = () => {
  signOut(auth);
};

export const googleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};
