import React from 'react';

import MainLayout from '../../layout/MainLayout';
import TagContainer from '../../components/container/tag/TagContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Tag extends React.Component {
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
          <TagContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default Tag;
