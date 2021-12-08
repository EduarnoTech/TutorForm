import React from 'react';
import './registrationForm.css';
import logo from '../assets/ok.gif'

const SuccessAlert = () => {
  return (
     <div className='main_container' style={{height: '1000px'}}>
      <div className='main'>
        <div className='container'>
            <div className='appointment-form'>
          <img
            src={logo}
            alt='loading...'
            className='oklogo'
          />
          <h2>Thank you</h2>
          <h3 className='success_text'>You have submitted the details successfully. We will get back to you soon.</h3>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
