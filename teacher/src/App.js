import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Admin from './Pages/Admin';
import Adminstu from './Pages/Adminstu';
import Login from './components/Login/Login';
import ExamResult from './components/Examresult/Examresult';
import OTPForm from './components/ForgetPassword/OTPForm';

function App() {
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    // Check if userChoice is already saved in localStorage
    const savedChoice = localStorage.getItem('userChoice');
    if (savedChoice) {
      // If userChoice is saved, set choice based on it
      setChoice(savedChoice === 'teacher');
    }
  }, []);

  const handleUserChoice = (isTeacher) => {
    // Update choice state and save userChoice to localStorage
    setChoice(isTeacher);
    localStorage.setItem('userChoice', isTeacher ? 'teacher' : 'student');
  };

  const isAdminLoggedIn = () => {
    return localStorage.getItem('key') === '120';
  };

  const isStudentLoggedIn = () => {
    return localStorage.getItem('key') === '123';
  };

  // Render modal to select user type if choice is not made yet
  if (choice === null) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Who are you?</h2>
          <button onClick={() => handleUserChoice(true)}>Teacher</button>
          <button onClick={() => handleUserChoice(false)}>Student</button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      
      <div>
        
        
        {/* Render Admin or Adminstu or Login based on choice and localStorage */}
        {choice && isAdminLoggedIn() ? <Admin /> : null}
        {!choice && isStudentLoggedIn() ? <Adminstu /> : null}
        {/* Render Login if conditions are not met */}
        {!isAdminLoggedIn() && !isStudentLoggedIn() && <Login />}
      </div>
    </Router>
  );
}

export default App;
