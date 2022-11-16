import React from 'react';

import MainLayout from '../../../layout/MainLayout';
import EditCatContainer from '../../../components/container/editCat/EditCatContainer';
import HeadDefault from '../../../layout/head/HeadDefault';

class EditCat extends React.Component {
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
          title="Edit Category"
          description="Update Category."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="categories"
        >
           {/* Takes to EditCatContainer component in the component folder */}
          <EditCatContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditCat;
