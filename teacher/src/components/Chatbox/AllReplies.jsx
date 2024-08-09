import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AllReplies.css';

const AllReplies = () => {
  const { id } = useParams();
  const [replies, setReplies] = useState([]);
  const [preMessages, setPreMessages] = useState({});

  useEffect(() => {
    const fetchAllReplies = async () => {
      try {
        const response = await fetch(`http://localhost:5000/teachchat?Teacher_id=${id}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setReplies(data);
          fetchPreMessages(data);
        } else {
          alert('No replies found.');
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
        alert('Error fetching data');
      }
    };

    const fetchPreMessages = async (replies) => {
      try {
        const preMessages = {};
        for (const reply of replies) {
          if (reply.Replyid !== 0) {
            const response = await fetch(`http://localhost:5000/chatbyid?id=${reply.Replyid}`);
            const data = await response.json();
            if (data && data.length > 0) {
              preMessages[reply.Replyid] = data[0].Message;
            }
          }
        }
        setPreMessages(preMessages);
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchAllReplies();
  }, [id]);

  return (
    <div className='maincontaior'> 
    <div className="all-replies-container">
      <h1>All Replies</h1>
      <div className="replies-list">
        {replies.map((reply, index) => (
          <div key={index} className="reply-item">
            <div className="reply-header">
              <p><strong>Date:</strong> {new Date(reply.Date).toLocaleDateString()}</p>
              {preMessages[reply.Replyid] && (
                <p className="pre-message"><strong>Previous Message:</strong> {preMessages[reply.Replyid]}</p>
              )}
            </div>
            <div className="reply-content">
              <p><strong>Reply:</strong> {reply.Message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllReplies;
