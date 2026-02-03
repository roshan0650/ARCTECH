import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div style={{ padding: '60px 0' }}>
            <div className="container">
                <h1 className="text-center" style={{ marginBottom: '40px' }}>Contact Us</h1>

                <div className="grid-cols-2" style={{ alignItems: 'start' }}>

                    <div className="card" style={{ padding: '40px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Get in Touch</h2>
                        <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>
                            Have questions or need assistance? Our support team is here to help you 24/7.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: '#e9ecef', padding: '10px', borderRadius: '50%' }}><Phone color="var(--primary-blue)" /></div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Phone</div>
                                    <div style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: '#e9ecef', padding: '10px', borderRadius: '50%' }}><Mail color="var(--primary-blue)" /></div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Email</div>
                                    <div style={{ color: 'var(--text-muted)' }}>support@demodonor.com</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: '#e9ecef', padding: '10px', borderRadius: '50%' }}><MapPin color="var(--primary-blue)" /></div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Headquarters</div>
                                    <div style={{ color: 'var(--text-muted)' }}>123 Health Avenue, Med City</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '40px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Send a Message</h2>
                        <form onSubmit={e => { e.preventDefault(); alert("Message Sent!"); }}>
                            <div className="input-group">
                                <label className="input-label">Your Name</label>
                                <input type="text" className="input-field" required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input type="email" className="input-field" required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Message</label>
                                <textarea className="input-field" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
