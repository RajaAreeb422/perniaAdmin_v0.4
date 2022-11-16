import React from 'react';

import MainLayout from '../../layout/MainLayout';
import OrderContainer from '../../components/container/order/OrderContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Order extends React.Component {
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
          title="Orders | "
          description="All Orders."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Orders"
        >
          {/* Takes OrderContainer component in component folder */}
          <OrderContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default Order;
