import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddCouponContainer from '../../components/container/addCoupon/AddCouponContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddCoupon extends React.Component {
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
          title="Add Coupon"
          description="Adding New Coupon"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Coupons"
        >
           {/* Takes to AddCouponContainer component in the component folder */}
          <AddCouponContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddCoupon;
