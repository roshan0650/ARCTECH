import { createContext, useContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
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

    // Sign in with Email
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Register with Email
    const registerWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
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

        // Register Demo User to Admin DB if not there
        const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
        if (!adminUsers.find(u => u.id === mockUser.uid)) {
            const newUserEntry = {
                id: mockUser.uid,
                name: mockUser.displayName,
                email: mockUser.email,
                role: 'Member',
                status: 'Active',
                joinedAt: new Date().toISOString()
            };
            localStorage.setItem('adminUsers', JSON.stringify([...adminUsers, newUserEntry]));
        }

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

            // NOTE: Auto-register user to Admin Dashboard mock DB for demo purposes
            if (user) {
                const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
                const exists = adminUsers.find(u => u.email === user.email);
                if (!exists) {
                    const newUserEntry = {
                        id: user.uid,
                        name: user.displayName || 'Google User',
                        email: user.email,
                        role: 'Member',
                        status: 'Active',
                        joinedAt: new Date().toISOString()
                    };
                    localStorage.setItem('adminUsers', JSON.stringify([...adminUsers, newUserEntry]));
                }
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginWithDemo,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
