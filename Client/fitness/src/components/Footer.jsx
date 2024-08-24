import '../styles/Footer.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#about">About Us</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                    <a href="#faq">FAQ</a>
                </div>
                <div className="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <div className="footer-copy">
                    &copy; {new Date().getFullYear()} Shred. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
