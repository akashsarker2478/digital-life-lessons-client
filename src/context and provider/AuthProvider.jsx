import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //google sign in 
   const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
  //logout 
  const logOut = ()=>{
    return signOut(auth)
  }
  //create user 
   const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }
// login user
  const loginUser = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }

  //update user 
  const updateUser = (profile)=>{
    return updateProfile(auth.currentUser,profile)
      
  }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
    const authInfo = {
        user,
        setUser,
        loading,
        googleSignIn,
        logOut,
        createUser,
        loginUser,
        updateUser,

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;