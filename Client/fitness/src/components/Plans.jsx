import { useEffect, useRef } from 'react';
import '../styles/Plans.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Plans = () => {
  const plansRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const plans = gsap.utils.toArray('.plan');
    const heading  = gsap.utils.toArray('.heading');
    gsap.fromTo(heading,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%', // Adjust this value to trigger the animation earlier or later
            toggleActions: 'play none none reverse', // Play forward on enter, reverse on leave
            markers: false, // Set to true if you want to see the trigger points during development
          },
        }
      );
    gsap.fromTo(plans,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: plansRef.current,
          start: 'top 80%', // Adjust this value to trigger the animation earlier or later
          toggleActions: 'play none none reverse', // Play forward on enter, reverse on leave
          markers: false, // Set to true if you want to see the trigger points during development
        },
      }
    );
  }, []);

  return (
    <div className='plans-container' ref={plansRef} id="plans-section">
      <h1 className='heading' ref={headingRef} >Choose Plan that Suits You Best</h1>
      <div className='plans-main'>
        <div className='plan free'>
          <div className='plan-content'>
            <h4>FREE</h4>
            <h1 className="price">₹0/month</h1>
            <div className='plan-gain'>
              <p>Basic Workouts</p>
              <p>Limited Access</p>
              <p>Community Support</p>
            </div>
            <button>Get Started</button>
          </div>
        </div>
        <div className='plan pro procontent'>
          <div className='plan-content'>
            <h4>Pro</h4>
            <h1 className="price">₹199/month</h1>
            <div className='plan-gain'>
              <p>All Workouts</p>
              <p>Custom Plans</p>
              <p>Priority Support</p>
            </div>
            <button className='probutton'>Get Started</button>
          </div>
        </div>
        <div className='plan premium'>
          <div className='plan-content'>
            <h4>Premium</h4>
            <h1 className="price">₹299/month</h1>
            <div className='plan-gain'>
              <p>All Workouts</p>
              <p>Custom Plans</p>
              <p>Access to ShredSport</p>
            </div>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;
