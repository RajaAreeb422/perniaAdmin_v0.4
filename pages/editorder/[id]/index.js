import React from 'react';

import MainLayout from '../../../layout/MainLayout';

import EditOrderContainer from '../../../components/container/editorder/EditOrderContainer';
import HeadDefault from '../../../layout/head/HeadDefault';

class EditOrder extends React.Component {
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
          title="Edit Order"
          description="Update Order."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Orders"
        >
           {/* Takes to EditOrderContainer component in the component folder */}
          <EditOrderContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditOrder;
