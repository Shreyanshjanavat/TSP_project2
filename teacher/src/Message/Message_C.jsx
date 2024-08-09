import React, { useState } from 'react';
import './Message_C.css';

const Message_C = () => {
  const [message, setMessage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [feedback, setFeedback] = useState('');
  const [students, setStudents] = useState([]); // Add students state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedClass === '' || message === '') {
      alert('Please select a class and write a message.');
      return;
    }

    try {
      // Get students for the selected class
      const response = await fetch(`http://localhost:5000/classdata/?classNumber=${selectedClass}`);
      const studentsData = await response.json();
      setStudents(studentsData);

      // Send message to each student
      studentsData.forEach((student) => {
        const phoneNumber = student.Phoneno; // Use the correct property name
        const studentMessage = `Class ${selectedClass}: ${message}`;
        alert(phoneNumber)
        // Send request to backend API to send SMS
        fetch('http://localhost:5000/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: phoneNumber,
            message: studentMessage,
          }),
        })
       .then((response) => response.json())
       .then((data) => {
          if (data.success) {
            console.log(`SMS sent to ${phoneNumber}: ${data.messageSid}`);
          } else {
            console.log(`Error sending SMS to ${phoneNumber}: ${data.error}`);
          }
        })
       .catch((error) => {
          console.error(`Error sending SMS to ${phoneNumber}: ${error}`);
          setFeedback(`Error sending message to ${phoneNumber}: ${error.message}`);
        });
      });

      setFeedback('Message sent to all students in the selected class!');
    } catch (error) {
      console.error('Error in sending message:', error);
      setFeedback('There was an error sending the message.');
    }

    // Clear the form after submission
    setSelectedClass('');
    setMessage('');
  };

  return (
    <div className="message-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select a class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Message_C;