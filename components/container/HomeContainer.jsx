/** npm packages */
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import React from 'react';
import { useState,useEffect } from 'react';
// import propTypes from 'prop-types';
import MainLayout from '../../layout/MainLayout';
import SingleLayout from '../../layout/SingleLayout';
import LoginContainer from './page/LoginContainer';
/** components */
import HomePage from './HomePage';

function HomeContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };
  const [state,setStorage]=useState('')

  useEffect(() => {
    let mounted = true;
    const config={
          headers:{
            Authorization:'Bearer'+localStorage.getItem('token')
          }
        }
   
      setStorage(localStorage.getItem('token'))
      
  }, []);
  

  return(
    <>
    
        { console.log("state",state)}
    {state?
        
        <MainLayout dispatch={dispatch} storeLayout={storeLayout}> 
        <HomePage {...props}/>
        </MainLayout>:
        <SingleLayout>
       <LoginContainer  />
       </SingleLayout> }    

     </>
  )
}

// HomeContainer.propTypes = {
//   isMobile: propTypes.bool.isRequired,
// };

export default HomeContainer;
