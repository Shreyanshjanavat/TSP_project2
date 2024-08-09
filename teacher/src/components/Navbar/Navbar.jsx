import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/images.png';
import { Link } from 'react-router-dom';
import listproduct_icon from '../../assets/Product_list_icon.svg';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teacherdata, setTeacherData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('key');
    window.location.replace('/');
    localStorage.removeItem('userChoice');
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const id = localStorage.getItem('id'); // Assuming id is stored in localStorage
      if (id) {
        try {
          const response = await fetch(`http://localhost:5000/t_data?id=${id}`);
          const data = await response.json();
          setTeacherData(data);
        } catch (error) {
          console.error('Error fetching teacher data:', error);
        }
      }
    };
    fetchInfo();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='navbar'>
      <div className="navbar-item">
        <img src={logo} alt="Logo" className="logo" onClick={handleSidebarToggle} />
      </div>
      <div className="navbar-item profile">
        {teacherdata.map((product, index) => (
          <div key={index} className='list-format-main listproduct-format'>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
      <div className="navbar-item logout">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className='Sidebar-item' onClick={handleSidebarToggle}>
          <p className='cross-icon'>X</p>
        </div>
        
        <Link to='/listproduct' className='Sidebar-item' onClick={handleSidebarToggle}>
          <p>Show Student</p>
        </Link>
        <Link to='/createform' className='Sidebar-item' onClick={handleSidebarToggle}>
          <p>Create Test</p>
        </Link>
        <Link to='/message_c' className='Sidebar-item' onClick={handleSidebarToggle}>
          <p>Message</p>
        </Link>
        <Link to='/teacherchatbox' className='Sidebar-item' onClick={handleSidebarToggle}>
          <p>Student Messages</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
