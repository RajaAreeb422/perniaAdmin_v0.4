import React from 'react';

import MainLayout from '../../layout/MainLayout';
import AddUserContainer from '../../components/container/addUser/addUserContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class AddUser extends React.Component {
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
          title="New User "
          description="Adding the New User in the list."
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Users"
        >
           {/* Takes to AddUserContainer component in the component folder */}
          <AddUserContainer dispatch={dispatch} storeLayout={storeLayout} />
        </MainLayout>
      </>
    );
  }
}

export default AddUser;
