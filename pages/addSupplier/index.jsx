import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddSupplier from './AddSupplier.jsx'
import HeadDefault from '../../layout/head/HeadDefault';
import "./addsupp.scss";
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
          title="New Supplier "
          description="Adding the New Supplier."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Suppliers"
        >
           {/* Takes to AddSupplier component in the same/current folder */}
          <AddSupplier/>
        </MainLayout>
      </>
    );
  }
}

export default Index;
