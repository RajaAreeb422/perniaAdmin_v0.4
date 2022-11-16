import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddTagContainer from '../../components/container/addTag/addTagContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddTag extends React.Component {
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
          title="Tags | "
          description="All Tags."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Tags"
        >
          {/* Takes ProductContainer component in component folder */}
          <AddTagContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddTag;
