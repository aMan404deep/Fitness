// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/Food.css';


// const Food = () => {
//     const [nutritionData, setNutritionData] = useState({
//         breakfast: '',
//         lunch: '',
//         dinner: '',
//         breakfast_recipe: '',
//         lunch_recipe: '',
//         dinner_recipe: '',
//         calories: '',
//         protein: '',
//         fat: '',
//         carbs: '',
//       }); // State to hold nutrition data
//       const [error, setError] = useState(''); // State to handle errors
//       const [loading, setLoading] = useState(true); // State to handle loading
    
//       useEffect(() => {
//         // Fetches nutrition data from the backend when the component mounts
//         const fetchNutritionData = async () => {
//           try {
//             const userId = localStorage.getItem('userId'); // Get the user ID from local storage
//             const response = await axios.get(`https://shred.onrender.com/api/users/${userId}/nutrition`);
//             console.log('Data received:', response.data); // Log the received data
//             setNutritionData(response.data); // Save the data in state
//             setLoading(false); // Set loading to false after data is fetched
//           } catch (err) {
//             console.error('Error fetching data:', err);
//             setError(err.response?.data?.error || 'Failed to fetch nutritional data');
//             setLoading(false); // Set loading to false even if there's an error
//           }
//         };
    
//         fetchNutritionData(); // Call the function to fetch data
//       }, []); // Empty dependency array means this runs once on mount
    
//       // Conditionally render different content based on the state
//       if (loading) {
//         return <div>Loading...</div>; // Show a loading state while data is being fetched
//       }
    
//       if (error) {
//         return <div>Error: {error}</div>; // Show error message if there's an error
//       }
    
//       console.log(nutritionData)
//   return (
//     <>
//         { !loading && 
//         <div className='food-container'>
//             <div className='food-main'>
//                 <div className='food-info'>
//                     <div className='brkfst-info'>
//                             <h4>Breakfast</h4>
//                             <p>{nutritionData[0].breakfast}</p>
//                             <p>{nutritionData[0].breakfast_recipe}</p>
//                     </div>
//                     <div className='lunch-info'>
//                             <h4>Lunch</h4>
//                             <p>{nutritionData[0].lunch}</p>
//                             <p>{nutritionData[0].lunch_recipe}</p>
//                     </div>
//                     <div className='dinner-info'>
//                             <h4>Dinner</h4>
//                             <p>{nutritionData[0].dinner}</p>
//                             <p>{nutritionData[0].dinner_recipe}</p>
//                     </div>
//                 </div>
//                 <div className='macros-info'>
//                     <div className='protien'>
//                         <h4>Protien</h4>
//                         <p>{nutritionData[0].protein}g</p>
//                     </div>
//                     <div className='calories'>
//                         <h4>Calories</h4>
//                         <p>{nutritionData[0].calories}kcal</p>
//                     </div>
//                     <div className='fat'>
//                         <h4>Fat</h4>
//                         <p>{nutritionData[0].fat}g</p>
//                     </div>
//                     <div className='carbs'>
//                         <h4>Carbs</h4>
//                         <p>{nutritionData[0].carbs}g</p>
//                     </div>
//                 </div>
//             </div>
//         </div>}
//     </>
//   )
// }

// export default Food
import React, { useState, useEffect } from 'react';
import '../styles/Food.css';

