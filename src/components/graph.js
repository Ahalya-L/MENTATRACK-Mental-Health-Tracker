import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { UserContext } from './context/UserContext'; // Import UserContext for logged-in user
import { db } from './Firebase'; // Import your Firestore config
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore imports
import Navbar from './Navbar';
import './graph.css';

function Graph() {
  const { user } = useContext(UserContext); // Fetch logged-in user's details
  const [scoresData, setScoresData] = useState({ labels: [], scores: [], surveys: [] }); // State to store scores, timestamps, and survey types
  const [userName, setUserName] = useState(''); // State to store the user's name

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Query the users collection where email matches the logged-in user's email
        const q = query(collection(db, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Get the first matching document
          const userData = userDoc.data();
          setUserName(userData.name || ""); // Set the name or empty string
        } else {
          console.error('No user found with that email');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
  
    const fetchScoresData = async () => {
      try {
        const userScoresCollection = collection(db, 'userScores');
        const q = query(userScoresCollection, where('email', '==', user.email)); // Query scores for the logged-in user
        const querySnapshot = await getDocs(q);
  
        const data = [];
  
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            timestamp: new Date(docData.timestamp.seconds * 1000), // Convert Firestore timestamp to JavaScript Date
            score: docData.score,
            survey: docData.survey // Add the survey field
          });
        });
  
        // Sort the data based on timestamps (ascending order)
        data.sort((a, b) => a.timestamp - b.timestamp);
  
        // Separate the sorted data into labels (timestamps with date and time), scores, and surveys
        const labels = data.map(item => formatDate(item.timestamp));
        const scores = data.map(item => item.score);
        const surveys = data.map(item => item.survey); // Store survey types
  
        setScoresData({ labels, scores, surveys }); // Update state with sorted timestamps, scores, and surveys
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchUserName();
    fetchScoresData();
  }, [user.email]);
  

  // Function to format timestamp to date and time
  const formatDate = (timestamp) => {
    const dateOptions = { day: '2-digit', month: 'numeric', year: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
    const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);

    const formattedDate = dateFormatter.format(timestamp);
    const formattedTime = timeFormatter.format(timestamp);

    return `${formattedDate} ${formattedTime}`;
  };

  const data = {
    labels: scoresData.labels, // X-axis: timestamps with date and time
    datasets: [
      {
        label: 'Mental Health Score',
        data: scoresData.scores, // Y-axis: scores
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)', 
        borderColor: 'rgba(75,192,192,1)', 
        pointBackgroundColor: 'rgba(75,192,192,1)', 
        pointBorderColor: '#fff', 
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time and Date', // Label for X-axis
          color: '#000',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#000',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Score (%)', // Label for Y-axis
          color: '#000',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100,
        ticks: {
          color: '#000',
          callback: function(value) {
            return `${value}%`;
          },
        },
        grid: {
          color: '#e5e5e5',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const surveyType = scoresData.surveys[context.dataIndex]; // Get the survey type
            return `Score: ${context.raw}% (${surveyType})`; // Display score and survey type
          },
          title: function(tooltipItems) {
            const datetime = tooltipItems[0].label.split(' ');
            return [datetime[0], datetime[1]]; // Separate date and time
          }
        },
      },
    },
  };

  return (
    <div>
      <Navbar />
      {/* Add padding to avoid overlap with navbar */}
      <div style={{ paddingTop: '80px' }}>
        {/* Display the user's name above the graph */}
        <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>
          {userName ? `${userName}'s Survey Report` : 'Survey Report'}
        </h2>

        <div className="graph-wrapper" style={{ marginTop: '0px' }}> {/* Remove space above graph */}
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
