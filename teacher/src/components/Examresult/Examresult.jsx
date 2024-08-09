import React, { useState, useEffect } from 'react';
import './ExamResult.css';

const ExamResult = () => {
  const [examResults, setExamResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamResults = async () => {
      const RollNo = localStorage.getItem('user');
      try {
        const response = await fetch(`http://localhost:5000/examstudent?RollNo=${RollNo}`);
        const data = await response.json();
        setExamResults(data[data.length - 1]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exam results:', error);
        setLoading(false);
      }
    };

    fetchExamResults();
  }, []);

  const calculatePercentage = (subjects) => {
    const totalMarks = Object.values(subjects).reduce((total, marks) => total + marks, 0);
    const numberOfSubjects = Object.keys(subjects).length;
    return (totalMarks / (numberOfSubjects * 100)) * 100; // Assuming each subject is out of 100 marks
  };

  const getStatus = (percentage) => {
    return percentage >= 40 ? 'Pass' : 'Fail';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!examResults) {
    return <div>No exam results found.</div>;
  }

  const percentage = calculatePercentage(examResults.Subjects);
  const status = getStatus(percentage);

  return (
    <div className="exam-result">
      <h1>Exam Results</h1>
      <div className="marksheet">
        <div className="student-info">
          <p><strong>Name:</strong> {examResults.name}</p>
          <p><strong>Roll No:</strong> {examResults.RollNo}</p>
          <p><strong>Class:</strong> {examResults.class}</p>
        </div>
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(examResults.Subjects).map(([subject, marks]) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="result-info">
          <p><strong>Percentage:</strong> {percentage}%</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
