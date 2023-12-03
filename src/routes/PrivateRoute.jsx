import { React, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthCOntext';

function PrivateRoute({ children }) {
    // Check Verification Email needs
    // 1) Introduction of auth, emailVerified, checkVerificationEmail
    // 2) Checking of checkVerificationEmail
    // 3) Triggering of checkVerificationEmail with useEffect()

    // Context Access [useAuth hook] :- Bring required
    // i) States for consuming values,
    // i) Functions to Modify States in AuthContext

    // 1) Introduction of auth, emailVerified, checkVerificationEmail
    const { user, auth } = useAuth();

    // 3) Triggering of checkVerificationEmail with useEffect()

    if (!user) {
        return <Navigate to='/' replace />;
    }
    return <>{children}</>;

}

export default PrivateRoute;
