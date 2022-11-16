/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddProductPage from './AddProductPage';

function AddProductContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddProductPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default AddProductContainer;
