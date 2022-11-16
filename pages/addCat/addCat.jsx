import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddCatContainer from '../../components/container/addCat/AddCatContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddCat extends React.Component {
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
          title="Add Category"
          description="Adding in Category List"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="categories"
        >
           {/* Takes to AddCatContainer component in the component folder */}
          <AddCatContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddCat;
