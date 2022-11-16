import React from 'react';
import MainLayout from '../../layout/MainLayout';
import AddOrderContainer from '../../components/container/addOrder/AddOrderContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddOrder extends React.Component {
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
          title="Creating a New Order"
          description="Order Creation."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Orders"
        >
           {/* Takes to AddOrderContainer component in the component folder */}
          <AddOrderContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddOrder;
