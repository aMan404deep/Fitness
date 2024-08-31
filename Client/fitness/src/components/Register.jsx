import { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password
      });
      if (response.status === 201) {
        // Navigate to the next step or login page
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <div className="form-box">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="register-button">Register</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
          <p className="bottom-text">
            Already have an account? <Link to="/login">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
