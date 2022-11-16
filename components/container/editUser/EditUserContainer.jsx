/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditUserPage from './EditUserPage';

function EditUserContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <EditUserPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default EditUserContainer;
