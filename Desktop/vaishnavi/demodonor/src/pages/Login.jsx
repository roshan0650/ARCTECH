import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { User, Lock, ArrowRight, Shield } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('donor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLogin } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(email, password)) {
            navigate('/dashboard');
        }
    };

    const handleGoogleLogin = async () => {
        if (await googleLogin()) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '80vh', backgroundColor: '#f0f2f5' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <div className="text-center" style={{ marginBottom: '30px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Please login to your account</p>
                </div>

                {/* Role Toggle */}
                <div style={{ display: 'flex', background: '#e9ecef', borderRadius: '8px', padding: '4px', marginBottom: '30px' }}>
                    <button
                        type="button"
                        onClick={() => setRole('donor')}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '6px',
                            background: role === 'donor' ? 'white' : 'transparent',
                            fontWeight: role === 'donor' ? '600' : '400',
                            boxShadow: role === 'donor' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Donor
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('admin')}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '6px',
                            background: role === 'admin' ? 'white' : 'transparent',
                            fontWeight: role === 'admin' ? '600' : '400',
                            boxShadow: role === 'admin' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Ex. john@example.com"
                                style={{ paddingLeft: '40px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                style={{ paddingLeft: '40px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                        Login <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #e9ecef' }} />
                    <span style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        padding: '0 10px',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        OR
                    </span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'center', borderColor: '#dadce0', color: '#3c4043' }}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                    Sign in with Google
                </button>

                <div className="text-center" style={{ marginTop: '20px', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Register Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
