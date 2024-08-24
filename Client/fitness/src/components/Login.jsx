import { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
      // Navigate to the form component upon successful login
      navigate('/form');
    } else {
      setError('Invalid email or password!');
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