const Food = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Sample mock nutrition data for fallback
    const mockNutritionData = {
      breakfast: 'Greek Yogurt Parfait',
      lunch: 'Grilled Chicken Salad',
      dinner: 'Baked Salmon with Vegetables',
      breakfast_recipe: 'Mix Greek yogurt with honey, add granola and fresh berries on top.',
      lunch_recipe: 'Grill chicken breast, slice and add to mixed greens with cherry tomatoes, cucumber, and balsamic vinaigrette.',
      dinner_recipe: 'Season salmon fillet with herbs, bake. Serve with roasted broccoli and sweet potatoes.',
      calories: '2100',
      protein: '150',
      fat: '70',
      carbs: '180'
    };

    // Fetch nutrition data from API
    const fetchNutritionData = async () => {
      try {
        setLoading(true);
        
        // Check if we should use the API or mock data
        const useApi = true; // Set to false to use mock data
        
        if (useApi && userId) {
          const response = await fetch(`https://shred.onrender.com/api/users/${userId}/nutrition`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch nutrition data');
          }
          
          const data = await response.json();
          console.log('Data received:', data);
          
          // If data is returned as an array, use the first item
          if (Array.isArray(data) && data.length > 0) {
            setNutritionData(data[0]);
          } else {
            setNutritionData(data);
          }
        } else {
          // Use mock data
          console.log('Using mock nutrition data');
          setNutritionData(mockNutritionData);
        }
      } catch (err) {
        console.error('Error fetching nutrition data:', err);
        setError('Failed to fetch nutritional data. Using sample data instead.');
        // Fall back to mock data
        setNutritionData(mockNutritionData);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [userId]);

  const handleSectionClick = (section) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  // Show loading state
  if (loading) {
    return (
      <div className='food-container'>
        <div className='food-main'>
          <div className='food-loading'>
            <h2>ShredWithStyle</h2>
            <h3>Loading your nutrition plan...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='food-container'>
      <div className='food-main'>
        {/* Top Section - Meal Information */}
        <div className='food-top'>
          <div className='food-top-header'>
            <h2>ShredWithStyle</h2>
            <h1>Daily Meals</h1>
            <h4>#EatCleanShredLean</h4>
          </div>
          <div className='food-top-content'>
            {/* Breakfast Section */}
            <div
              className={`food-dropdown ${activeSection === 'breakfast' ? 'active' : ''}`}
              onClick={() => handleSectionClick('breakfast')}
            >
              <button className='food-dropdown-button'>
                Breakfast
              </button>
              {activeSection === 'breakfast' && (
                <div className='food-dropdown-content'>
                  <p className="recipe-name">{nutritionData?.breakfast || 'No breakfast data'}</p>
                  <p className="recipe-desc">{nutritionData?.breakfast_recipe || 'No recipe available'}</p>
                </div>
              )}
            </div>
            
            {/* Lunch Section */}
            <div
              className={`food-dropdown ${activeSection === 'lunch' ? 'active' : ''}`}
              onClick={() => handleSectionClick('lunch')}
            >
              <button className='food-dropdown-button'>
                Lunch
              </button>
              {activeSection === 'lunch' && (
                <div className='food-dropdown-content'>
                  <p className="recipe-name">{nutritionData?.lunch || 'No lunch data'}</p>
                  <p className="recipe-desc">{nutritionData?.lunch_recipe || 'No recipe available'}</p>
                </div>
              )}
            </div>
            
            {/* Dinner Section */}
            <div
              className={`food-dropdown ${activeSection === 'dinner' ? 'active' : ''}`}
              onClick={() => handleSectionClick('dinner')}
            >
              <button className='food-dropdown-button'>
                Dinner
              </button>
              {activeSection === 'dinner' && (
                <div className='food-dropdown-content'>
                  <p className="recipe-name">{nutritionData?.dinner || 'No dinner data'}</p>
                  <p className="recipe-desc">{nutritionData?.dinner_recipe || 'No recipe available'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Macros */}
        <div className='food-bottom'>
          <div className='food-bottom-header'>
            <h2>ShredYourGoals</h2>
            <h1>Daily Macros</h1>
            <h4>#NutritionForOptimalPerformance</h4>
          </div>
          <div className='food-bottom-content'>
            <div className="meal-details">
              <div className="meal-stats">
                <div className="stat-box">
                  <h3>{nutritionData?.calories || '0'}</h3>
                  <p>Calories</p>
                </div>
                <div className="stat-box">
                  <h3>{nutritionData?.protein || '0'}</h3>
                  <p>Protein (g)</p>
                </div>
                <div className="stat-box">
                  <h3>{nutritionData?.fat || '0'}</h3>
                  <p>Fat (g)</p>
                </div>
                <div className="stat-box">
                  <h3>{nutritionData?.carbs || '0'}</h3>
                  <p>Carbs (g)</p>
                </div>
              </div>
              
              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="action-container">
                <button className="shredBtn">Update Nutrition Plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
