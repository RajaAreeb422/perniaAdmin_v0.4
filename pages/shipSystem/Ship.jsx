import React from 'react';

import MainLayout from '../../layout/MainLayout';
import Data from './Data';
import HeadDefault from '../../layout/head/HeadDefault';

class Ship extends React.Component {
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
          title="Shippers "
          description="Shipping System."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Shippers"
        >
           {/* Takes to Data component in the same folder */}
          <Data />
        </MainLayout>
      </>
    );
  }
}

export default Ship;
