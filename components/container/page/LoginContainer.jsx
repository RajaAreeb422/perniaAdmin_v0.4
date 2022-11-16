/** npm packages */
import React, { useState, useEffect } from 'react';
// import propTypes from 'prop-types';

/** components */
import LoginPage from './LoginPage';
import { connect } from 'react-redux';

 function LoginContainer() {
  const [isOpen, setIsOpen] = useState('1');
  const toggle = e => setIsOpen(e);

  // const props = {
  //   dispatch,
  //   storeLayout,
  //   /* states */
  //   isOpen,
  //   toggle,
  // };

  


  return <LoginPage  />;
}

// LoginContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };


export default LoginContainer;
