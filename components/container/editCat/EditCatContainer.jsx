/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditCatPage from './EditCatPage';

function EditCatContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <EditCatPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default EditCatContainer;
