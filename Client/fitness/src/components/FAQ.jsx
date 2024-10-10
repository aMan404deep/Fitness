import { useState, useEffect,useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const headingRef = useRef(null);


    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const faqItems = document.querySelectorAll('.faq-item');
        const heading = gsap.utils.toArray('.faq-heading');
        gsap.fromTo(heading,
            { opacity: 0},
            {
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              stagger: 0.3,
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                markers: false,
              },
            }
          );

          
        faqItems.forEach((item, index) => {
            if (index === activeIndex) {
                gsap.to(item.querySelector('.faq-answer'), {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power1.out',
                });
                gsap.to(item, {
                    scale: 1.05,
                    boxShadow: '4px 4px 35px #222222',
                    duration: 0.3,
                    ease: 'power1.out',
                });
            } else {
                gsap.to(item.querySelector('.faq-answer'), {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power1.in',
                });
                gsap.to(item, {
                    scale: 1,
                    boxShadow: '4px 4px 25px #111111',
                    duration: 0.3,
                    ease: 'power1.in',
                });
            }
        });
    }, [activeIndex]);

    const faqs = [
        {
            question: "What is Shred?",
            answer: "Shred is a fitness program generator that creates personalized plans based on your input and exercise data."
        },
        {
            question: "How do I start with the Free Plan?",
            answer: "Simply sign up and you'll have access to basic workouts, limited access, and community support at no cost."
        },
        {
            question: "Can I switch plans later?",
            answer: "Yes, you can upgrade or downgrade your plan anytime from your account settings."
        },
        {
            question: "What are the benefits of the Premium Plan?",
            answer: "The Premium Plan offers all workouts, custom plans, and access to ShredSport for a comprehensive fitness experience."
        }
    ];

    return (
        <div className='faq-container'  id="faq-section">
            <h1 className='faq-heading' ref={headingRef}>Frequently Asked Questions</h1>
            <div className='faqs'>
                <div className='faq-wrap'>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <h4 className='faq-question'>{faq.question}</h4>
                            <div className='faq-answer'>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
