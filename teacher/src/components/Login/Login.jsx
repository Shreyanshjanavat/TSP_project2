import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userChoice = localStorage.getItem('userChoice');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userChoice === 'teacher' ? 'http://localhost:5000/alldatateacher' : 'http://localhost:5000/alldata';
      const response = await fetch(endpoint);
      const data = await response.json();

      const user = data.find(
        (user) => 
          userChoice === 'teacher' 
            ? user.name === username && user.phoneno === password 
            : user.RollNo === username && user.Phoneno === password
      );

      if (user) {
        console.log('Login successful:', username);
        localStorage.setItem('user', username);
        if (userChoice === 'teacher') {
          localStorage.setItem('key', '120');
          localStorage.setItem('id', user.id);
          localStorage.setItem('phoneno', user.phoneno); // Store phoneno in local storage
          window.location.replace('/admin');
        } else {
          localStorage.setItem('key', '123');
          localStorage.setItem('id', user.id);
          window.location.replace('/homepage');
        }
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching login data');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{userChoice === 'teacher' ? 'Teacher Login' : 'Student Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        
      </div>
      
    </div>
  );
};

export default Login;
