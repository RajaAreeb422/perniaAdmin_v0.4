/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import ProfileBPage from './ProfileBPage';

function ProfileBContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <ProfileBPage {...props} />;
}

// ProfileContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default ProfileBContainer;
