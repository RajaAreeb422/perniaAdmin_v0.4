/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

import UsersPage from './UsersPage';
/** components */



function UsersContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  // Takes to User Page Component in the same folder
  return <UsersPage {...props} />;
}



export default UsersContainer;
