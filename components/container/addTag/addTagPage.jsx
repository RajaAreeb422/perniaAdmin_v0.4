import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';
import { data } from '../../../data';
import './addtag.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import router from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';

const AddTagPage = memo(props => {
  const [state, setState] = useState({
    name: '',
    
  });

  
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [mydiv, setDiv] = useState(false);

  const {
    name

  } = state;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const Errortoggle = () => setErrorModal(!errormodal);
  useEffect(() => {}, []);
  
  const submitHandler = e => {
    e.preventDefault();
   
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if(state.name=='')
    Errortoggle()
    else
    {
      
      // 
      //http://localhost:8080/pernia-api/tag
    axios
    .post(
      `https://api.mazglobal.co.uk/maz-api/tags`,
      state,config,

      { headers: { 'content-type': 'application/json' } },
    )

    .then(response => {
      toggle()
    
    })
    .catch(error => {
     
      toast.notify(`Sorry! Something went wrong..`,{
        type:'error'
      })
     
    });

    }

  };

  const handleChange = names => e => {
   
    const name = e.target.name;
    // console.log(name);
    let value = e.target.value;
    // if(name=='discount_value')
    // {
    //   if(state.discount_type=='percentage')
    //   {
    //     if(value>100)
    //      value=100
    //   }
    // }

    setState({
      ...state,
      [name]: value,
    });
  };
  const move = ()  => {
    router.push('/tag/tag')
  }

  const PostCategory = () => (
    <div className="addtagmain">
      
      <div className="addtag">
      <div className="sepration">
        <div>
      <img  className='addtagimg1' src='https://png.pngtree.com/png-clipart/20210310/original/pngtree-blue-e-commerce-promotion-online-shopping-png-image_5936591.jpg'/>
      <ToastContainer align={"right"} position={"middle"}/>
      </div>
      <div>
        <div className='addtagNav'>
        <h1 className="addtagTitle">Add Tag</h1>
        
        </div>  
        
        <form className="addtagForm" onSubmit={submitHandler}>
          <div className="addtagItem">
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Tag Name</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'450px'}}
                placeholder="...."
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange('name')}
              />
            </div>
          </div>
       

          <div className="addtagItem">
            <button type="submit" className="addtagButton">
              Add
            </button>
          </div>
          
        </form>
        </div>
      </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Tag Added Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>

      <Modal isOpen={errormodal} toggle={Errortoggle}>
        <ModalHeader style={{color:'red'}} toggle={Errortoggle}>!Warning</ModalHeader>
        <ModalBody>
          <>Please Fill All the Fields</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={Errortoggle}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );

  return (
    <>
     
      {PostCategory()}
    </>
  );
});
export default AddTagPage;
