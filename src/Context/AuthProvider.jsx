import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from './AuthContext';



const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)


    const googleAccess = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const forgotPassword = (email) => {
        setLoader(true)
        return sendPasswordResetEmail(auth, email)
    }
    const setProfileData = (name, photo) => {
        setLoader(true)

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
            .then(() => {
                setUser({
                    ...auth.currentUser,
                    displayName: name,
                    photoURL: photo,
                })
            })
            .finally(() => {
                setLoader(false)
            })
    }

    const signOutUser = () => {
        setLoader(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loader,
        setLoader,
        createUser,
        signIn,
        forgotPassword,
        setProfileData,
        signOutUser,
        googleAccess,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
