import { auth } from '@/firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

export const googleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};
