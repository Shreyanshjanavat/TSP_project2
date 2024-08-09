import React, { useState } from 'react';

const Newpassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/passwordupdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }), // Replace with the actual data you need to send
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);

      setMessage('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error updating password');
    }
    localStorage.removeItem('fog');
  };

  return (
    <div>
      <h2>Password Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Newpassword;
