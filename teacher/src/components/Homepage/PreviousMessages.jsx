// PreviousMessages.js
import React, { useEffect, useState } from 'react';
import './PreviousMessages.css';

function PreviousMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const classNumber = localStorage.getItem('classNumber');

    const fetchAllMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/message_data?ClassNumber=${classNumber}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setMessages(data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching all messages:', error);
        setMessages([]);
      }
    };

    fetchAllMessages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date to display only the date part
  };

  return (
    <div className="container">
      <h2>All Messages</h2>
      <ul className="message-list">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <li key={index} className="message-item">
              {formatDate(message.date)} - {message.Message}
            </li>
          ))
        ) : (
          <li>No messages found.</li>
        )}
      </ul>
    </div>
  );
}

export default PreviousMessages;
