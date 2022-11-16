/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddCouponPage from './AddCouponPage';

export default function AddCouponContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddCouponPage {...props} />;
}


//export default AddOrderContainer;
