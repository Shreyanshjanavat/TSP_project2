import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OpenMessage.css'

const OpenMessage = () => {
  const [message, setMessage] = useState('');
  const [Teacher_id, setTeacher_id] = useState();
  const [Student_id, setStudent_id] = useState();
  const [reply, setReply] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/chatbyid?id=${id}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setMessage(data[data.length - 1].Message);
          setTeacher_id(data[data.length - 1].Teacher_id);
          setStudent_id(data[data.length - 1].Student_id);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    const replychat = {
      Student_id: Student_id,
      Teacher_id: Teacher_id,
      Message: reply,
      Reply:true,
      Replyid:id
    };

    try {
      const response = await fetch('http://localhost:5000/chatdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replychat),
      });

      if (response.ok) {
        console.log('Reply sent successfully');
      } else {
        console.error('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="message-container">
      <div className="message">
      Message:  {message}
      </div>
      <p>Reply:</p>
      <textarea
        className="message-input"
        placeholder="Type your response here..."
        value={reply}
        onChange={handleReplyChange}
      ></textarea>
      <button className="reply-button" onClick={handleReplySubmit}>Send Reply</button>
    </div>
  );
};

export default OpenMessage;
