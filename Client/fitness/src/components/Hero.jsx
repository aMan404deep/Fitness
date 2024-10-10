import '../styles/Hero.css';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const h2Ref = useRef(null);
  const h1Ref = useRef(null);
  const h4Ref = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate(); 

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(h2Ref.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    tl.from(h1Ref.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, '-=0.8');

    tl.from(h4Ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, '-=0.6');

    tl.from(inputRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }, '-=0.4');

    tl.from(buttonRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }, '-=0.4');

    tl.to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    }, '-=0.4');
  }, []);

  const handleStartShredding = () => {
    navigate('/register'); 
  };

  return (
    <div className='hero-container'>
      <div className='hero-main'>
        <div className='hero-content'>
          <h2 ref={h2Ref}>ShredWithStyle</h2>
          <h1 ref={h1Ref}>UnleashYour<br />FitnessPotential</h1>
          <h4 ref={h4Ref}>#JourneyTowardsAHealthierYou</h4>
          <div className='hero-input'>
            <input ref={inputRef} type='text' placeholder='ShredYourGoals' />
            <button ref={buttonRef} className='actionBtn' onClick={handleStartShredding}>StartShredding</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
