import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Import the CSS file
import centerimg from '../assets/DeWatermark.ai_1725102423887-removebg-preview.png';

function HomePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const calculateBMI = (weight, height) => {
    if (height > 0) {
      return (weight / (height * height)).toFixed(1);
    }
    return 'N/A';
  };

  return (
    <div className="container1">
      <div className="container">
        <div
          className="mergedRect"
          id="topleft"
          onClick={() => handleNavigation('/nutrition')}
        >
          <h2>Nutrition</h2>
        </div>
        <div className="rect" id="topright" onClick={() => handleNavigation('/community')}>
          <h2>Community</h2>
        </div>
        <div className="rect" id="middleleft">
          <h2>Personal <br/> Information</h2>
          <div className='inf'>
            {userInfo ? (
              <>
                <h4>Email: {userInfo.email}</h4>
                <h4>Gender: {userInfo.gender}</h4>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="largeSquare" id="centre">
          <img src={centerimg} alt="Center" className='centreimg' />
          <h2 className='hola'>Hello, {userInfo ? userInfo.name : 'Username'}</h2>
        </div>
        <div className="rect" id="middleright">
          <h2>Body <br/> Information</h2>
          <div className='inf'>
            {userInfo ? (
              <>
                <h4>Height: {userInfo.height} cm</h4>
                <h4>Weight: {userInfo.weight} kg</h4>
                <h4>BMI: {calculateBMI(userInfo.weight, userInfo.height / 100)}</h4> {/* height in meters */}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="rect" id="bottomleft">
          <h2>More about us</h2>
        </div>
        <div
          className="rect"
          id="bottomright"
          onClick={() => handleNavigation('/exercise')}
        >
          <h2>Exercises</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
