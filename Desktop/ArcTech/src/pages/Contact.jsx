import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'messages'), {
                ...formData,
                createdAt: serverTimestamp()
            });
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Error adding document: ", error);
            // Fallback for demo if firebase fails
            try {
                // Mock behavior
                const existing = JSON.parse(localStorage.getItem('mockMessages') || '[]');
                existing.unshift({ ...formData, id: Date.now(), createdAt: { toDate: () => new Date() } });
                localStorage.setItem('mockMessages', JSON.stringify(existing));
                setSubmitted(true);
            } catch (e) {
                alert("Failed to send message.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <section className="section">
                <div className="container">
                    <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1>Let's Talk.</h1>
                            <p style={{ fontSize: '1.25rem', marginBottom: '40px' }}>
                                Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <h4 style={{ marginBottom: '4px' }}>Email</h4>
                                    <a href="mailto:hello@arctech.com" style={{ color: 'var(--accent-blue)', fontSize: '18px' }}>hello@arctech.com</a>
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '4px' }}>Office</h4>
                                    <p>123 Innovation Dr, Tech City, TC 94000</p>
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '4px' }}>Social</h4>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <a href="#" className="btn-text">LinkedIn</a>
                                        <a href="#" className="btn-text">Twitter</a>
                                        <a href="#" className="btn-text">GitHub</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '32px' }}
                        >
                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <h3 style={{ color: 'var(--accent-blue)' }}>Thank You!</h3>
                                    <p>Your message has been sent successfully.</p>
                                    <button onClick={() => setSubmitted(false)} className="btn btn-text" style={{ marginTop: '20px' }}>Send another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid transparent', background: 'white', fontSize: '16px', outline: 'none' }}
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid transparent', background: 'white', fontSize: '16px', outline: 'none' }}
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Message</label>
                                        <textarea
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid transparent', background: 'white', fontSize: '16px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                                            placeholder="Tell us about your project..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                        style={{ width: '100%', padding: '16px', opacity: loading ? 0.7 : 1 }}
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
