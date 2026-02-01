import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If demo user, use local storage
        if (currentUser?.email === 'demo@arctech.com') {
            const mockMsgs = JSON.parse(localStorage.getItem('mockMessages') || '[]');
            setMessages(mockMsgs);
            setLoading(false);
            return;
        }

        try {
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const msgs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgs);
                setLoading(false);
            }, (err) => {
                console.error("Firestore error:", err);
                // Fallback to local storage if real firebase connection fails
                const mockMsgs = JSON.parse(localStorage.getItem('mockMessages') || '[]');
                setMessages(mockMsgs);
                setError("Viewing in Demo Mode (Firebase connection failed).");
                setLoading(false);
            });

            return unsubscribe;
        } catch (err) {
            const mockMsgs = JSON.parse(localStorage.getItem('mockMessages') || '[]');
            setMessages(mockMsgs);
            setLoading(false);
        }
    }, [currentUser]);

    return (
        <div className="dashboard-page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back, {currentUser?.displayName || currentUser?.email}</p>
                    </div>
                    <button onClick={logout} className="btn btn-secondary">Sign Out</button>
                </div>

                {error && <div style={{ background: '#e3f2fd', color: '#0d47a1', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                    <strong>Info:</strong> {error}
                </div>}

                <h2>Recent Messages</h2>

                {loading ? (
                    <p>Loading messages...</p>
                ) : messages.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No messages found.</p>
                ) : (
                    <div className="grid gap-4">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--bg-secondary)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ margin: 0 }}>{msg.name}</h4>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                        {/* Handle both Firestore Timestamp and mock Date objects/strings */}
                                        {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '14px', color: 'var(--accent-blue)', marginBottom: '12px' }}>{msg.email}</div>
                                <p style={{ margin: 0, fontSize: '15px' }}>{msg.message}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
