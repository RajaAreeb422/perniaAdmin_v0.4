/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddTagPage from './addTagPage';

function AddTagContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout
  };
  //Takes to Product page in the same folder..
  return <AddTagPage {...props} />;
}

// PostsContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };


export default AddTagContainer;
