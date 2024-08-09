import React, { useEffect, useState } from 'react';
import './Homepage.css';

function Homepage() {
  const [message, setMessage] = useState('');
  const [fee, setFee] = useState('');
  const [previousMessage, setPreviousMessage] = useState('');
  const [name,setname]=useState('');
  const [date,setdate]=useState('');
  const [duedate,setduedate]=useState('');

  useEffect(() => {
    const classNumber = localStorage.getItem('classNumber');
    const RollNo=localStorage.getItem('user');

    const fetchLastMessage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/message_data?ClassNumber=${classNumber}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          setMessage(data[data.length - 1].Message);
          if (data.length > 1) {
            setPreviousMessage(data[data.length - 1].Message);
            setdate(data[data.length - 1].date);
          }
        } else {
          setMessage('No messages found.');
        }
      } catch (error) {
        console.error('Error fetching the last message:', error);
        setMessage('Error fetching the last message.');
      }
    };
    const fetchname=async()=>{
      try {
        const response = await fetch(`http://localhost:5000/studentdata?RollNo=${RollNo}`);
        const data = await response.json();
        setname(data[0].name);
        
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
    const fetchFee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/feedata?ClassNumber=${classNumber}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          setFee(data[data.length-1].Fee);
          setduedate(data[data.length-1].Duedate)
        } else {
          setFee('No fee found.');
        }
      } catch (error) {
        console.error('Error fetching the fee:', error);
        setFee('Error fetching the fee.');
      }
    };
   

    fetchLastMessage();
    fetchFee();
    fetchname();

  }, []);

  return (
    <div className="container">
      <div className="message-box">
     Date: {date}
        <p>Latest Message: -</p>
        <p>{message}</p>
        {previousMessage && (
          <p>
            <a href="/previousmessages" >
              Previous Message
            </a>
          </p>
        )}
      </div>
      <div className="fee-box">
        <p>Fee Notice:</p>
        <p>Hello {name},your  fees for class {localStorage.getItem('classNumber')} is Amount: INR {fee}. Please pay it by due date {duedate}</p>
      </div>
    </div>
  );
}

export default Homepage;
