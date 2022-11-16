/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import OrderPage from './OrderPage';

function OrderContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
   
  };

  //Takes to OrderPage Component in the same folder
  return <OrderPage {...props} />;
}




export default OrderContainer;
