import  { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styles/Loader.css';

const Loader = ({ onComplete }) => {
  const navigate = useNavigate();
  const loaderContainerRef = useRef(null);
  const loaderContentRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursors = document.querySelector('.custom-cursors');
      cursors.style.left = `${e.clientX}px`;
      cursors.style.top = `${e.clientY}px`;
      
      updateTextColors(e.clientX, e.clientY);
    };

    const updateTextColors = (x, y) => {
      const elements = document.querySelectorAll('.loader-content *');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(x - elementCenterX, 2) + Math.pow(y - elementCenterY, 2)
        );
        const radius = 60; 

        if (distance < radius) {
          element.classList.add('hovered');
        } else {
          element.classList.remove('hovered');
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleButtonClick = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
        navigate('/', { state: { fromLoader: true } });
      }
    });

    tl.to(loaderContentRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power3.inOut',
    })
    .to(loaderContainerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    }, "-=0.3");
  };

  return (
    <div className="loader-container" ref={loaderContainerRef}>
      <video className="background-video" autoPlay muted loop>
        <source src="/loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="loader-content" ref={loaderContentRef}>
        <h4>Shred.</h4>
        <h1 className="loader-heading">Your First Step Towards a Better You</h1>
        <button className="loader-button" onClick={handleButtonClick}>
          Get Started
        </button>
      </div>
      <div className="custom-cursors"></div>
    </div>
  );
};

export default Loader;
