import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { useState,useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';

import UsersContainer from '../../components/container/Users/UsersContainer';
import HeadDefault from '../../layout/head/HeadDefault';
import fetch from 'isomorphic-unfetch'
 

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false,data:[] };
  }

  static async getInitialProps(props) {

    const { store, isServer, req, res } = props.ctx;
  }

  render() {
    const { dispatch, storeLayout, state:data } = this.props;

    return (
      <>
      {console.log(this.state.data)}
        <HeadDefault
          title="Users "
          description="Users List"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Users"
        >
          {/* Takes UserContainer component in component folder */}
          <UsersContainer dispatch={dispatch} storeLayout={storeLayout}  />
        </MainLayout>
      </>
    );
  }
}

export default connect(state => state)(Users);



