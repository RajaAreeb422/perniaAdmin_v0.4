import React from 'react';

import MainLayout from '../../../layout/MainLayout';

import HeadDefault from '../../../layout/head/HeadDefault';
import EditTagContainer from '../../../components/container/editTag/EditTagContainer';

class EditTag extends React.Component {
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
          description="Edit Tag."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Tags"
        >
          {/* Takes ProductContainer component in component folder */}
          <EditTagContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditTag;
