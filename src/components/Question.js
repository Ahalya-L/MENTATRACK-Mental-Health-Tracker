import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import './Question.css';    
import { UserContext } from './context/UserContext';
import { db } from './Firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const defaultOptions = ['Not at all', 'Occasionally', 'Frequently', 'Almost always'];
const agingMalesOptions = ['None', 'Mild', 'Moderate', 'Severe', 'Extreme'];
const premenstrualSyndromeOptions = ['Not at all', 'Mild', 'Moderate', 'Severe'];

const epdsQuestions = [
  { id: 1, question: 'How often have you been able to laugh and enjoy things lately, compared to before?', options: ['Just as much as I always could', 'Less than I used to', 'Much less than before', 'Not at all'] },
  { id: 2, question: 'How much do you currently look forward to and enjoy things, compared to how you used to?', options: ['As much as I ever did', 'Less than I used to', 'Much less than before', 'Very little or not at all'] },
  { id: 3, question: 'How frequently do you find yourself blaming yourself when things go wrong, even if it’s not your fault?', options: ['Most of the time', 'Sometimes', 'Rarely', 'Never'] },
  { id: 4, question: 'How often do you feel anxious or worried without any clear reason for these feelings?', options: ['Not at all', 'Rarely', 'Sometimes', 'Very often'] },
  { id: 5, question: 'Are you experiencing feelings of fear or panic without a clear cause, such as suddenly feeling scared or overwhelmed?', options: ['Quite often', 'Sometimes', 'Not much', 'Not at all'] },
  { id: 6, question: 'How well are you handling challenges and difficulties in your life right now?', options: ['I’ve been struggling to cope most of the time', 'I’ve had some difficulties coping', 'I’ve been coping quite well', 'I’ve been coping as well as ever'] },
  { id: 7, question: 'Has your unhappiness affected your ability to sleep, making it difficult to fall asleep or stay asleep?', options: ['Most of the time', 'Occasionally', 'Rarely', 'Not at all'] },
  { id: 8, question: 'How frequently have you been feeling sad or miserable in recent times?', options: ['Most of the time', 'Often', 'Occasionally', 'Never'] },
  { id: 9, question: 'How often have you felt so unhappy recently that it led to crying?', options: ['Most of the time', 'Often', 'Occasionally', 'Never'] },
  { id: 10, question: 'Have you had thoughts about harming yourself recently?', options: ['Quite often', 'Sometimes', 'Rarely', 'Never'] }
];

const stressOptions = [
  'Did not apply to me at all',
  'Applied to me to some degree, or some of the time',
  'Applied to me to a considerable degree or a good part of time',
  'Applied to me very much or most of the time'
];
const anxietyOptions = [
  'Never',
  'Occasionally',
  'Frequently',
  'Every day'
];
const depressionOptions = [
  'Not at all',
  'Several days',
  'More than half the days',
  'Nearly every day'
];

