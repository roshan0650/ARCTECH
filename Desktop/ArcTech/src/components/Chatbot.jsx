import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { findAnswer } from '../data/chatbotData';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm the ArcTech AI. How can I assist you with your project today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate network delay for realism
        setTimeout(() => {
            const answer = findAnswer(userMessage.text);
            const botMessage = { id: Date.now() + 1, text: answer, isBot: true };
            setMessages(prev => [...prev, botMessage]);
        }, 600);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                className="chatbot-toggle"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--primary-gradient)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '30px',
                            width: '350px',
                            height: '500px',
                            background: 'rgba(20, 20, 30, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            zIndex: 1000
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '20px',
                            background: 'var(--primary-gradient)',
                            color: 'white',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{ width: 10, height: 10, background: '#4ade80', borderRadius: '50%' }}></div>
                            ArcTech Assistant
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            padding: '20px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                        maxWidth: '80%',
                                        padding: '12px 16px',
                                        borderRadius: '16px',
                                        background: msg.isBot ? 'rgba(255,255,255,0.1)' : 'var(--primary-color)',
                                        color: msg.isBot ? 'var(--text-primary)' : 'white',
                                        borderBottomLeftRadius: msg.isBot ? '4px' : '16px',
                                        borderBottomRightRadius: msg.isBot ? '16px' : '4px',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} style={{
                            padding: '20px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    padding: '10px 12px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: 'var(--primary-color)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0 12px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
