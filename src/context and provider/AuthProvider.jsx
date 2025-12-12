import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import axios from 'axios';



const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const axiosSecure = useAxiosSecure()

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

// useEffect(() => 
//   { const unsubscribe = onAuthStateChanged(auth,
//      (currentUser) => { 
//       setUser(currentUser);
//        setLoading(false); }); 
//        return () =>
//          { unsubscribe();

//         };
//        }, []);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      const email = currentUser.email;

      axiosSecure.get(`/users/status/${email}`)
        .then(res => {
          setIsPremium(res.data.isPremium);
          
          currentUser.dbId = res.data.dbId;
        })
        .catch(error => {
          console.error("Error syncing user status from DB:", error);
          setIsPremium(false);
        })
        .finally(() => {
          setLoading(false);
        });

    } else {
      setIsPremium(false);
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, [axiosSecure]);


    const authInfo = {
        user,
        setUser,
        loading,
        googleSignIn,
        logOut,
        createUser,
        loginUser,
        updateUser,
        isPremium,

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;