const Question = () => {
  const { state } = useLocation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState(defaultOptions);
  const { getEmail } = useContext(UserContext);
  const [gender, setGender] = useState(''); // State to hold user gender

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userEmail = getEmail();
      if (userEmail) {
        const q = query(collection(db, 'users'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setGender(userDoc.data().gender); // Assuming gender is stored in the 'users' collection
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserDetails();
  }, [getEmail]);

    // Example function to navigate to the questions page based on gender
  

  useEffect(() => {
    if (state && state.card) {
      if (state.card.tag === 'Aging Males Symptoms') {
        setQuestions([
          { id: 1, question: 'Have you noticed a general weakness in your overall well-being or health?' },
          { id: 2, question: 'Are you experiencing joint pain or muscle aches, such as lower back pain or pain in your limbs?' },
          { id: 3, question: 'Do you experience excessive sweating, like unexpected hot flashes or sweating without physical effort?' },
          { id: 4, question: 'Are you having trouble sleeping, such as difficulty falling asleep, staying asleep, waking up too early, or feeling tired despite sleeping?' },
          { id: 5, question: 'Do you often find yourself feeling unusually tired or needing more rest than usual?' },
          { id: 6, question: 'Do you feel irritable, easily upset, or moody?' },
          { id: 7, question: 'Do you experience feelings of nervousness or restlessness?' },
          { id: 8, question: 'Are you feeling anxious or panicky?' },
          { id: 9, question: 'Do you feel physically exhausted, lack energy, or find it hard to motivate yourself to do activities?' },
          { id: 10, question: 'Are you noticing a decrease in your muscle strength, making you feel weaker?' },
          { id: 11, question: 'Do you often feel depressed, sad, or on the verge of tears, or experience mood swings?' },
          { id: 12, question: 'Do you feel like you’re no longer as capable or successful as you once were?' },
          { id: 13, question: 'Do you often feel very down or sad, or experience sudden changes in your mood?' },
          { id: 14, question: 'Are you noticing a decrease in the growth of your beard?' },
          { id: 15, question: 'Have you noticed any changes in your usual morning routine or energy levels?' }
        ]);
        
        setOptions(agingMalesOptions);
      }
      else if (state.card.tag === 'Anxiety') {
        setQuestions([
  { id: 1, question: 'Have you been feeling nervous, anxious, or tense?' },
  { id: 2, question: 'Is it difficult for you to stop or control your worries?' },
  { id: 3, question: 'Are you finding yourself worrying excessively about various things?' },
  { id: 4, question: 'Is relaxing becoming a challenge for you?' },
  { id: 5, question: 'Is restlessness making it hard for you to sit still?' },
  { id: 6, question: 'Are you becoming easily annoyed or irritable?' },
  { id: 7, question: 'Are you often feeling like something bad might happen, even without a clear reason?' }
]);

        setOptions(anxietyOptions);
      }
      else if (state.card.tag === 'Premenstrual Syndrome') {
        setQuestions([
          { id: 1, question: 'Are feelings of anger or irritability something you experience before your period, which typically resolve within a few days of periods?' },
          { id: 2, question: 'Is there a noticeable increase in anxiety or tension before your period begins, with these symptoms generally easing within a few days after period starts?' },
          { id: 3, question: 'Are you more tearful or sensitive to rejection in the days leading up to your period, with these feelings usually subsiding within a few days of starting your period?' },
          { id: 4, question: 'Is a decreased mood or sense of hopelessness something you experience before your period, which usually improves a few days after your period begins?' },
          { id: 5, question: 'Have you noticed a reduction in your interest in work activities before your period starts, with this interest generally returning to normal a few days after period begins?' },
          { id: 6, question: 'In the days before your period, is there a decrease in your interest in home activities, which typically resolves a few days after your period starts?' },
          { id: 7, question: 'How often does your interest in social activities decrease before your period, with this usually improving within a few days of periods?' },
          { id: 8, question: 'Is difficulty concentrating a common issue for you before your period, with this problem generally easing a few days after your period begins?' },
          { id: 9, question: 'Does fatigue or a lack of energy become more noticeable before your period, with these symptoms usually improving within a few days after period starts?' },
          { id: 10, question: 'Are overeating or food cravings significant for you in the days leading up to your period, with these symptoms typically resolving a few days after your period starts?' },
          { id: 11, question: 'Is insomnia a concern before your period begins, with this usually improving a few days after your period starts?' },
          { id: 12, question: 'Are you experiencing hypersomnia, or a need for more sleep, before your period, with this increased need usually subsiding a few days after periods begins?' },
          { id: 13, question: 'In the days leading up to your period, do you feel overwhelmed or out of control, with these feelings generally easing within a few days of your period starting?' },
          { id: 14, question: 'Do you experience physical symptoms such as headaches, joint or muscle pain, bloating, or weight gain before your period, with these symptoms typically resolving a few days after bleeding begins?' },
          { id: 15, question: 'To what extent have your premenstrual symptoms affected your work efficiency or productivity?' },
          { id: 16, question: 'How much have your relationships with coworkers been impacted by your premenstrual symptoms?' },
          { id: 17, question: 'In what way have your premenstrual symptoms interfered with your relationships with your family?' },
          { id: 18, question: 'How significantly have your home responsibilities been affected by your premenstrual symptoms?' }
        ]);
        
        setOptions(premenstrualSyndromeOptions);
      }
      else if (state.card.tag === 'Stress') {
        setQuestions([
          { id: 1, question: 'Do you find it hard to relax?' },
          { id: 2, question: 'Do you often notice that your mouth feels dry?' },
          { id: 3, question: 'Are you struggling to feel any positive emotions?' },
          { id: 4, question: 'Have you had trouble breathing, like rapid breaths or feeling breathless, even when not active?' },
          { id: 5, question: 'Is it difficult for you to find the motivation to start tasks?' },
          { id: 6, question: 'Do you tend to overreact in different situations?' },
          { id: 7, question: 'Have you experienced shaking, like in your hands?' },
          { id: 8, question: 'Do you feel like you’re using up a lot of nervous energy?' },
          { id: 9, question: 'Are you worried about situations where you might panic and embarrass yourself?' },
          { id: 10, question: 'Do you feel like there’s nothing to look forward to in life?' },
          { id: 11, question: 'Do you often find yourself getting easily worried?' },
          { id: 12, question: 'Is it challenging for you to relax?' },
          { id: 13, question: 'Do you frequently feel sad or depressed?' },
          { id: 14, question: 'Are you easily frustrated by interruptions that stop you from continuing what you were doing?' },
          { id: 15, question: 'Do you sometimes feel like you’re close to panicking?' },
          { id: 16, question: 'Is it hard for you to get excited about anything?' },
          { id: 17, question: 'Do you feel like you’re not worth much as a person?' },
          { id: 18, question: 'Are you often feeling irritable or overly sensitive?' },
          { id: 19, question: 'Do you notice changes in your heart rate, like it speeding up or skipping a beat, even when you’re not exerting yourself?' },
          { id: 20, question: 'Do you ever feel scared without a clear reason?' },
          { id: 21, question: 'Do you often feel like life doesn’t have much meaning?' }
        ]);
        
        setOptions(stressOptions);
      }
      else if (state.card.tag === 'Edinburgh Postnatal Depression Scale') {
        setQuestions(epdsQuestions);
          setOptions(epdsQuestions[0].options);
        }
      
      else if (state.card.tag === 'Depression') {
      setQuestions([
        { id: 1, question: 'Have you found yourself losing interest  in activities you typically enjoy?' },
        { id: 2, question: 'Do you often feel down, depressed, or hopeless?' },
        { id: 3, question: 'Are you experiencing trouble falling asleep, staying asleep, or are you sleeping excessively?' },
        { id: 4, question: 'Do you frequently feel tired or lack energy?' },
        { id: 5, question: 'Is your appetite poor or are you overeating more than usual?' },
        { id: 6, question: 'Do you feel bad about yourself, feel like a failure, or believe you have let yourself or your family down?' },
        { id: 7, question: 'Are you having difficulty concentrating on tasks, such as reading the newspaper or watching television?' },
        { id: 8, question: 'Have others noticed that you are moving or speaking so slowly, or restless that you’ve been moving around more than usual?' },
        { id: 9, question: 'Have you had thoughts of hurting yourself?' },
      ]);
      setOptions(depressionOptions);
    }
       else {
        if (gender === 'male') {
          setQuestions([
            { id: 1, question: 'How often do you find it difficult to laugh and find joy in your daily routines?' },
            { id: 2, question: 'Do you feel the need for additional emotional support or self-care to manage your daily stress?' },
            { id: 3, question: 'Are you frequently feeling drained or overwhelmed by the demands of balancing work, home, and personal life?' },
            { id: 4, question: 'Do you sometimes feel that your concerns about stress or hormonal changes are not fully acknowledged?' },
            { id: 5, question: 'Are you experiencing headaches or migraines that you suspect are related to hormonal changes or your work pressure?' },
            { id: 6, question: 'Do you notice any increased tension or pressure in your head that seems related to stress or hormonal fluctuations?' },
            { id: 7, question: 'Are you dealing with symptoms like hot flashes or changes in body temperature that affect your daily comfort?' },
            { id: 8, question: 'Do you struggle with sleep disruptions due to worries about handling your daily responsibilities?' },
            { id: 9, question: 'Is staying asleep challenging for you because of stress or anxiety related to your roles and responsibilities?' },
            { id: 10, question: 'Are you feeling a constant sense of pressure from managing various aspects of your life, such as work and family?' },
            { id: 11, question: 'Have you noticed increased irritability or mood swings, especially in connection to hormonal changes?' },
            { id: 12, question: 'Do you experience sudden episodes of anxiety or panic that seem to arise without a clear trigger?' },
            { id: 13, question: 'Are you feeling overwhelmed by the expectations and responsibilities that come with managing your home and work life?' },
            { id: 14, question: 'Do you find persistent anxiety or stress challenging due to the demands of your daily routine and caregiving roles?' },
            { id: 15, question: 'Are you feeling difficult to find satisfaction and joy in your daily activities despite the stress of managing multiple roles?' },
            { id: 16, question: 'Do you find that your fatigue or stress makes tasks take longer to complete than they normally would?' },
            { id: 17, question: 'Are you dissatisfied with how you manage and complete your daily responsibilities, despite feeling overwhelmed at times?' },
            { id: 18, question: 'Do you generally feel that you are struggling to handle your daily responsibilities, despite not facing many challenges?' },
            { id: 19, question: 'Do you feel that your contributions to your family or community are not valued and make a negative impact?' },
            { id: 20, question: 'Are you confident in your ability to make decisions that affect your well-being and those around you?' },
            { id: 21, question: 'Can you enjoy your everyday activities without being overwhelmed by guilt or stress from other responsibilities?' },
            { id: 22, question: 'Do you perceive yourself as valuable and worthy despite the pressures and expectations from society?' },
            { id: 23, question: 'Have you experienced moments of hopelessness or a lack of purpose during particularly tough times?' },
            { id: 24, question: 'Do you sometimes question the worth of your daily efforts or life during periods of intense stress or depression?' },
            { id: 25, question: 'Have thoughts of self-harm occurred when feeling excessively overwhelmed by daily challenges?' },
            { id: 26, question: 'Are there times when anxiety or stress makes it difficult for you to take action or complete everyday tasks?' },
            { id: 27, question: 'Do you find yourself longing for an escape or break from the pressures and responsibilities of daily life?' },
            { id: 28, question: 'Do you struggle with thoughts of self-harm during severe emotional or mental distress?' }
          ]);
        } else {
          setQuestions([
            { id: 1, question: 'How often do you find it difficult to laugh and find joy in your daily routines?' },
            { id: 2, question: 'Do you feel the need for additional emotional support or self-care to manage your daily stress?' },
            { id: 3, question: 'Are you frequently feeling drained or overwhelmed by the demands of balancing work, home, and personal life?' },
            { id: 4, question: 'Do you sometimes feel that your concerns about stress or hormonal changes are not fully acknowledged?' },
            { id: 5, question: 'Are you experiencing headaches or migraines that you suspect are related to hormonal changes or your menstrual cycle?' },
            { id: 6, question: 'Do you notice any increased tension or pressure in your head that seems related to stress or hormonal fluctuations?' },
            { id: 7, question: 'Are you dealing with symptoms like hot flashes or changes in body temperature that affect your daily comfort?' },
            { id: 8, question: 'Do you struggle with sleep disruptions due to worries about handling your daily responsibilities?' },
            { id: 9, question: 'Is staying asleep challenging for you because of stress or anxiety related to your roles and responsibilities?' },
            { id: 10, question: 'Are you feeling a constant sense of pressure from managing various aspects of your life, such as work and family?' },
            { id: 11, question: 'Have you noticed increased irritability or mood swings, especially in connection to hormonal changes?' },
            { id: 12, question: 'Do you experience sudden episodes of anxiety or panic that seem to arise without a clear trigger?' },
            { id: 13, question: 'Are you feeling overwhelmed by the expectations and responsibilities that come with managing your home and work life?' },
            { id: 14, question: 'Do you find persistent anxiety or stress challenging due to the demands of your daily routine and caregiving roles?' },
            { id: 15, question: 'Are you feeling difficult to find satisfaction and joy in your daily activities despite the stress of managing multiple roles?' },
            { id: 16, question: 'Do you find that your fatigue or stress makes tasks take longer to complete than they normally would?' },
            { id: 17, question: 'Are you dissatisfied with how you manage and complete your daily responsibilities, despite feeling overwhelmed at times?' },
            { id: 18, question: 'Do you generally feel that you are struggling to handle your daily responsibilities, despite not facing many challenges?' },
            { id: 19, question: 'Do you feel that your contributions to your family or community are not valued and make a negative impact?' },
            { id: 20, question: 'Are you confident in your ability to make decisions that affect your well-being and those around you?' },
            { id: 21, question: 'Can you enjoy your everyday activities without being overwhelmed by guilt or stress from other responsibilities?' },
            { id: 22, question: 'Do you perceive yourself as valuable and worthy despite the pressures and expectations from society?' },
            { id: 23, question: 'Have you experienced moments of hopelessness or a lack of purpose during particularly tough times?' },
            { id: 24, question: 'Do you sometimes question the worth of your daily efforts or life during periods of intense stress or depression?' },
            { id: 25, question: 'Have thoughts of self-harm occurred when feeling excessively overwhelmed by daily challenges?' },
            { id: 26, question: 'Are there times when anxiety or stress makes it difficult for you to take action or complete everyday tasks?' },
            { id: 27, question: 'Do you find yourself longing for an escape or break from the pressures and responsibilities of daily life?' },
            { id: 28, question: 'Do you struggle with thoughts of self-harm during severe emotional or mental distress?' }
          ]);
        }
        
        setOptions(defaultOptions);
      }
    }
  }, [state, gender]);
  const navigate = useNavigate();
  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionIndex]: optionIndex
    }));
  };
  const totalScores = {
    'General-Survey':28*3,
    'Depression':9*3,
    'Aging Males Symptoms': 15 * 4, // 15 questions, each with 4 possible scores
    'Premenstrual Syndrome': 18 * 3, // 18 questions, each with 3 possible scores
    'Stress': 21 * 3, // 21 questions, each with 3 possible scores
    'EPDS': 10 * 3, // 10 questions, each with 3 possible scores
    'Anxiety':7*3
  };
  const calculateScore = () => {
    const totalScore = totalScores[state.card.tag] || 0;
    const userScore = Object.values(selectedOptions).reduce((total, optionIndex) => total + optionIndex, 0);
    const percentage = Math.round((userScore / totalScore) * 100); // Calculate percentage and round it
    return `${percentage}`; // Return as a string with '%' symbol
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const userEmail = getEmail(); // Assuming this is a function you have defined elsewhere

    try {
      await addDoc(collection(db, 'userScores'), {
        email: userEmail,
        score: score,
        survey: state.card.tag,
        timestamp: new Date()
      });
      // Redirect to Feedback page
      navigate('/feedback');
    } catch (error) {
      console.error('Error storing score:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="question-container">
  <h1 className="question-title">Survey Page - {state.card.tag}</h1>

  {questions.map((question, questionIndex) => (
    <div key={question.id} className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-list">
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="option-item">
            <input
              type="radio"
              id={`question-${questionIndex}-option-${optionIndex}`}
              name={`question-${questionIndex}`}
              checked={selectedOptions[questionIndex] === optionIndex}
              onChange={() => handleOptionChange(questionIndex, optionIndex)}
            />
            <label htmlFor={`question-${questionIndex}-option-${optionIndex}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  ))}

        <div className="submit-container">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
