import React, { useState, useEffect } from 'react';
import { auth, db } from './Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Profile.css';
import Navbar from './Navbar';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const validate = () => {
    let errors = {};

    if (!userData.name) {
      errors.name = 'Name is required';
    }
    if (!userData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }
    if (!userData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!userData.bloodGroup) {
      errors.bloodGroup = 'Blood Group is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const user = auth.currentUser;
        if (user) {
          await updateDoc(doc(db, 'users', user.uid), userData);
          setSuccessMessage('Profile updated successfully!');
        }
      } catch (error) {
        console.error('Error updating profile:', error.message);
        setErrors({ general: 'Failed to update profile. Please try again.' });
      }
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

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
    <div>
      <Navbar />
      <div className="profile-page" style={backgroundImageStyle}>
        <div className="profile-card">
          <h2>PROFILE</h2>
          <form onSubmit={handleSubmit}>

            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="input-field"
                value={userData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="input-field"
                value={userData.email}
                disabled
              />
            </div>

            {/* Date of Birth Field */}
            <div className="form-group">
            <label htmlFor="dob">Date Of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                className="input-field"
                value={userData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
            </div>

            {/* Blood Group Field */}
            <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group</label>
              <select
                name="bloodGroup"
                className="input-field"
                value={userData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="other">Others</option>
              </select>
              {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}
            </div>

            {/* Gender Field */}
            <div className="form-group">
            <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                className="input-field"
                value={userData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            {/* Submit Button */}
            <input type="submit" value="Update Profile" className="submit-btn" />
          </form>

          {successMessage && <span className="success">{successMessage}</span>}
          {errors.general && <span className="error">{errors.general}</span>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
