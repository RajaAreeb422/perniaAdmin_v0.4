/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddCatPage from './AddCatPage';

function AddCatContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddCatPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default AddCatContainer;
