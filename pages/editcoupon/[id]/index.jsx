import React from 'react';

import MainLayout from '../../../layout/MainLayout';

import EditCouponContainer from '../../../components/container/editcoupon/EditCouponContainer';
import HeadDefault from '../../../layout/head/HeadDefault';

class EditCoupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false };
  }

  static async getInitialProps(props) {
    const { store, isServer, req, res } = props.ctx;
  }

  

  render() {
    const { dispatch, storeLayout} = this.props;
    return (
      <>
        <HeadDefault
          title="Edit Coupon"
          description="Update Coupon."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Coupons"
        >
           {/* Takes to EditCouponContainer component in the component folder */}
          <EditCouponContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditCoupon;
