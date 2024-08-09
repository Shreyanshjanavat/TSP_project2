import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ReceivedMessage.css';
import { Link } from 'react-router-dom';
const ReceivedMessage = () => {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [replyId, setReplyId] = useState(null);
  const [preMessage, setPreMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/teachchat?Teacher_id=${id}`);
        const data = await response.json();

        if (data && data.length > 0) {
          const lastMessage = data[data.length - 1];
          setMessage(lastMessage.Message);
          setReplyId(lastMessage.Replyid);
          setDate(new Date(lastMessage.Date).toLocaleDateString());
          
          if (lastMessage.Replyid !== 0) {
            const replyResponse = await fetch(`http://localhost:5000/chatbyid?id=${lastMessage.Replyid}`);
            const replyData = await replyResponse.json();
            if (replyData && replyData.length > 0) {
              setPreMessage(replyData[replyData.length - 1].Message);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching message details:', error);
      }
    };

    fetchMessageDetails();
  }, [id]);

  return (
    <div className="message-details-container">
      <div className="message-header">
      <h2>Replied Message</h2>
      <p>Date: {date}</p>
       
        {preMessage && <p>Previous Message: {preMessage}</p>}

      </div>
      <div className="message-content">
        <p>{message}</p>
        <Link to={`/allreplies/${id}`} >All replies</Link>
      </div>
    </div>
  );
};

export default ReceivedMessage;
