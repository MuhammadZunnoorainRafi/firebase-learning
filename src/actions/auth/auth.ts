import { auth, db } from '@/firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: name });
    }

    const docRef = doc(db, 'users', res.user.uid);
    await setDoc(docRef, { name, email, timestamp: serverTimestamp() });
    return { success: true };
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'Internal Server Error' };
    }
  }
};

export const logout = () => {
  return signOut(auth);
};

export const googleSignIn = async () => {
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);
  if (user) {
    const docRef = doc(db, 'users', user.uid);
    const userInDb = await getDoc(docRef);
    if (!userInDb.exists()) {
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
      });
    }
  }
};
