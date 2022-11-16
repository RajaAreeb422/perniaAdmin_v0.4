import React from 'react';

import MainLayout from '../../../layout/MainLayout';
import EditShip from './EditShip.jsx'
import HeadDefault from '../../../layout/head/HeadDefault';

class Index extends React.Component {
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
          title="Edit Shipper"
          description="Update Shipper."
        />
          <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Shippers"
          >
             {/* Takes to EditShip component in the same/current folder */}
          <EditShip  />
        </MainLayout>
      </>
    );
  }
}

export default Index;
