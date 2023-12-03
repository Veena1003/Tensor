import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthCOntext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    // Context Access [useAuth hook] :- Bring required
    // i) States for consuming values,
    // ii) Functions to Modify States in AuthContext
    const {
        user,
        setUser,
        auth,
        signInWithGoogle,
    } = useAuth(); // Use useAuth to access the AuthContext

    //States local to Component

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Check if the user is already authenticated
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithGoogle();
            navigate('/dashboard'); // Redirect on successful login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <button
            onClick={handleSignInWithGoogle} >
            Sign in with Google
        </button>
    );
};

export default SignIn;
