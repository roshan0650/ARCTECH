import { createContext, useContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign in with Google (Real)
    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Sign in with Demo (Mock)
    const loginWithDemo = () => {
        const mockUser = {
            uid: 'demo-user-123',
            displayName: 'Demo User',
            email: 'demo@arctech.com',
            photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
        };
        localStorage.setItem('demoUser', JSON.stringify(mockUser));
        setCurrentUser(mockUser);
        return Promise.resolve(mockUser);
    };

    // Sign out
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            // Ignore real mock errors
        }
        localStorage.removeItem('demoUser');
        setCurrentUser(null);
    };

    useEffect(() => {
        // Check for demo user first
        const demoUser = localStorage.getItem('demoUser');
        if (demoUser) {
            setCurrentUser(JSON.parse(demoUser));
            setLoading(false);
            return;
        }

        // Check for real firebase user
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        loginWithDemo,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
