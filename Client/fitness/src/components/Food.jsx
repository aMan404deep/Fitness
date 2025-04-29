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
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);
  
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    // Fetch user's recipes
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/recipes`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.slice(0, 9)); // Limit to a maximum of 9 recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    // Fetch meal plan ID and details
    const fetchMealPlanId = async () => {
      try {
        const response = await fetch(`/api/meal-plans`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send the userId in the request body
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch meal plans');
        }
    
        const mealPlan = await response.json();
        console.log('Meal Plan Response:', mealPlan); // Log the full response
    
        // Check if the returned meal plan belongs to the current user
        if (mealPlan.user === userId) {
          return mealPlan._id; // Return the mealPlanId directly
        } else {
          console.error('The meal plan does not belong to the current user.');
          return null;
        }
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        return null; // Return null in case of an error
      }
    };
    
    // Fetch the meal plan details using the meal plan ID
    const fetchMealPlan = async (mealPlanId) => {
      try {
        const response = await fetch(`/api/meal-plans/${mealPlanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal plan');
        }
        const data = await response.json();
        setMealPlan({
          totalCalories: data.totalCalories,
          totalMeals: data.totalMeals,
          mealsPerDay: data.mealsPerDay,
          durationDays: data.durationDays,
          recipes: data.recipes.map(recipe => ({
            name: recipe.name,
            description: recipe.description,
            calories: recipe.calories
          }))
        });
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };

    // Sequence: Fetch recipes first, then fetch meal plan
    fetchRecipes(); // Fetch the recipes using userId
    fetchMealPlanId().then(mealPlanId => {
      if (mealPlanId) {
        fetchMealPlan(mealPlanId); // Fetch the meal plan details using the retrieved mealPlanId
      }
    });
  }, [userId]);

  const handleClick = (recipeId) => {
    setActiveRecipe((prev) => (prev === recipeId ? null : recipeId));
  };

  return (
    <div className='food-container'>
      <div className='food-main'>
        <div className='food-top'>
          <div className='food-top-header'>
            <h2>ShredWithStyle</h2>
            <h1>Recipes</h1>
            <h4>#EatCleanShredLean</h4>
          </div>
          <div className='food-top-content'>
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className={`food-dropdown ${activeRecipe === recipe._id ? 'active' : ''}`}
                onClick={() => handleClick(recipe._id)}
              >
                <button className='food-dropdown-button'>
                  {recipe.name}
                </button>
                {activeRecipe === recipe._id && (
                  <div className='food-dropdown-content'>
                    <p className="recipe-name">{recipe.name}</p>
                    <p className="recipe-desc">{recipe.description}</p>
                    <p className="recipe-calories">{recipe.calories} calories</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='food-bottom'>
          <div className='food-bottom-header'>
            <h2>ShredYourGoals</h2>
            <h1>Meal Plan</h1>
            <h4>#NutritionForOptimalPerformance</h4>
          </div>
          <div className='food-bottom-content'>
            {mealPlan ? (
              <div className="meal-details">
                <div className="meal-stats">
                  <div className="stat-box">
                    <h3>{mealPlan.totalCalories}</h3>
                    <p>Calories</p>
                  </div>
                  <div className="stat-box">
                    <h3>{mealPlan.totalMeals}</h3>
                    <p>Total Meals</p>
                  </div>
                  <div className="stat-box">
                    <h3>{mealPlan.mealsPerDay}</h3>
                    <p>Per Day</p>
                  </div>
                  <div className="stat-box">
                    <h3>{mealPlan.durationDays}</h3>
                    <p>Days</p>
                  </div>
                </div>
                {mealPlan.recipes.length > 0 && (
                  <div className='recipes-table-container'>
                    <table className='recipes-table'>
                      <thead>
                        <tr>
                          <th>Recipe</th>
                          <th>Description</th>
                          <th>Calories</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mealPlan.recipes.map((recipe, index) => (
                          <tr key={index}>
                            <td>{recipe.name}</td>
                            <td>{recipe.description}</td>
                            <td>{recipe.calories}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-plan">
                <h3>No meal plan found.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
