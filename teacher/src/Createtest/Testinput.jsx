import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Testinput.css';

const Testinput = () => {
  const { className, totalMarks, subject } = useParams();
  const [testdata, setTestdata] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [productDetails, setProductDetails] = useState({
    subject: subject,
    className: className,
    totalMarks: totalMarks,
  });

  const fetchInfo = async (className) => {
    try {
      const response = await fetch(`http://localhost:5000/classdata?classNumber=${className}`);
      const data = await response.json();
      alert(data);
      if (Array.isArray(data)) {
        setTestdata(data);
      } else {
        console.error("Data fetched is not an array:", data);
        setTestdata([]);
      }
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  useEffect(() => {
    fetchInfo(className);
  }, [className]);

  const handleChange = (e, id) => {
    const { value } = e.target;
    if (value > totalMarks) {
      alert("You have entered a wrong value");
    } else {
      setInputValues((prevValues) => ({ ...prevValues, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const testDataArray = testdata.map(student => ({
      id: student.id,
      marks: inputValues[student.id] || 0,
      name: student.name,
      phoneNumber: student.Phoneno // Assuming your student data has a phoneNumber field
    }));

    const dataToSend = {
      subject: productDetails.subject,
      classNumber: productDetails.className,
      totalMarks: productDetails.totalMarks,
      testData: testDataArray,
    };

    try {
      const response = await fetch(`http://localhost:5000/testdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error in submitting data", error);
    }

    // Send SMS to each student
    testDataArray.forEach(async (student) => {
      const message = `Hello ${student.name}, you have scored ${student.marks} out of ${totalMarks} in ${subject}.`;
      try {
        const response = await axios.post('http://localhost:5000/send-sms', { 
          to: student.Phoneno, 
          message 
        });
        console.log(`SMS sent successfully to ${student.name}:`, response.data);
      } catch (error) {
        console.error(`Error sending SMS to ${student.name}:`, error);
      }
    });
  };

  return (
    <div className='student-container'>
      <div className="list-product">
        <h2>All Student List of {className}</h2>
        <form onSubmit={handleSubmit}>
          <div className="list-format-main">
            <p>Student Name</p>
            <p>Roll No</p>
            <p>Total Marks</p>
            <p>Marks</p>
          </div>
          <div className="listproduct-allproduct">
            <hr />
            {testdata.map((product) => (
              <div key={product.id} className='list-format-main listproduct-format'>
                <p>{product.name}</p>
                <p>{product.RollNo}</p>
                <p>{totalMarks}</p>
                <input
                  type='text'
                  name='marks'
                  value={inputValues[product.id] || ''}
                  onChange={(e) => handleChange(e, product.id)}
                />
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Testinput;
