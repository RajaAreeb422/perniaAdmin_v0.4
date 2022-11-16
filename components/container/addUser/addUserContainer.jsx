/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddUserPage from './addUserPage';

function AddUserContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddUserPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default AddUserContainer;
