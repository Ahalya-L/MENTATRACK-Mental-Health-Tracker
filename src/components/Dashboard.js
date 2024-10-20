import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css';

const images = [
    process.env.PUBLIC_URL + '/blue white motivational natural sea beach desktop wallpaper (1).jpg',
    process.env.PUBLIC_URL + '/Motivational Quote Desktop Wallpaper (2).jpg',
];

const Dashboard = () => {
    const [index, setIndex] = useState(0);
    const aboutUsRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const scrollToAboutUs = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToRes = () => {
        navigate('/Res');
    };

    const handleLoginClick = () => {
        navigate('/login'); // Use navigate to go to the login page
    };

    return (
        <div>
            <div className="dashboard">
                <nav className="dashboard-nav">
                    <div className="logo-container">
                        <img src={process.env.PUBLIC_URL + '/Screenshot.jpg'} alt="Website Logo" className="logo" />
                        <span className="site-name">MENTATRACK</span>
                    </div>
                    <ul>
                        <li><a href="#resources"onClick={scrollToRes}>RESOURCES</a></li>
                        <li><a href="#about" onClick={scrollToAboutUs}>ABOUT US</a></li>
                        <li><a href="#login" onClick={handleLoginClick}>LOGIN <i className="fas fa-user"></i></a></li>
                    </ul>
                </nav>
            </div>
            <div className="carousel-container">
                <div className="carousel-card">
                    <img src={images[index]} alt={`Slide ${index}`} />
                </div>
            </div>
            <div className="about-us" id="about" ref={aboutUsRef}>
                <h2>ABOUT US</h2>
                <p>Welcome to the "Mental Health and Well-being Surveillance, Assessment, and Tracking Solution Among Adults." Our mission is to help adults assess, monitor, and improve their mental health. Our website offers regular, demographic-tailored surveys to evaluate mood, stress, and anxiety. Based on survey results, we provide personalized feedback and solutions to promote mental well-being. Track your progress with visual graphs and survey history. Receive reminders for regular surveys and alerts for high-risk responses to ensure timely support. Explore our collection of articles and videos to educate and empower yourself. Our platform is dedicated to enhancing mental well-being and supporting adults in maintaining a healthy mental state.</p>
            </div>
            <div className="contact-us">
                <h2>CONTACT US</h2>
                <p>Email: support@mentatracker.com</p>
                <p>Phone: +123-456-7890</p>
                <p>Feel free to reach out to us for any queries or support!</p>
            </div>
        </div>
    );
};

export default Dashboard;
