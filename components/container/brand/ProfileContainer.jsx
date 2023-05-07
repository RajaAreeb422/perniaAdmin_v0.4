/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import ProfilePage from './profilePage';

function ProfileContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <ProfilePage {...props} />;
}

// ProfileContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default ProfileContainer;
