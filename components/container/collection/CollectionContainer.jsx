/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import CollectionPage from './CollectionPage';

function CollectionContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout
  };

  return <CollectionPage {...props} />;
}

// PostsContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };


export default CollectionContainer;
