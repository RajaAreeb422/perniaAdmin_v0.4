/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import EditTagPage from './EditTagPage';

function EditTagContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout
  };
  //Takes to Product page in the same folder..
  return <EditTagPage {...props} />;
}



export default EditTagContainer;
