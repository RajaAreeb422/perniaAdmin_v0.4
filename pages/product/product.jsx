import React from 'react';

import MainLayout from '../../layout/MainLayout';
import ProductContainer from '../../components/container/product/ProductContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Product extends React.Component {
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
          title="Products | "
          description="All Products."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="products"
        >
          {/* Takes ProductContainer component in component folder */}
          <ProductContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default Product;
