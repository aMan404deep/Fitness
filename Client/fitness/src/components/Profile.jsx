import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css'
import nutritionImg from '../assets/nutrition.png'
import exerciseImg from '../assets/exercise.png'
const Profile = () => {
    const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });  // Tracks cursor position
  const [cursorVisible, setCursorVisible] = useState(false);   // Controls cursor visibility
  const [hoveringNutrition, setHoveringNutrition] = useState(false);  // Tracks hover over nutrition section
  const [heightUnit, setHeightUnit] = useState('cm');
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
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setCursorVisible(true);  // Set cursor visible when mouse moves
};

// Set flag when mouse enters the nutrition section
const handleMouseEnterNutrition = () => {
    setHoveringNutrition(true);
};

// Remove flag when mouse leaves the nutrition section
const handleMouseLeaveNutrition = () => {
    setHoveringNutrition(false);
};

// Hide cursor when the mouse leaves the window
useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);  // Attach mouse move event

    document.addEventListener('mouseleave', () => setCursorVisible(false));  // Hide cursor on leave

    return () => {
        document.removeEventListener('mousemove', handleMouseMove);  // Cleanup event on component unmount
        document.removeEventListener('mouseleave', () => setCursorVisible(false));  // Cleanup leave event
    };
}, []);
  const handleNavigation = (path) => {
    navigate(path);
  };

  const calculateBMI = (weight, height) => {
    if (height > 0) {
      return (weight / (height * height)).toFixed(1);
    }
    return 'N/A';
  };
  const BMItoMeaning = (weight, height) => {
    if ((weight / (height * height)).toFixed(1) < 16) {
      return 'Severe Thinness' ;
    }else if((weight / (height * height)).toFixed(1) < 17) {
        return 'Moderate Thinness' ;
    }else if((weight / (height * height)).toFixed(1) < 18.5) {
        return 'Mild Thinness' ;
    }else if((weight / (height * height)).toFixed(1) < 25) {
        return 'Normal' ;
    }else if((weight / (height * height)).toFixed(1) < 30) {
        return 'Overweight' ;
    }else if((weight / (height * height)).toFixed(1) < 35) {
        return 'Obese Class I' ;
    }else if((weight / (height * height)).toFixed(1) < 40) {
        return 'Obese Class II' ;
    }else if((weight / (height * height)).toFixed(1) >= 40){
        return 'Obese Class III';
    }
    return 'N/A';
  };
  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainderInches = Math.round(inches % 12);
    return `${feet}ft ${remainderInches}in`;
  };
  return (
    <div className='profile-container'>
        <div
            className={`custom-cursor ${cursorVisible ? 'show-cursor' : ''} ${hoveringNutrition ? 'cursor-hover' : ''}`}
            style={{ top: `${cursorPos.y}px`, left: `${cursorPos.x}px` }}
        >
            {hoveringNutrition && "Click to Open"}
        </div>
        <div className='profile-main'>
            <div className='profile-detail-one details'>
                <div className='personal-details'>
                    <div className='personal-heading'>
                        <h1>Hey, {userInfo ? userInfo.name : 'Username'}</h1>
                    </div>
                    <div className='personal-content'>
                        {userInfo ? (
                            <>
                                <div className='email-gender'>
                                    <h4>Email: </h4>
                                    <p>{userInfo.email}</p>
                                </div>
                                <div className='email-gender'>
                                    <h4>Gender: </h4>
                                    <p>{userInfo.gender}</p>
                                </div>
                            </>
                            ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className='body-details'>
                    <div className='body-heading'>
                        <h1>Body Details</h1>
                    </div>
                    <div className='body-content'>
                        {userInfo ? (
                            <>
                                
                                <div className='email-gender'>
                                    <h4>Height: </h4>
                                    {/* <p>{userInfo.height} cm</p> */}
                                    {userInfo && (
                                        <div className='height-feet-cm'>
                                            <select
                                            value={heightUnit}
                                            onChange={(e) => setHeightUnit(e.target.value)}
                                            >
                                                <option value='cm'>cm</option>
                                                <option value='ftin'>ft/in</option>
                                            </select>
                                                <p>
                                                    {heightUnit === 'cm'
                                                    ? `${userInfo.height} cm`
                                                    : convertToFeetInches(userInfo.height)}
                                                </p>
                                        </div>
                                    )}
                                </div>
                                <div className='email-gender'>
                                    <h4>Weight: </h4>
                                    <p>{userInfo.weight} kg</p>
                                </div>
                                <div className='email-gender'>
                                    <h4>BMI: </h4>
                                    <p>{calculateBMI(userInfo.weight, userInfo.height / 100)} ( {BMItoMeaning(userInfo.weight, userInfo.height / 100)} )</p>
                                    
                                </div>
                                
                            </>
                            ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
             <div className='profile-detail-two details'>
                
                <div className='nutrition-details' 
                onMouseEnter={handleMouseEnterNutrition}
                onMouseLeave={handleMouseLeaveNutrition}>
                    <img src={nutritionImg} alt='nutrition' className='nutritionImg'/>
                    <div className='nutrition-design'
                    onClick={() => handleNavigation('/nutrition')}>
                    </div>
                    <div>
                        <h1>Nutrition</h1>
                    </div>
                    <div className='nutrition-content'>
                        <div className='email-gender'>
                            <h4>Protiens: </h4>
                            <p>? gm</p>
                        </div>
                        <div className='email-gender'>
                            <h4>Calories: </h4>
                            <p>? kcal</p>
                        </div>
                        <div className='email-gender'>
                            <h4>Carbs: </h4>
                            <p>? gm</p>
                        </div>
                        <div className='email-gender'>
                            <h4>Fats: </h4>
                            <p>? gm</p>
                        </div>
                        <p>And much more...</p>
                    </div>
                </div>
                <div className='exercise-details'
                onMouseEnter={handleMouseEnterNutrition}
                onMouseLeave={handleMouseLeaveNutrition}>
                    <img src={exerciseImg} alt='nutrition' className='exerciseImg'/>
                    <div className='exercise-design' onClick={() => handleNavigation('/exercise')}></div>
                    <div>
                        <h1>Exercise</h1>
                    </div>
                    <div className='exercise-content'>
                        <div className='email-gender ex'>
                            <h4>Exercise 1: </h4>
                            <p>? </p>
                        </div>
                        <div className='email-gender ex'>
                            <h4>Exercise 2: </h4>
                            <p>? </p>
                        </div>
                        <div className='email-gender ex'>
                            <h4>Exercise 3: </h4>
                            <p>? </p>
                        </div>
                        <div className='email-gender ex'>
                            <h4>Exercise 4: </h4>
                            <p>? </p>
                        </div>
                        <p>And much more...</p>
                    </div>
                </div>
            </div>
            <div className='profile-detail-three details'>
            <div className='community-details'
            // onMouseEnter={handleMouseEnterNutrition}
            // onMouseLeave={handleMouseLeaveNutrition} 
            onClick={() => handleNavigation('/community')}>
                    <div className='community-heading'>
                        <h1>Our Community Support</h1>
                    </div>
                </div>
                <div className='about-details' 
                // onMouseEnter={handleMouseEnterNutrition}
                // onMouseLeave={handleMouseLeaveNutrition} 
                >
                    <div className='about-heading'>
                        <h1>More About us</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile