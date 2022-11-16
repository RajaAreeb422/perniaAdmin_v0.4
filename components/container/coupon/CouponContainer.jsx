/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import CouponPage from './CouponPage';

function CouponContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout
  };

  return <CouponPage {...props} />;
}

// PostsContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };


export default CouponContainer;
