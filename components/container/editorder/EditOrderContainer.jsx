/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditOrderPage from './EditOrderPage';

function EditOrderContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <EditOrderPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default EditOrderContainer;
