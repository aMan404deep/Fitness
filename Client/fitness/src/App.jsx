import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { useState, useEffect, useRef } from 'react';
import Plans from './components/Plans';
import FAQ from './components/FAQ';
import Banner from './components/Banner';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';
import Services from './components/Services';
import Register from './components/Register';
import Login from './components/Login';
import Loader from './components/Loader';
import FitnessForm from './components/FitnessForm';

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isLoading, setIsLoading] = useState(true);

  const servicesRef = useRef(null);
  const plansRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    switch (section) {
      case 'services':
        servicesRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'plans':
        plansRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'faq':
        faqRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLoaderComplete = () => {
    const loaderElement = document.querySelector('.loader-container');
    loaderElement.classList.add('hidden');
    setTimeout(() => setIsLoading(false), 1000); 
  };

  return (
    <Router>
      <div className="app-container">
        {isLoading ? (
          <Loader onComplete={handleLoaderComplete} />
        ) : (
          <>
            <Navbar scrollTo={scrollToSection} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <div ref={servicesRef}><Services /></div>
                    <div ref={plansRef}><Plans /></div>
                    <div ref={faqRef}><FAQ /></div>
                    <div ref={contactRef}><Banner /></div>
                    <Footer />
                  </>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/form" element={<FitnessForm />} />
            </Routes>
            <div
              className="custom-cursor"
              style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
              }}
            ></div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
