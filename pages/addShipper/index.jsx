import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddShipper from './AddShipper.jsx'
import HeadDefault from '../../layout/head/HeadDefault';
import "./addship.scss";
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
          title="Adding a new Shipper"
          description=" Adding New Shipper in the List"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Shippers"
        >
           {/* Takes to AddShipper component in the same/current folder */}
          <AddShipper/>
        </MainLayout>
      </>
    );
  }
}

export default Index;
