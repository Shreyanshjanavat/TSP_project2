import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Admin.css'

import Navbar from '../components/Navbar/Navbar';
import Listproduct from '../components/Studentdetails/Listproduct';
import Showstudents from '../components/Studentdetails/Showstudents';
import CreateForm from '../Createtest/CreateForm';
import Testinput from '../Createtest/Testinput';
import Message_C from '../Message/Message_C';
import OTPForm from '../components/ForgetPassword/OTPForm';
import TestResult from '../components/Testresult/TestResult'
import TeacherChatbox from '../components/Chatbox/TeacherChatbox';
import OpenMessage from '../components/Chatbox/OpenMessage';

const Admin = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Check user choice from localStorage


  return (
    <div>
      <Navbar />
      
      {/* Conditional rendering based on userChoice */}
  

      {/* Define routes for various components */}
      <Routes>
        {/* <Route path='/admin1' element={<Admin1 />} /> */}
       
        <Route path='/listproduct' element={<Listproduct />} />
        <Route path='/forgetpassword' element={<OTPForm />} />
        <Route path='/teacherchatbox' element={<TeacherChatbox />} />
        <Route path='/message_c' element={<Message_C />} />
        <Route path='/testinput/:className/:totalMarks/:subject' element={<Testinput index={selectedIndex} />} />
        <Route path='/createform' element={<CreateForm />} />
        <Route path='/openmessage/:id' element={<OpenMessage />} />
        <Route path='/showstudent/:index' element={<Showstudents index={selectedIndex} />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default Admin;
