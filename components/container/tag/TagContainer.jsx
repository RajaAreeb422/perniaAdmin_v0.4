/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import TagPage from './TagPage';

function TagContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout
  };
  //Takes to Product page in the same folder..
  return <TagPage {...props} />;
}

// PostsContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };


export default TagContainer;
