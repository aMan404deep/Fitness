import React, { useState, useEffect } from 'react';
import '../styles/Exercise.css';

const Exercise = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState(null);

  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    // Fetch user's exercises
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/exercises`);
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data.slice(0, 9)); // Limit to a maximum of 9 exercises
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    // Fetch workout plan ID and details
    const fetchWorkoutPlanId = async () => {
      try {
        const response = await fetch(`/api/workout-plans`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send the userId in the request body
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch workout plans');
        }
    
        const workoutPlan = await response.json();
        console.log('Workout Plan Response:', workoutPlan); // Log the full response
    
        // Check if the returned workout plan belongs to the current user
        if (workoutPlan.user === userId) {
          return workoutPlan._id; // Return the workoutPlanId directly
        } else {
          console.error('The workout plan does not belong to the current user.');
          return null;
        }
      } catch (error) {
        console.error('Error fetching workout plans:', error);
        return null; // Return null in case of an error
      }
    };
    
    

    // Fetch the workout plan details using the workout plan ID
    const fetchWorkoutPlan = async (workoutPlanId) => {
      try {
        const response = await fetch(`/api/workout-plans/${workoutPlanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch workout plan');
        }
        const data = await response.json();
        setWorkoutPlan({
          totalWorkoutDays: data.totalWorkoutDays,
          totalMonths: data.totalMonths,
          frequencyPerWeek: data.frequencyPerWeek,
          totalDuration: data.totalDuration,
          exercises: data.exercises.map(exercise => ({
            Title: exercise.Title,
            Desc: exercise.Desc
          }))
        });
      } catch (error) {
        console.error('Error fetching workout plan:', error);
      }
    };

    // Sequence: Fetch exercises first, then fetch workout plan
    fetchExercises(); // Fetch the exercises using userId
    fetchWorkoutPlanId().then(workoutPlanId => {
      if (workoutPlanId) {
        fetchWorkoutPlan(workoutPlanId); // Fetch the workout plan details using the retrieved workoutPlanId
      }
    });
  }, [userId]);

  const handleClick = (exerciseId) => {
    setActiveExercise((prev) => (prev === exerciseId ? null : exerciseId));
  };

  return (
    <div className='exercise-container'>
      <div className='exercise-main'>
        <div className='exercise-top'>
          <div className='exercise-top-header'>
            <h1>Exercises</h1>
          </div>
          <div className='exercise-top-content'>
            {exercises.map((exercise) => (
              <div
                key={exercise._id}
                className={`exercise-dropdown ${activeExercise === exercise._id ? 'active' : ''}`}
                onClick={() => handleClick(exercise._id)}
              >
                <button className='exercise-dropdown-button'>
                  {exercise.Title}
                </button>
                {activeExercise === exercise._id && (
                  <div className='exercise-dropdown-content'>
                    <p>{exercise.Title}</p>
                    <p>{exercise.Desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='exercise-bottom'>
          <div className='exercise-bottom-header'>
            <h1>Workout Plan</h1>
          </div>
          <div className='exercise-bottom-content'>
            {workoutPlan ? (
              <table className='workout-plan-table'>
                <thead>
                  <tr>
                    <th>Total Workout Days</th>
                    <th>Total Months</th>
                    <th>Frequency Per Week</th>
                    <th>Total Duration (minutes)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{workoutPlan.totalWorkoutDays}</td>
                    <td>{workoutPlan.totalMonths}</td>
                    <td>{workoutPlan.frequencyPerWeek}</td>
                    <td>{workoutPlan.totalDuration}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div>No workout plan found.</div>
            )}
            {workoutPlan && workoutPlan.exercises.length > 0 && (
              <div className='exercises-table'>
                {/* <h2>Exercises</h2> */}
                <table className='exercises-tables'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutPlan.exercises.map((exercise, index) => (
                      <tr key={index}>
                        <td>{exercise.Title}</td>
                        <td>{exercise.Desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
