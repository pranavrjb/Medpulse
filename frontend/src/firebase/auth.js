// import {
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     signInWithEmailAndPassword,
//     signInWithPopup, // Add this import for Google sign-in
//     signOut
// } from 'firebase/auth';
// import { auth } from './firebase'; // Ensure 'auth' is correctly exported from your firebase config

// // Register a new user with email and password
// export const doCreateUserWithEmailAndPassword = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
// };

// // Sign in existing user with email and password
// export const doSignInWithEmailAndPassword = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// };

// // Google sign-in
// export const doSignInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider); // Ensure 'signInWithPopup' is used
//     return result;
// };

// // Sign out the user
// export const doSignOut = async () => {
//     return signOut(auth);
// };

// // Optional: Other Firebase Auth methods (Password reset, update, etc.)
// // export const doPasswordReset = (email) => {
// //     return sendPasswordResetEmail(auth, email);
// // };

// // export const doPasswordUpdate = (password) =>{
// //     return updatePassword(auth.currentUser, password);
// // };

// // export const doSendEmailVerification = () =>{
// //     return sendEmailVerification(auth.currentUser);
// //     url:`${window.location.origin}/home`
// // }
