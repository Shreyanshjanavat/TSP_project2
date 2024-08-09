import React, { useEffect, useState } from 'react';
import './TeacherChatbox.css';
import {Link} from 'react-router-dom'

const TeacherChatbox = () => {
  const [classstu, setClass] = useState('');
  const [messages, setMessages] = useState([]);
  const [studentid, setStudentId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const id = localStorage.getItem('id');
      try {
        const response = await fetch(`http://localhost:5000/studentchat?Teacher_id=${id}`);
        const data = await response.json();
        setMessages(data);
        if (data && data.length > 0 ) {
          setStudentId(data[data.length-1].Student_id);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!studentid) return;
      try {
        const response = await fetch(`http://localhost:5000/studentinfo?id=${studentid}`);
       
        const data = await response.json();
        setName(data[0].name);
       
        setClass(data[0].classNumber);
      } catch (error) {
        console.error('Error fetching student info:', error);
      }
    };

    fetchStudentInfo();
  }, [studentid]);

  return (
    <div className="messages-page-container">
      <h2>Messages</h2>
      <ul className="messages-list">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <li key={index} className="message-item">
               <p><strong>Date:</strong> {message.Date}</p>
              <p><strong>From:</strong> {name}</p>
              <p><strong>Class:</strong> {classstu}</p>
              <Link to={`/openmessage/${message.id}`} >Open Message</Link>
              {/* <p><strong>Message:</strong> {message.Message}</p> */}
              {/* <p><strong>Student ID:</strong> {message.Student_id}</p> */}
            </li>
          ))
        ) : (
          <li>No messages found.</li>
        )}
      </ul>
    </div>
  );
};

export default TeacherChatbox;
