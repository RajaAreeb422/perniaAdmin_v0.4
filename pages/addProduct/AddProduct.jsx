import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddProductContainer from '../../components/container/addProduct/AddProductContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddProduct extends React.Component {
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
          title="Adding the new Product"
          description="Adding Product in the List."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="products"
        >
           {/* Takes to AddproductContainer component in the component folder */}
          <AddProductContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddProduct;
