import React, { useState, useEffect, useContext } from 'react';
import { db } from './Firebase';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { UserContext } from './context/UserContext';
import './Feedback.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; 

const Feedback = () => {
    const [score, setScore] = useState(null);
    const [survey, setSurvey] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { getEmail } = useContext(UserContext);

    useEffect(() => {
        const fetchUserScore = async () => {
            try {
                const email = getEmail();
                if (email) {
                    const scoresCollection = collection(db, 'userScores');
                    const q = query(
                        scoresCollection,
                        where('email', '==', email),
                        orderBy('timestamp', 'desc'),
                        limit(1)
                    );
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const latestDoc = querySnapshot.docs[0];
                        const data = latestDoc.data();
                        setScore(data.score);
                        setSurvey(data.survey);
                    } else {
                        setError('No score data found for this user.');
                    }
                } else {
                    setError('User email not found.');
                }
            } catch (err) {
                setError(`Error fetching score data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserScore();
    }, [getEmail]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (score === null) return <div>No score available.</div>;

    let feedbackText = '';
    let severityLevel = '';

    // Define feedback for each condition
    const getFeedback = () => {
        switch (survey) {
            case 'Depression':
                if (score <= 14) {
                    severityLevel = 'Minimal Depression';
                    feedbackText = getRandomFeedback('depression', 'minimal');
                } else if (score <= 33) {
                    severityLevel = 'Mild Depression';
                    feedbackText = getRandomFeedback('depression', 'mild');
                } else if (score <= 51) {
                    severityLevel = 'Moderate Depression';
                    feedbackText = getRandomFeedback('depression', 'moderate');
                } else if (score <= 70) {
                    severityLevel = 'Moderately Severe Depression';
                    feedbackText = getRandomFeedback('depression', 'moderateSevere');
                } else {
                    severityLevel = 'Severe Depression';
                    feedbackText = getRandomFeedback('depression', 'severe');
                }
                break;

            case 'Edinburgh Postnatal Depression Scale':
                if (score >= 0 && score <= 30) {
                    severityLevel = 'Low Likelihood of Depression';
                    feedbackText = getRandomFeedback('epds', 'low');
                } else if (score >= 31 && score <= 40) {
                    severityLevel = 'Possible Depression';
                    feedbackText = getRandomFeedback('epds', 'possible');
                } else if (score >= 41 && score <= 100) {
                    severityLevel = 'Higher Likelihood of Depression';
                    feedbackText = getRandomFeedback('epds', 'higher');
                } else {
                    severityLevel = 'Invalid Score';
                    feedbackText = 'Please ensure the score is within the valid range (0-30).';
                }
                break;

            case 'Premenstrual Syndrome':
                if (score >= 0 && score <= 28) {
                    severityLevel = 'No Symptoms';
                    feedbackText = getRandomFeedback('pms', 'none');
                } else if (score >= 29 && score <= 50) {
                    severityLevel = 'Mild Symptoms';
                    feedbackText = getRandomFeedback('pms', 'mild');
                } else if (score >= 51 && score <= 75) {
                    severityLevel = 'Moderate Symptoms';
                    feedbackText = getRandomFeedback('pms', 'moderate');
                } else if (score >= 75 && score <= 100) {
                    severityLevel = 'Severe Symptoms';
                    feedbackText = getRandomFeedback('pms', 'severe');
                } else {
                    severityLevel = 'Invalid Score';
                    feedbackText = 'Please ensure the score is within the valid range (0-54).';
                }
                break;

            case 'General-Survey':
                if (score >= 0 && score <= 27) {
                    severityLevel = 'No Distress';
                    feedbackText = getRandomFeedback('generalSurvey', 'noDistress');
                } else if (score >= 28 && score <= 42) {
                    severityLevel = 'Mild Distress';
                    feedbackText = getRandomFeedback('generalSurvey', 'mildDistress');
                } else if (score >= 42 && score <= 71) {
                    severityLevel = 'Moderate Distress';
                    feedbackText = getRandomFeedback('generalSurvey', 'moderateDistress');
                } else if (score >= 71 && score <= 100) {
                    severityLevel = 'Severe Distress';
                    feedbackText = getRandomFeedback('generalSurvey', 'severeDistress');
                } else {
                    severityLevel = 'Invalid Score';
                    feedbackText = 'Please ensure the score is within the valid range (0-84).';
                }
                break;

            case 'Aging Males Symptoms':
                if (score <= 43) {
                    severityLevel = 'No Complaints';
                    feedbackText = getRandomFeedback('ams', 'none');
                } else if (score >= 44 && score <= 60) {
                    severityLevel = 'Mild Symptoms';
                    feedbackText = getRandomFeedback('ams', 'mild');
                } else if (score >= 61 && score <= 81) {
                    severityLevel = 'Moderate Symptoms';
                    feedbackText = getRandomFeedback('ams', 'moderate');
                } else if (score >= 82 ) {
                    severityLevel = 'Severe Symptoms';
                    feedbackText = getRandomFeedback('ams', 'severe');
                } else {
                    severityLevel = 'Invalid Score';
                    feedbackText = 'Please ensure the score is within the valid range.';
                }
                break;

            case 'Anxiety':
                if (score >= 0 && score <= 19) {
                    severityLevel = 'Minimal Anxiety';
                    feedbackText = getRandomFeedback('anxiety', 'minimal');
                } else if (score >= 20 && score <= 42) {
                    severityLevel = 'Mild Anxiety';
                    feedbackText = getRandomFeedback('anxiety', 'mild');
                } else if (score >= 43 && score <= 66) {
                    severityLevel = 'Moderate Anxiety';
                    feedbackText = getRandomFeedback('anxiety', 'moderate');
                } else if (score >= 67 && score<=100) {
                    severityLevel = 'Severe Anxiety';
                    feedbackText = getRandomFeedback('anxiety', 'severe');
                } else {
                    severityLevel = 'Invalid Score';
                    feedbackText = 'Please ensure the score is within the valid range.';
                }
                break;

            case 'Stress':
                if (score >= 0 && score <= 22) {
                    severityLevel = 'Normal';
                    feedbackText = getRandomFeedback('stress', 'normal');
                } else if (score >= 23 && score <= 28) {
                    severityLevel = 'Mild Stress';
                    feedbackText = getRandomFeedback('stress', 'mild');
                } else if (score >= 29 && score <= 39) {
                    severityLevel = 'Moderate Stress';
                    feedbackText = getRandomFeedback('stress', 'moderate');
                } else if (score >= 40) {
                    severityLevel = 'Severe Stress';
                    feedbackText = getRandomFeedback('stress', 'severe');
                } else {
                    severityLevel = 'Invalid Score';
                    feedbackText = 'Please ensure the score is within the valid range.';
                }
                break;

            default:
                severityLevel = 'Unknown Survey';
                feedbackText = 'No feedback available for the specified survey.';
                break;
        }
    };

    const getRandomFeedback = (surveyType, severity) => {
        const feedbacks = {
            depression: {
                minimal: [
                    'You have minimal symptoms of depression. Keep maintaining a healthy lifestyle and stay positive.',
                    'Your minimal depression score suggests that you are managing well. Continue to engage in activities that promote well-being.'
                ],
                mild: [
                    'You are experiencing mild depression.Staying connected with friends and family can provide important emotional support.',
                    'Your score indicates mild depression. Engaging in self-care activities, such as hobbies you enjoy, can help improve your mood.',
                    'You are experiencing mild depression.Maintaining a regular sleep schedule is crucial for boosting your overall well-being.'
                ],
                moderate: [
                    'Moderate depression suggests a need for professional support. Reaching out to supportive friends or a mental health hotline could offer the support you need.',
                    'Your score shows moderate symptoms of depression. Regular physical activity is known to boost mood, so try to include it in your daily routine.',
                    'Your score shows moderate symptoms of depression.Talking to a therapist can help you explore and address the underlying causes of your depression.'
                ],
                moderateSevere: [
                    'Moderately severe depression requires attention. It’s important to seek professional help to address these symptoms.',
                    'Your score indicates moderately severe depression. Working with a therapist to create a safety plan, especially if thoughts of self-harm arise, is essential.'
                ],
                severe: [
                    'HIGH RISK ALERT. Severe depression needs immediate attention. Urgent consultation with a psychiatrist or mental health crisis team is essential at this stage.',
                    'HIGH RISK ALERT. Your severe depression score suggests urgent need for professional help. Stay connected with trusted individuals who can offer strong support during this period.'
                ]
            },
            epds: {
                low: [
                    'You have a low likelihood of depression. Continue to monitor your mood and seek support if needed.',
                    'Your low EPDS score indicates minimal risk. Maintain your well-being and seek help if you experience any changes.'
                ],
                possible: [
                    'There is a possible indication of depression. Consider discussing your feelings with a healthcare provider.',
                    'A possible depression score suggests that a consultation with a mental health professional might be beneficial.'
                ],
                higher: [
                    'HIGH RISK ALERT. Higher likelihood of depression warrants further evaluation. Seeking professional advice is recommended.',
                    'HIGH RISK ALERT. Your score suggests a higher likelihood of depression. Professional support could help manage these symptoms.'
                ]
            },
            pms: {
                none: [
                    'You are not experiencing significant premenstrual symptoms. Keep monitoring and maintaining a healthy routine.',
                    'No significant premenstrual symptoms detected. Continue with your current self-care practices.'
                ],
                mild: [
                    'Mild premenstrual symptoms may be present. Consider lifestyle adjustments to alleviate discomfort.',
                    'Your symptoms are mild. Managing stress and maintaining a balanced diet might help improve your well-being.'
                ],
                moderate: [
                    'Moderate symptoms may be affecting your daily life. It might be helpful to explore stress reduction techniques or consult a healthcare provider.',
                    'Moderate premenstrual symptoms suggest that further self-care or professional advice could be beneficial.'
                ],
                severe: [
                    'HIGH RISK ALERT. Severe symptoms require attention. Consulting with a healthcare provider to address these symptoms is recommended.',
                    'HIGH RISK ALERT. Severe premenstrual symptoms need professional evaluation. Seek support to manage and alleviate these symptoms effectively.'
                ]
            },
            generalSurvey: {
                noDistress: [
                    'You are experiencing no distress. Continue to engage in activities that promote your well-being.',
                    'No distress reported. Maintain your positive lifestyle and continue to monitor your well-being.'
                ],
                mildDistress: [
                    'Mild distress indicates that you may benefit from stress management techniques or relaxation practices.',
                    'Your score suggests mild distress. Implementing relaxation strategies could be helpful.'
                ],
                moderateDistress: [
                    'Moderate distress requires attention. Consider exploring stress management options and seeking support if needed.',
                    'Moderate distress may need further evaluation. Incorporating stress reduction techniques could be beneficial.'
                ],
                severeDistress: [
                    'HIGH RISK ALERT. Severe distress needs immediate attention. Consulting with a mental health professional is recommended.',
                    'HIGH RISK ALERT. Your score indicates severe distress. Professional support and intervention are crucial.'
                ]
            },
            ams: {
                none: [
                    'No symptoms of aging males. Continue to maintain a healthy lifestyle and monitor any changes.',
                    'You have no symptoms. Keep following a healthy routine and stay proactive about your health.'
                ],
                mild: [
                    'Mild symptoms of aging males. Regular check-ups and lifestyle adjustments might be beneficial.',
                    'Mild symptoms observed. Consider consulting a healthcare provider for personalized advice.'
                ],
                moderate: [
                    'Moderate symptoms may need further evaluation. Consulting with a healthcare provider could provide better insights and support.',
                    'Moderate symptoms suggest exploring professional advice and potential treatment options.'
                ],
                severe: [
                    'HIGH RISK ALERT. Severe symptoms require immediate attention. It is important to seek a healthcare provider for an in-depth evaluation and support.',
                    'HIGH RISK ALERT. Severe symptoms indicate a need for urgent professional help. Reach out to a healthcare provider for effective management.'
                ]
            },
            anxiety: {
                minimal: [
                    'You have minimal anxiety. Continue to practice stress-relief techniques and maintain your well-being.',
                    'Minimal anxiety reported. Continue your positive habits and seek support if needed.'
                ],
                mild: [
                    'Mild anxiety may benefit from additional coping strategies or relaxation techniques.',
                    'Your anxiety level is mild. Consider implementing stress management practices or consulting a professional.'
                ],
                moderate: [
                    'Moderate anxiety indicates that further strategies or professional support might be helpful.',
                    'Moderate anxiety may require additional support or intervention. Consider reaching out to a mental health professional.'
                ],
                severe: [
                    'HIGH RISK ALERT. Severe anxiety needs immediate attention. Seeking professional help is essential for managing your symptoms.',
                    'HIGH RISK ALERT. Your score indicates severe anxiety. Consult with a mental health professional for urgent support and treatment.'
                ]
            },
            stress: {
                normal: [
                    'Your stress level is normal. Continue to monitor your well-being and engage in stress-relief activities as needed.',
                    'No significant stress detected. Maintain your current healthy lifestyle and stress management practices.'
                ],
                mild: [
                    'Mild stress can be managed with relaxation techniques and stress-reducing activities.',
                    'Your stress level is mild. Consider incorporating stress management techniques into your routine.'
                ],
                moderate: [
                    'Moderate stress requires more attention. Explore additional stress management strategies and seek support if necessary.',
                    'Moderate stress may benefit from further intervention. Consider discussing with a professional or exploring coping strategies.'
                ],
                severe: [
                    'HIGH RISK ALERT. Severe stress needs immediate attention. Consulting with a mental health professional is recommended for effective management.',
                    'HIGH RISK ALERT. Your score indicates severe stress. Professional help and intervention are crucial to manage your symptoms effectively.'
                ]
            }
        };

        return feedbacks[surveyType][severity][Math.floor(Math.random() * feedbacks[surveyType][severity].length)];
    };

    getFeedback();

    return (
        <div>
          <Navbar />
          <div className="feedback-container">
            <h2>Results and Feedback</h2>
      
            {/* New Survey Type Box */}
            <div className="survey-type-box">
              <strong>Survey Type:</strong> {survey}
            </div>
      
            {/* Score Box */}
            <div className="score-box">
              <div className="score"><strong>Score:</strong> {score}</div>
            </div>
      
            {/* Severity Box */}
            <div className="severity">
              <strong>Severity Level:</strong> {severityLevel}
            </div>
      
            <p>{feedbackText}</p>
            <div className="resources-section">
                <p>If you're looking for additional support, feel free to explore our helpful resources.
                <Link to="/Res" className="resources-link">Explore Resources</Link></p>
            </div>
          </div>
        </div>
      );
      
};

export default Feedback;
