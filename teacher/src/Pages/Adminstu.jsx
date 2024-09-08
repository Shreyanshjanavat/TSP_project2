import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarStu from '../components/Navbarstu/Navbarstu';
import TestResult from '../components/Testresult/TestResult';
import Examresult from '../components/Examresult/Examresult';
import Homepage from '../components/Homepage/Homepage';
import PreviousMessages from '../components/Homepage/PreviousMessages';
import ReceivedMessage from '../components/Chatbox/ReceivedMessage'
import Showteacher from '../components/Chatbox/Showteacher';
import Chatbox from '../components/Chatbox/Chatbox';
import AllReplies from '../components/Chatbox/AllReplies';
import OTPForm from '../components/ForgetPassword/OTPForm';
import Newpassword from '../components/ForgetPassword/Newpassword'
import NewsComponent from '../components/Newscomponent/NewsComponent';

const Adminstu = () => {
  return (
    <div style={styles.container}>
      <NavbarStu />
      <Routes>
        <Route path='/previousmessages' element={<PreviousMessages />} />
        <Route path='/forgetpassword' element={<OTPForm />} />
        <Route path='/newpassword' element={<Newpassword />} />
        <Route path='/news' element={<NewsComponent />} />
        
        
        <Route path='/receivedmessages/:id' element={< ReceivedMessage />} />
        <Route path='/allreplies/:id' element={< AllReplies />} />
        <Route path='/showteacher' element={<Showteacher />} />
        <Route path='/testresult' element={<TestResult />} />
        <Route path='/examresult' element={<Examresult />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/chat/:id' element={<Chatbox />} />
      </Routes>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px', // Adjust as needed
    fontFamily: 'Arial, sans-serif', // Example font family
    backgroundColor: '#f0f0f0', // Example background color
    minHeight: '100vh', // Ensures the container expands to at least the full viewport height
  },
};

export default Adminstu;
