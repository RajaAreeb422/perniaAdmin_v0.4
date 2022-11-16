import React from 'react';
import { connect } from 'react-redux';
import SingleLayout from '../layout/SingleLayout';
import MainLayout from '../layout/MainLayout';
import LoginContainer from '../components/container/page/LoginContainer';
import HomeContainer from '../components/container/HomeContainer';
import HeadDefault from '../layout/head/HeadDefault';
import axios from 'axios';

class Index extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isScrolled: false,key:""};
    
  }

  //static async getInitialProps(props) {
    //const { store, isServer, req, res } = props.ctx;
  //}
  componentDidMount(){
      
    const config={
      headers:{
        Authorization:'Bearer'+localStorage.getItem('token')
      }
    }

      // axios.get(`http://localhost:4000/api/category`,config).then(
      //   res=>{
      //     console.log(res.data.data)
      //   }
      // ).catch(err=>console.log(err))
    this.state.key=localStorage.getItem("token");
   
    }


  render() {
    const { dispatch, storeLayout } = this.props;
   
    return (
      <>
     
        <HeadDefault
          title="Login "
          description="Admin Login"
        />
     
        
   
         <HomeContainer dispatch={dispatch} storeLayout={storeLayout}/>
       
      
      </>
    );
  }
}

export default connect(state => state)(Index);
