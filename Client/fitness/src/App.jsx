import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2'; // Import Navbar2
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
import Exercise from './components/Exercise';
import CommunityPage from './components/CommunityPage';
import Profile from './components/Profile';
import Food from './components/Food';

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
            <Routes>
              {/* Routes that use Navbar2 */}
              <Route path="/homepage" element={<><Navbar2 /><Profile /></>} />
              <Route path="/nutrition" element={<><Navbar2 /><Food /></>} />
              <Route path="/exercise" element={<><Navbar2 /><Exercise /></>} />
              <Route path="/community" element={<><Navbar2 /><CommunityPage /></>} />

              {/* Routes that use the original Navbar */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar scrollTo={scrollToSection} />
                    <Hero />
                    <div ref={servicesRef}><Services /></div>
                    <div ref={plansRef}><Plans /></div>
                    <div ref={faqRef}><FAQ /></div>
                    <div ref={contactRef}><Banner /></div> ``
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
