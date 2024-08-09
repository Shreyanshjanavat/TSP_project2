import React, { useState, useRef } from 'react';
import firebase from './firebase'; // Ensure './firebase' correctly points to your Firebase configuration

const OTPForm = () => {
  const [phonenumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const recaptchaRef = useRef(null);

  const handleSendOtp = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
    }
    const verifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible', // Specify size if needed
      callback: function (response) {
        // Callback function if needed
      },
      defaultCountry: 'IN' // Specify default country code
    });

    firebase.auth().signInWithPhoneNumber(phonenumber, verifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setMessage('OTP sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending OTP', error);
        setMessage('Error sending OTP');
      });
  };

  const handleVerifyOtp = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    firebase.auth().signInWithCredential(credential)
      .then((result) => {
        setMessage('OTP verified successfully!');
        // Redirect to new password page
        window.location.replace('/newpassword');
      })
      .catch((error) => {
        console.error('Error verifying OTP', error);
        setMessage('Error verifying OTP');
      });
  };

  return (
    <div>
      <h1>Phone OTP Authentication</h1>
      <div ref={recaptchaRef}>
        <input
          type='tel'
          placeholder='+91 1234567890'
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOtp}>Send OTP</button>
      </div>
      <div>
        <input
          type='text'
          placeholder='Enter OTP'
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button onClick={handleVerifyOtp}>Verify OTP</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPForm;
