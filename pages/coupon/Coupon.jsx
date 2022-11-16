import React from 'react';

import MainLayout from '../../layout/MainLayout';
import CouponContainer from '../../components/container/coupon/CouponContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Coupon extends React.Component {
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
          title="Coupons"
          description="Coupons"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Coupons"
        >
           {/* Takes to CouponContainer component in the component folder */}
          <CouponContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default Coupon;
