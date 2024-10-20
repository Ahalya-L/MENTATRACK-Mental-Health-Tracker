import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './signup.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [genderOption, setGenderOption] = useState('');
  const [bloodGroup, setBloodGroup] = useState(''); // Blood group state
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};
    const currentDate = new Date();
    const selectedDate = new Date(dateOfBirth);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
      age--;
    }

    if (!name) {
      errors.name = 'Name is required';
    }
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
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    } else if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old to register';
    }
    if (!genderOption) {
      errors.gender = 'Please select your gender';
    }
    if (!bloodGroup) {
      errors.bloodGroup = 'Please select your blood group';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log('Form is valid, proceeding with sign-up');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user);

        // Save user details in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          dateOfBirth,
          gender: genderOption,
          bloodGroup // Include blood group in the data
        });

        navigate('/login');
      } catch (error) {
        console.error('Error signing up:', error.message);
        if (error.code === 'auth/email-already-in-use') {
          setErrors({ email: 'Email already exists' });
        } else {
          setErrors({ general: 'Failed to sign up. Please try again.' });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderSelect = (e) => {
    setGenderOption(e.target.value);
  };

  const handleBloodGroupSelect = (e) => {
    setBloodGroup(e.target.value);
  };

// Inline style for background image
const backgroundImageStyle = {
  backgroundImage: "url('/Screenshot (150).png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

  return (
    <div className="signup-page" style={backgroundImageStyle}>
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Date of Birth"
              className="input-field"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          </div>
          <div className="form-group">
            <select onChange={handleGenderSelect} className="input-field" value={genderOption}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          <div className="form-group">
            <select onChange={handleBloodGroupSelect} className="input-field" value={bloodGroup}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="Other">Others</option>
            </select>
            {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}
          </div>
          <input type="submit" value="Sign Up" className="input-field submit-btn" />
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
        {errors.general && <span className="error">{errors.general}</span>}
      </div>
    </div>
  );
};

export default Signup;
