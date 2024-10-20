import React, { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase';
import './login.css';

const Login = () => {
  const { login } = useContext(UserContext); // Ensure you use useContext correctly
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        login({ email: user.email }); // Store the user email in context and localStorage
        navigate('/survey');
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          setErrors({ password: 'Incorrect password' });
        } else if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'No user found with this email' });
        } else {
          setErrors({ general: 'Failed to log in. Please try again.' });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        setResetEmailSent(true);
        setErrors({});
      } catch (error) {
        setErrors({ general: 'Failed to send password reset email. Please try again.' });
      }
    } else {
      setErrors({ email: 'Please enter your email to reset password' });
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const backgroundImageStyle = {
    backgroundImage: "url('/oooo.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div className="login-page" style={backgroundImageStyle}>
      <div className="login-card">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-arrow"
          onClick={handleBackClick}
        />
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        <div className="signup-link">
          <button type="button" onClick={handleForgotPassword}>Forgot Password?</button>
        </div>
        {errors.general && <span className="error">{errors.general}</span>}
        {resetEmailSent && <span className="success">Password reset email sent! Check your inbox.</span>}
      </div>
    </div>
  );
};

export default Login;
