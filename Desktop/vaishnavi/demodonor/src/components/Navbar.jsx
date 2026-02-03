import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Droplet, User, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Find Blood', path: '/availability' },
        { name: 'Request Blood', path: '/request' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{
            backgroundColor: 'var(--surface-color)',
            height: 'var(--header-height)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--dark-blue)' }}>
                    <div style={{ backgroundColor: 'var(--primary-red)', padding: '6px', borderRadius: '50%', color: 'white' }}>
                        <Droplet size={24} fill="currentColor" />
                    </div>
                    <span>DEMO<span style={{ color: 'var(--primary-red)' }}>DONOR</span></span>
                </Link>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            style={{
                                color: isActive(link.path) ? 'var(--primary-red)' : 'var(--text-main)',
                                fontWeight: isActive(link.path) ? '600' : '400',
                                transition: 'color 0.2s',
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Link to="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                <User size={18} /> Dashboard
                            </Link>
                            <button onClick={handleLogout} className="btn" style={{ color: 'var(--text-muted)' }}>
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: 'none' }}>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Simplified for demo) */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--header-height)',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '20px',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    {navLinks.map(link => (
                        <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} style={{ fontSize: '1.1rem' }}>
                            {link.name}
                        </Link>
                    ))}
                    <hr />
                    {currentUser ? (
                        <button onClick={() => { handleLogout(); setIsOpen(false); }} style={{ textAlign: 'left' }}>Logout</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
