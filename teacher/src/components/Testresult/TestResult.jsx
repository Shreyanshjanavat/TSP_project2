import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TestResult.css';

// Utility function to calculate percentage gain
function calculatePercentGain(totalMarks, obtainedMarks) {
  return (obtainedMarks / totalMarks) * 100;
}

function TestResult() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [classNumber, setClassNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const RollNo = localStorage.getItem('user');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');


  // Fetch student data by RollNo
  const fetchStudentData = async (RollNo) => {
    try {
      const response = await fetch(`http://localhost:5000/studentdata?RollNo=${RollNo}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length > 0) {
        setTo(data[0].Phoneno);
        setId(data[0].id);
        setClassNumber(data[0].classNumber);
      } else {
        throw new Error('No student data found');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false); // Set loading to false on error
    }
  };

  // Fetch test data by classNumber
  const fetchTestData = async (classNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/testdata1?classNumber=${classNumber}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setData(data);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Ensure loading is set to false in the finally block
    }
  };

  useEffect(() => {
    if (RollNo) {
      fetchStudentData(RollNo);
    }
  }, [RollNo]);

  useEffect(() => {
    if (classNumber !== null) {
      fetchTestData(classNumber);
    }
  }, [classNumber]);

  useEffect(() => {
    if (id && data.length > 0) {
      // Construct the message here
      let messageBody = 'Your child\'s exam results:\n';
      data.forEach(product => {
        const studentTestData = product.Testdata && product.Testdata.find(test => test.id === id);
        const obtainedMarks = studentTestData ? studentTestData.marks : 0;
        const percentage = studentTestData ? calculatePercentGain(product.Totalmarks, obtainedMarks) : 0;
        messageBody += `${product.Subject}: ${obtainedMarks}/${product.Totalmarks} (${percentage.toFixed(2)}%)\n`;
      });
      setMessage(messageBody);
    }
  }, [id, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="appa">
      <header className="appa-header">
        <h1>Marks Table</h1>
        <div className="list-format-main">
          <p>Date:</p>
          <p>Subject:</p>
          <p>Total Marks:</p>
          <p>Obtained Marks:</p>
          <p>Percentage Gain:</p>
        </div>
        <div className="grid-container">
          {data.map((product, index) => {
            const studentTestData = product.Testdata && product.Testdata.find(test => test.id === id);
            const obtainedMarks = studentTestData ? studentTestData.marks : 0;
            const percentage = studentTestData ? calculatePercentGain(product.Totalmarks, obtainedMarks) : 0;

            return (
              <div key={index} className={`list-format-main listproduct-format ${percentage < 33 ? 'low-percentage' : 'low-percent1'} `}>
               <p>{product.date}</p>
                <p>{product.Subject}</p>
                <p>{product.Totalmarks}</p>
                <p>{obtainedMarks}</p>
                <p>{percentage.toFixed(2)}%</p>
              </div>
            );
          })}
        </div>
        {/* <button onClick={sendSms}>Send SMS</button> */}
        {response && (
          <div>
            <h3>Response</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default TestResult;
