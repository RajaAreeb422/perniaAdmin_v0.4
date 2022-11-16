/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditCouponPage from './EditCouponPage';

function EditCouponContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <EditCouponPage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default EditCouponContainer;
