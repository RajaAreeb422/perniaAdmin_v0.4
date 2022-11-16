
import React from 'react';


import VehiclePage from './VehiclePage';

function VehicleContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  //Takes to Category Page in the same folder..
  return <VehiclePage {...props} />;
}

export default VehicleContainer;
