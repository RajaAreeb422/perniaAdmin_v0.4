/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import ProductPage from './ProductPage';

function ProductContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout
  };
  //Takes to Product page in the same folder..
  return <ProductPage {...props} />;
}

// PostsContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };


export default ProductContainer;
