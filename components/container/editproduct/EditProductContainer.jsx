/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditProductPage from './EditProductPage';

function EditProductContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <EditProductPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default EditProductContainer;
