import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { UserContext } from './context/UserContext';
import { db } from './Firebase'; // Assuming you have your Firestore db instance exported from Firebase.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Survey.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Survey = () => {
    const { getEmail } = useContext(UserContext);
    const [name, setName] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null); // State for hovered card
    const [activeCard, setActiveCard] = useState(null);
    const navigate = useNavigate(); // Hook to use navigation

    useEffect(() => {
        const fetchUserName = async () => {
            const userEmail = getEmail();
            if (userEmail) {
                const q = query(collection(db, 'users'), where('email', '==', userEmail));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    setName(userDoc.data().name);
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchUserName();
    }, [getEmail]);

    const cards = [
        {
            id: 1,
            name: 'Depression',
            image: '/card1.jpg',
            tag: 'Depression',
            description: 'Feeling overwhelmed or hopeless? You’re not alone. Our platform offers a range of resources including articles, videos, and surveys to help you understand and manage depression. Click "Take Survey" to start your journey toward a healthier and happier you.'
        },
        {
            id: 2,
            name: 'Stress',
            image: '/card2.jpg',
            tag: 'Stress',
            description: 'Experiencing high levels of stress can affect your overall quality of life. Our website provides practical techniques and guidance through articles and videos to manage stress effectively. Click "Take Survey" to explore ways to reduce stress and enhance your well-being.'
        },
        {
            id: 3,
            name: 'Anxiety',
            image: '/card3.jpg',
            tag: 'Anxiety',
            description: 'Struggling with persistent anxiety can be challenging, but support is available. Our platform offers helpful resources and strategies through articles and videos for coping with anxiety. Click "Take Survey" to start addressing anxiety and improving your mental health.'
        },
        {
            id: 4,
            name: 'EPDS',
            image: '/card4.jpg',
            tag: 'Edinburgh Postnatal Depression Scale',
            description: 'Explore the Edinburgh Postnatal Depression Scale (EPDS), a tool designed to help assess postnatal depression. We provide resources like articles and videos for managing postnatal mental health. Click "Take Survey" to get personalized feedback and support for postnatal well-being.'
        },
        {
            id: 5,
            name: 'PMS',
            image: '/card5.jpg',
            tag: 'Premenstrual Syndrome',
            description: 'Premenstrual Syndrome (PMS) can impact your daily life, but you don’t have to manage it alone. Our website offers insights into PMS and strategies for easing symptoms through articles and videos. Click "Take Survey" to gain access to resources tailored to improving your PMS management.'
        },
        {
            id: 6,
            name: 'AMS',
            image: '/card6.jpg',
            tag: 'Aging Males Symptoms',
            description: "AMS (Aging Males' Symptoms): Assesses symptoms related to andropause and aging in men. Our platform provides resources like articles and videos to help manage these symptoms and improve overall well-being. Click 'Take Survey' to access tools and support tailored for men's health during aging."
        },
        {
            id: 7,
            name: 'General Survey',
            image: '/images/general-survey.jpg', // Placeholder image
            tag: 'General-Survey',
            description: 'Our general survey is designed to provide a comprehensive overview of your mental health. By participating in this survey, you will gain insights into various aspects of your mental well-being. We offer tailored feedback and resources to help you improve your mental health. Click "Take Survey" to begin your journey towards a better understanding of your mental health.'
        },
    ];

    const handleMouseEnter = (card) => {
        setHoveredCard(card);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const handleClick = (card) => {
        setActiveCard(card);
    };

    const handleSurveyClick = () => {
        if (activeCard) {
            navigate('/question', { state: { card: activeCard } });
        }
    };

    const handleClosePopup = () => {
        setActiveCard(null);
    };

    return (
        <div>
            <Navbar />
            <div className="survey-container">
                <h2>Welcome {name},</h2>
                <p>We're excited to hear your thoughts. Let's dive into the survey and make your voice count!</p>
                <div className="card-container">
                    <button 
                        className="general-survey-button" 
                        onClick={() => handleClick(cards[6])}
                    >
                        Take General Survey
                    </button>
                    <div className="general-survey-divider">
    If you have a specific mental health concern, please select and complete the relevant survey below.
</div>

                    <hr className="description-line" />
                    <div className="row">
                        {cards.slice(0, 3).map(card => (
                            <div
                                key={card.id}
                                className="card"
                                onMouseEnter={() => handleMouseEnter(card)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(card)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={card.image} alt={card.name} className="card-image" />
                                </div>
                                <button 
                                    className="card-tag"
                                    onMouseEnter={() => handleMouseEnter(card)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {card.tag}
                                </button>
                                {hoveredCard === card && (
                                    <div className="card-description">
                                        {card.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        {cards.slice(3, 6).map(card => (
                            <div
                                key={card.id}
                                className="card"
                                onMouseEnter={() => handleMouseEnter(card)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(card)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={card.image} alt={card.name} className="card-image" />
                                </div>
                                <button 
                                    className="card-tag"
                                    onMouseEnter={() => handleMouseEnter(card)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {card.tag}
                                </button>
                                {hoveredCard === card && (
                                    <div className="card-description">
                                        {card.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {activeCard && (
                        <>
                            <div className="popup-overlay" onClick={handleClosePopup}></div>
                            <div className="popup">
                                <div className="popup-content">
                                    <div className="popup-name">{activeCard.name}</div>
                                    <div className="popup-description">{activeCard.description}</div>
                                    <button className="survey-button" onClick={handleSurveyClick}>Take Survey</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Survey;
