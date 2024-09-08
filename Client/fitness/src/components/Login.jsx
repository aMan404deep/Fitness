import { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the API call
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      // Assuming the API returns a token
      const { token,userId  } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Navigate to the form component upon successful login
      navigate('/form');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="bottom-text">
            Don't have an account? <Link to="/register">Register</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
