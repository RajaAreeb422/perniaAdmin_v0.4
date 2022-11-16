import React from 'react';

import MainLayout from '../../../layout/MainLayout';

import EditProductContainer from '../../../components/container/editproduct/EditProductContainer';
import HeadDefault from '../../../layout/head/HeadDefault';

class EditProduct extends React.Component {
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
          title="Edit Product"
          description="Update Product."
        />

        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="products"
         >
            {/* Takes to EditProductContainer component in the component folder */}
          <EditProductContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditProduct;
