import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddCollectionContainer from '../../components/container/addCollection/AddCollectionContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddCollection extends React.Component {
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
          title="Add Collection"
          description="Adding New Collection"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Collections"
        >
           {/* Takes to AddCouponContainer component in the component folder */}
          <AddCollectionContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddCollection;
