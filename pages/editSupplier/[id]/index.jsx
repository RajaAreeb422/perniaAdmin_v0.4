import React from 'react';

import MainLayout from '../../../layout/MainLayout';
import EditData from './EditData.jsx'
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
          title="Edit Supplier"
          description="Update Supplier."
        />
         <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Suppliers"
         >
            {/* Takes to EditDataContainer component in the same/current folder */}
          <EditData  />
        </MainLayout>
      </>
    );
  }
}

export default Index;
