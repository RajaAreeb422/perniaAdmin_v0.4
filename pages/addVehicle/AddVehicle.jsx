import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddVehicleContainer from '../../components/container/addVehicle/AddVehicleContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false };
  }

  static async getInitialProps(props) {
    const { store, isServer, req, res } = props.ctx;
  }

  render() {
    const { dispatch, storeLayout } = this.props;
    return (
      <>
        <HeadDefault
          title="Add Category"
          description="Adding in Category List"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Vehicles"
        >
           {/* Takes to AddCatContainer component in the component folder */}
          <AddVehicleContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddVehicle;
