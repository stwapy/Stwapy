// Firebase Client SDK Configuration for Stwapy Platform
// Stwapy Technologies Pvt LTD
// Connected to Firebase Project: stwapy (ID: 608344511538)

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBqtPul3xUe2m6umBsWuOjB_Lye8FPV8GU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "stwapy.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "stwapy",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "stwapy.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "608344511538",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:608344511538:web:7b4ff8ca09d0f8688f982b",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-R95NFC88DQ"
};

// Initialize Firebase singleton
let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;

if (typeof window !== 'undefined') {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
} else {
  // SSR fallback
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

export { app, auth, googleProvider };
export type { FirebaseUser };

/**
 * 1. Continue with Google Authentication
 */
export async function signInWithGoogle(): Promise<{ user: FirebaseUser; token: string }> {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  const result = await signInWithPopup(auth, googleProvider);
  const token = await result.user.getIdToken();
  return { user: result.user, token };
}

/**
 * 2. Sign In with Email & Password
 */
export async function signInWithEmail(email: string, pass: string): Promise<{ user: FirebaseUser; token: string }> {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
  const token = await result.user.getIdToken();
  return { user: result.user, token };
}

/**
 * 3. Create New Account with Email & Password
 */
export async function signUpWithEmail(email: string, pass: string, fullName: string): Promise<{ user: FirebaseUser; token: string }> {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (fullName && fullName.trim()) {
    await updateProfile(result.user, { displayName: fullName.trim() });
  }
  const token = await result.user.getIdToken();
  return { user: result.user, token };
}

/**
 * 4. Password Reset Email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  await sendPasswordResetEmail(auth, email.trim());
}

/**
 * 5. Sign Out
 */
export async function signOutFirebase(): Promise<void> {
  if (!auth) return;
  await firebaseSignOut(auth);
}

/**
 * 6. Auth State Observer
 */
export function onFirebaseAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}
