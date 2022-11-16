/** npm packages */
import React from 'react';
// import propTypes from 'prop-types';

/** components */
import AddVehiclePage from './AddVehiclePage';

function AddVehicleContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  return <AddVehiclePage {...props} />;
}

// DashboardContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default AddVehicleContainer;
