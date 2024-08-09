import React, { useEffect, useState } from 'react';
import './Chatbox.css';
import { useParams } from 'react-router-dom';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const { id } = useParams(); // Get the teacher ID from the URL parameters
 
  
  const [formData, setFormData] = useState({
    Student_id: `${localStorage.getItem('id')}`,
    Teacher_id: `${id}`,
    Message: "",
    
    
    
  });

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/t_data?id=${id}`);
        const data = await response.json();
        setTeacherName(data[0].name);
        setSubject(data[0].subject);
      } catch (error) {
        console.error('Error fetching teacher info:', error);
      }
    };

    fetchTeacherInfo();
  }, [id]); // Dependency array to refetch if id changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatData = {
      Student_id: formData.Student_id,
      Teacher_id: formData.Teacher_id,
      Message: message,
      Reply:false,
      Replyid:0
    };

    try {
      const response = await fetch('http://localhost:5000/chatdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatData)
      });

      const result = await response.json();
      if (result.success) {
        console.log('Message submitted:', message);
        setMessage(''); // Clear the textarea after submission
      } else {
        console.error('Error submitting message:', result.error);
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <div className="teacher-page-container">
      <form onSubmit={handleSubmit}>
        <div className="teacher-info">
          <h2>{teacherName}</h2>
          <p>Subject: {subject}</p>
        </div>
        <div className="message-container">
          <textarea
            value={message}
            onChange={handleTextareaChange}
            placeholder="Type your message or note here..."
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
