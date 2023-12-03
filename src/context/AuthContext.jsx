import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import {
    onAuthStateChanged,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';

// Initialize Firebase (import firebaseConfig from a single source)
const firebaseConfig = {
    apiKey: "AIzaSyAS69lrRzb8p2oBtBX8i3Lc25Td_Ks70H0",
    authDomain: "tensorgo-92cd3.firebaseapp.com",
    projectId: "tensorgo-92cd3",
    storageBucket: "tensorgo-92cd3.appspot.com",
    messagingSenderId: "854624673065",
    appId: "1:854624673065:web:4b1fc99d45eb9b1b98ab38",
    measurementId: "G-10C589363L"
};


const app = initializeApp(firebaseConfig);

// Create an AuthContext
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const db = getFirestore(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    // Sign out
    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert('Sign Out Failed' + error.message);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await setDoc(doc(db, 'users', user.email), {
                requests: [],
            });
        } catch (error) {
            alert('Google Sign-In Failed' + error.message);
        }
    };

    const value = {
        auth,
        user,
        db,
        signInWithGoogle,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
