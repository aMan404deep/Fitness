import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/FitnessForm.css';

const FitnessForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    Level: '',
    goals: '',
    Equipment: '',
    workoutPreference: '',
    timePerWorkout: '',
    workoutFrequencyPerWeek: ''
  });
  const [error, setError] = useState('');

  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && formData.age && formData.gender && formData.height && formData.weight) {
      setStep(2);
    } else if (step === 2 && formData.Level && formData.goals) {
      setStep(3);
    } else if (step === 3 && formData.Equipment && formData.workoutPreference && formData.timePerWorkout && formData.workoutFrequencyPerWeek) {
      // Submit the form data
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // Make the API call to update user data
      console.log(formData)
      const response = await axios.post(`http://localhost:5000/api/users/${userId}`, formData);

      if (response.status === 200) {
        // Handle success, e.g., navigate or show a success message
        console.log('Form data successfully submitted:', response.data);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit form data');
    }
  };

  return (
    <div className='form-overall'>
      <div className='forms-heading-div'>
        <h1 className='forms-heading'>
          Let's know about you more!!
        </h1>
      </div>
      <div className="form-container">
      {step === 1 && (
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <button className='formBtn' onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h2>Fitness Level & Goals</h2>
          <div className="form-group">
            <label>Fitness Level:</label>
            <select
              name="Level"
              value={formData.Level}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label>Goals:</label>
            <select
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="strength">Strength</option>
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleGain">Muscle Gain</option>
            </select>
          </div>
          <div className='btn-div-form'>
            <button className='formBtn' onClick={() => setStep(1)}>Back</button>
            <button className='formBtn' onClick={handleNextStep}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-section">
          <h2>Workout Preferences</h2>
          <div className="form-group">
            <label>Available Equipment:</label>
            <select
              name="Equipment"
              value={formData.Equipment}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Barbell">Barbell</option>
              <option value="Bands">Bands</option>
              <option value="Dumbbell">Dumbbell</option>
              <option value="none">none</option>
            </select>
          </div>
          <div className="form-group">
            <label>Workout Preference:</label>
            <select
              name="workoutPreference"
              value={formData.workoutPreference}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="home">Home</option>
              <option value="gym">Gym</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Time per Workout (minutes):</label>
            <input
              type="number"
              name="timePerWorkout"
              value={formData.timePerWorkout}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Workout Frequency per Week:</label>
            <input
              type="number"
              name="workoutFrequencyPerWeek"
              value={formData.workoutFrequencyPerWeek}
              onChange={handleChange}
              required
            />
          </div>
          <div className='btn-div-form'>
            <button className='formBtn' onClick={() => setStep(2)}>Back</button>
            <button className='formBtn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default FitnessForm;
