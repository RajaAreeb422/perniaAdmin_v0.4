/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditCollectionPage from './EditCollectionPage';

export default function EditCollectionContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <EditCollectionPage {...props} />;
}


//export default AddOrderContainer;
