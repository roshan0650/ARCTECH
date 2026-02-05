import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded credentials as requested
        if (username === 'admin' && password === '1234') {
            localStorage.setItem('adminLoggedIn', 'true');
            // Add a mock admin user to global auth if needed, or just redirect
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-secondary)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                <h1 className="text-center" style={{ marginBottom: '8px' }}>Admin Portal</h1>
                <p className="text-center" style={{ marginBottom: '32px', fontSize: '14px' }}>Restricted Access</p>

                {error && (
                    <div style={{
                        background: '#ffebeb',
                        color: '#d32f2f',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid var(--divider)',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid var(--divider)',
                                outline: 'none'
                            }}
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: '10px' }}
                    >
                        Login to Dashboard
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
