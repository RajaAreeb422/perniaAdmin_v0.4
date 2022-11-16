/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddOrderPage from './AddOrderPage';

export default function AddOrderContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddOrderPage {...props} />;
}


//export default AddOrderContainer;
