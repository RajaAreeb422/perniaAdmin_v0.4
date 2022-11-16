import React from 'react';

import MainLayout from '../../../layout/MainLayout';
import EditCollectionContainer from '../../../components/container/editCollection/EditCollectionContainer';
import HeadDefault from '../../../layout/head/HeadDefault';

class EditCollection extends React.Component {
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
          title="Edit Collection"
          description="Update Collection"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Collections"
        >
           {/* Takes to AddCouponContainer component in the component folder */}
          <EditCollectionContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditCollection;
