import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Survey from './components/Survey';
import Dashboard from './components/Dashboard';
import Question from './components/Question';
import Profile from './components/Profile';
import Feedback from './components/Feedback';
import Graph from './components/graph';
import Res from './components/Res';
import { UserProvider } from './components/context/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/question" element={<Question />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/Res" element={<Res />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
