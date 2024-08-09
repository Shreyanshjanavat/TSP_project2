import React, { useState, useEffect } from 'react';
import './Showteacher.css';
import { Link } from 'react-router-dom';

const Showteacher = () => {
  const [teachers, setteachers] = useState([]);

  const fetchinfowithparameter = async () => {
    try {
      const response = await fetch(`http://localhost:5000/alldatateacher`);
      const data = await response.json();
      setteachers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchinfowithparameter();
  }, []);

  return (
    <div className='student-container'>
      <div className="dist-product">
        <p>All Teachers List</p>
        <div className="lsitproduct-allproduct">
          <hr />
          {teachers.map((product, index) => (
            <div key={index} className='dist-format-main distproduct-format'>
              <img src={product.image} alt=" " className='distproduct-image' />
              <p>{product.name}</p>
              <p>{product.subject}</p>
              <Link to={`/chat/${product.id}`}>Send Message</Link>
            <Link to={`/receivedmessages/${product.id}`} >Received Message</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Showteacher;
