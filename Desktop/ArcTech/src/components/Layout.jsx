import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import { useEffect } from 'react';

const Layout = ({ children }) => {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="app-layout">
            <Navbar />
            <main style={{ minHeight: '100vh', paddingTop: '60px' }}>
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default Layout;
