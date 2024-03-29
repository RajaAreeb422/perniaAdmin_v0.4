

import React from 'react';

import MainLayout from '../../layout/MainLayout';
import ProfileContainer from '../../components/container/brand/ProfileBContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Profile extends React.Component {
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
          title="Brand Profile"
          description="Brand Profile"
        />
        <MainLayout activeLink="brand profile">
          <ProfileContainer />
        </MainLayout>
      </>
    );
  }
}

export default Profile;
