import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const { loginWithGoogle, loginWithDemo, loginWithEmail, registerWithEmail } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Email Auth State
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            setError('');
            setLoading(true);
            if (isRegistering) {
                await registerWithEmail(email, password);
            } else {
                await loginWithEmail(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use.');
            } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Authentication failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/configuration-not-found' || err.code === 'auth/invalid-api-key') {
                setError('Firebase configuration missing. Please use Demo Login below.');
            } else {
                setError('Failed to sign in. Try Demo Login if keys are missing.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        try {
            setLoading(true);
            await loginWithDemo();
            navigate('/dashboard');
        } catch (err) {
            setError('Demo login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
            <div className="container" style={{ width: '100%', maxWidth: '420px' }}>
                <motion.div
                    style={{
                        background: 'white',
                        padding: '40px',
                        borderRadius: '24px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 style={{ marginBottom: '8px', fontSize: '2rem', textAlign: 'center' }}>
                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p style={{ marginBottom: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        {isRegistering ? 'Join ARC TECH today.' : 'Enter your details to sign in.'}
                    </p>

                    {error && (
                        <div style={{
                            background: '#FEE2E2',
                            color: '#DC2626',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Email Form */}
                    <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--divider)',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    background: 'var(--bg-secondary)'
                                }}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--divider)',
                                    fontSize: '16px',
                                    outline: 'none',
                                    background: 'var(--bg-secondary)'
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '8px' }}
                        >
                            {loading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Sign In')}
                        </button>
                    </form>

                    <div style={{ position: 'relative', margin: '24px 0', textAlign: 'center' }}>
                        <span style={{ background: 'white', padding: '0 10px', color: 'var(--text-secondary)', fontSize: '13px', position: 'relative', zIndex: 1 }}>OR</span>
                        <div style={{ borderBottom: '1px solid var(--divider)', position: 'absolute', top: '50%', width: '100%', left: 0 }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="btn"
                            style={{
                                background: 'white',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--divider)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '12px'
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>


                    </div>

                    <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {isRegistering ? "Already have an account? " : "Don't have an account? "}
                        <button
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                            }}
                            style={{
                                color: 'var(--accent-blue)',
                                fontWeight: '600',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                        >
                            {isRegistering ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
