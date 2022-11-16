import React from 'react';

import MainLayout from '../../../layout/MainLayout';

import EditUserContainer from '../../../components/container/editUser/EditUserContainer';
import HeadDefault from '../../../layout/head/HeadDefault';

class EditUser extends React.Component {
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
          title="Edit User"
          description="Update User."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Users"
        >
           {/* Takes to EditUserContainer component in the component folder */}
          <EditUserContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default EditUser;
