import React, { useState, useEffect } from 'react';
import './Nabarstu.css';
import logo from '../../assets/images.png';
import { Link } from 'react-router-dom';


const NavbarStu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const RollNo = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('key');
    window.location.replace('/');
    localStorage.removeItem('userChoice');
  };

  const fetchInfoWithParameter = async (RollNo) => {
    try {
      const response = await fetch(`http://localhost:5000/studentdata?RollNo=${RollNo}`);
      const data = await response.json();
      setStudentData(data);
      localStorage.setItem('classNumber', data[0].classNumber);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    if (RollNo) {
      fetchInfoWithParameter(RollNo);
    }
  }, [RollNo]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='navbar1'>
      <div className="navbar1-item">
        <img src={logo} alt="Logo" className="logo" onClick={handleSidebarToggle} />
      </div>
      <div className="navbar1-item profile">
        {studentData.map((product, index) => (
          <div key={index} className='list-format-main listproduct-format'>
            <p>{product.name}</p>
            <img src={product.image} alt={product.name} className='listproduct-image' />
          </div>
        ))}
      </div>
      <div className="navbar1-item logout">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-sidebar" onClick={handleSidebarToggle}>
            <p className="close-icon">X</p>
          </button>
        </div>
        <Link to='/homepage' className='sidebar-item1'>
          {/* <img src={listproduct_icon} alt="List Icon" /> */}
          <p>Home</p>
        </Link>
        <Link to='/examresult' className='sidebar-item1'>
          {/* <img src={listproduct_icon} alt="List Icon" /> */}
          <p>Exam Result</p>
        </Link>
        <Link to='/testresult' className='sidebar-item1'>
          {/* <img src={listproduct_icon} alt="List Icon" /> */}
          <p>Test Result</p>
        </Link>
        <Link to='/showteacher' className='sidebar-item1'>
          {/* <img src={listproduct_icon} alt="List Icon" /> */}
          <p>Send Message</p>
        </Link>
        <Link to='/forgetpassword' className='sidebar-item1'>
          {/* <img src={listproduct_icon} alt="List Icon" /> */}
          <p>Change Password</p>
        </Link>
        <Link to='/news' className='sidebar-item1'>
          {/* <img src={listproduct_icon} alt="List Icon" /> */}
          <p>News</p>
        </Link>
       
      </div>
    </div>
  );
};

export default NavbarStu;
