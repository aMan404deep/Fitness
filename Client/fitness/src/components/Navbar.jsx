import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css';
import '../styles/Navbar.css';

const Navbar = ({ scrollTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const h1Ref = useRef(null);
  const navItemsRef = useRef([]);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(buttonRef.current, { opacity: 1, scale: 1 });

    tl.from(h1Ref.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    tl.from(
      navItemsRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out",
      },
      "-=0.8"
    );

    tl.from(
      buttonRef.current,
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to(".collapsible-menu", { height: "500px", duration: 0.5 });
    } else {
      gsap.to(".collapsible-menu", { height: "0", duration: 0.5 });
    }
  };

  const scrollToHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="nav-container">
      <div className="nav-main">
        <h1 ref={h1Ref} onClick={scrollToHome}>
          Shred.
        </h1>
        <div className="nav-content">
          <h4
            ref={(el) => (navItemsRef.current[0] = el)}
            onClick={() => scrollTo("services")}
          >
            Services
          </h4>
          <h4
            ref={(el) => (navItemsRef.current[1] = el)}
            onClick={() => scrollTo("plans")}
          >
            Plans
          </h4>
          <h4
            ref={(el) => (navItemsRef.current[2] = el)}
            onClick={() => scrollTo("contact")}
          >
            Contact
          </h4>
          <button
            ref={buttonRef}
            onClick={() => scrollTo("faq")}
          >
            FAQ
          </button>
        </div>
        {!isOpen && (
          <i className="ri-menu-4-line" onClick={toggleMenu}></i>
        )}
        {isOpen && (
          <i className="ri-close-line" onClick={toggleMenu}></i>
        )}
      </div>
      <div className="collapsible-menu">
        <div className="menu-content">
          <h4 onClick={() => scrollTo("services")}>Services</h4>
          <h4 onClick={() => scrollTo("plans")}>Plans</h4>
          <h4 onClick={() => scrollTo("contact")}>Contact</h4>
          <button onClick={() => scrollTo("faq")}>FAQ</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
