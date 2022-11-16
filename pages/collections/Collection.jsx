import React from 'react';

import MainLayout from '../../layout/MainLayout';
import CollectionContainer from '../../components/container/collection/CollectionContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Collection extends React.Component {
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
          title="Collections"
          description="Collections"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Collections"
        >
           {/* Takes to CouponContainer component in the component folder */}
          <CollectionContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default Collection;
