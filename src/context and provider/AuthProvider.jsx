import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
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
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;