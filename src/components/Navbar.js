import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        navigate('/dashboard');
    };
    const handleSurveyClick = () => {
        navigate('/Survey');
    };
    const handleProfileClick = () => {
        navigate('/Profile');  
    };
    const handleTrackClick = () => {
        navigate('/graph');  
    };

    return (
        <nav className="dashboard-nav">
            <div className="logo-container">
                <img src={process.env.PUBLIC_URL + '/Screenshot.jpg'} alt="Website Logo" className="logo" />
                <span className="site-name">MENTATRACK</span>
            </div>
            <ul>
                <li><a href="#survey" onClick={handleSurveyClick}>SURVEY</a></li>
                <li><a href="#tracking"  onClick={handleTrackClick}>TRACKING</a></li>
                <li><a href="#profile" onClick={handleProfileClick} >PROFILE</a></li>
                <li><a href="#logout" onClick={handleLogoutClick}>LOGOUT </a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
