import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { useState,useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import VehicleContainer from '../../components/container/vehicle/VehicleContainer';

import HeadDefault from '../../layout/head/HeadDefault';
import fetch from 'isomorphic-unfetch'
 
// using CommonJS modules


class Vehicle extends React.Component {
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
      
        <HeadDefault
          title="Categories "
          description="Our Categories"
        />
        <MainLayout
          dispatch={dispatch}
          storeLayout={storeLayout}
          activeLink="Vehicles"
        >
           
          <VehicleContainer dispatch={dispatch} storeLayout={storeLayout}  />
        </MainLayout>
      </>
    );
  }
}

export default connect(state => state)(Vehicle);

