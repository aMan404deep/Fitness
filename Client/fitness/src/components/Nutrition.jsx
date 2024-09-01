import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Nutrition.css';

const Nutrition = () => {
  const [nutritionData, setNutritionData] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    breakfast_recipe: '',
    lunch_recipe: '',
    dinner_recipe: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
  }); // State to hold nutrition data
  const [error, setError] = useState(''); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetches nutrition data from the backend when the component mounts
    const fetchNutritionData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get the user ID from local storage
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/nutrition`);
        console.log('Data received:', response.data); // Log the received data
        setNutritionData(response.data); // Save the data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.error || 'Failed to fetch nutritional data');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchNutritionData(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once on mount

  // Conditionally render different content based on the state
  if (loading) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an error
  }

  console.log(nutritionData)
  // Render the nutrition data once it's available in the state
  return (
    <>
    { !loading && 
      <div className='nutrition-container'>
      <div className='nutrition-info'>
        <h1>Nutrition Information</h1>
        <div className='nutrition-grid'>
          <div className='nutrition-card'>
            <h2>Breakfast</h2>
            <p>{nutritionData[0].breakfast}</p>
          </div>
          <div className='nutrition-card'>
            <h2>Lunch</h2>
            <p>{nutritionData[0].lunch}</p>
          </div>
          <div className='nutrition-card'>
            <h2>Dinner</h2>
            <p>{nutritionData[0].dinner}</p>
          </div>
        </div>
      </div>

      <div className='meals-section'>
        <h1>Meals</h1>
        <div className='meals-grid'>
          <div className='meal-card'>
            <h2>Breakfast Recipe</h2>
            <p>{nutritionData[0].breakfast_recipe}</p>
          </div>
          <div className='meal-card'>
            <h2>Lunch Recipe</h2>
            <p>{nutritionData[0].lunch_recipe}</p>
          </div>
          <div className='meal-card'>
            <h2>Dinner Recipe</h2>
            <p>{nutritionData[0].dinner_recipe}</p>
          </div>
        </div>
      </div>

      <div className='recipes-section'>
        <h1>Nutritional Values</h1>
        <div className='recipes-grid'>
          <div className='recipe-card'>
            <h2>Calories</h2>
            <p>{nutritionData[0].calories} kcal</p>
          </div>
          <div className='recipe-card'>
            <h2>Protein</h2>
            <p>{nutritionData[0].protein}g</p>
          </div>
          <div className='recipe-card'>
            <h2>Fat</h2>
            <p>{nutritionData[0].fat}g</p>
          </div>
          <div className='recipe-card'>
            <h2>Carbs</h2>
            <p>{nutritionData[0].carbs}g</p>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Nutrition;
