import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const { loginWithGoogle, loginWithDemo } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="login-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container">
                <motion.div
                    style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1 style={{ marginBottom: '24px' }}>Sign In</h1>
                    <p style={{ marginBottom: '40px' }}>Access the ARC TECH dashboard.</p>

                    {error && <div style={{ background: '#ffebeb', color: '#ff3b30', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' }}>{error}</div>}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="btn"
                            style={{
                                background: 'white',
                                color: 'black',
                                border: '1px solid var(--divider)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '16px'
                            }}
                        >
                            {/* Google Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </button>

                        <div style={{ position: 'relative', margin: '8px 0' }}>
                            <div style={{ borderBottom: '1px solid var(--divider)', position: 'absolute', top: '50%', width: '100%' }}></div>
                            <span style={{ position: 'relative', background: 'white', padding: '0 10px', color: 'var(--text-secondary)', fontSize: '12px' }}>OR</span>
                        </div>

                        <button
                            onClick={handleDemoLogin}
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            Demo Login (No Config Required)
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
