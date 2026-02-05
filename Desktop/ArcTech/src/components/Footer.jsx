import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <h4>ARC TECH</h4>
                        <p style={{ fontSize: '12px', lineHeight: '1.6' }}>
                            Innovating for the future. Building digital experiences that matter.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/history">History</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li><Link to="/services">Web Development</Link></li>
                            <li><Link to="/services">App Development</Link></li>
                            <li><Link to="/services">UI/UX Design</Link></li>
                            <li><Link to="/services">Cloud Solutions</Link></li>
                            <li><Link to="/admin">Admin Portal</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="#">LinkedIn</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ARC TECH. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
