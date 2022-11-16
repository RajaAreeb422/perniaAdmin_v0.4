/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddCollectionPage from './AddCollectionPage';

export default function AddCollectionContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddCollectionPage {...props} />;
}


//export default AddOrderContainer;
