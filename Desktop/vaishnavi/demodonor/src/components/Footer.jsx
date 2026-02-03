import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#1d3557', color: 'white', paddingTop: '60px', paddingBottom: '20px', marginTop: '60px' }}>
            <div className="container">
                <div className="grid-cols-3" style={{ gap: '40px', marginBottom: '40px' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            DEMODONOR
                        </h3>
                        <p style={{ color: '#a8dadc', marginBottom: '20px', lineHeight: '1.6' }}>
                            Connecting donors with those in need. Simple, secure, and life-saving.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Facebook size={20} color="#a8dadc" />
                            <Twitter size={20} color="#a8dadc" />
                            <Instagram size={20} color="#a8dadc" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '20px' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link to="/about" style={{ color: '#f1faee' }}>About Us</Link></li>
                            <li><Link to="/availability" style={{ color: '#f1faee' }}>Find Blood</Link></li>
                            <li><Link to="/register" style={{ color: '#f1faee' }}>Register as Donor</Link></li>
                            <li><Link to="/contact" style={{ color: '#f1faee' }}>Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '20px' }}>Contact Us</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#f1faee' }}>
                                <Phone size={18} /> +1 (555) 123-4567
                            </li>
                            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#f1faee' }}>
                                <Mail size={18} /> support@demodonor.com
                            </li>
                            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#f1faee' }}>
                                <MapPin size={18} /> 123 Health Ave, Med City
                            </li>
                        </ul>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid #457b9d', paddingTop: '20px', textAlign: 'center', color: '#a8dadc', fontSize: '0.9rem' }}>
                    <p>© 2024 DEMODONOR. All rights reserved. Made with <Heart size={14} fill="#e63946" color="#e63946" style={{ margin: '0 4px', verticalAlign: 'middle' }} /> for Internship Project.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
