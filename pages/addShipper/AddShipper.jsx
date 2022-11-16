import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './addship.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import router from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import jwt_decode from "jwt-decode";

 

const AddShipper = memo(props => {
  const [user, setUser] = useState({});
  const [modal, setModal] = React.useState(false);
  const [errormodal, setErrorModal] = React.useState(false);
  const [pr, setPrice] = useState(8);
  const toggle = () => setModal(!modal);
  const errortoggle = () => setErrorModal(!errormodal);
  const [state, setState] = useState({
    name: '',
    price:8,
    category:'standard',
    supplier_id:null,
    limit:null
    
  });
  
  
  const { name,price,limit,supplier_id} = state;
 

  useEffect(() => {
   var decoded = jwt_decode(localStorage.getItem('token'));
   setUser(decoded.result)
   setState({...state,['supplier_id']:decoded.result.supplier_id})
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    state.price=pr
    console.log('sss',state)
    axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/shipping`,
        state,config,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        toggle()
        
      })
      .catch(error => {
       errortoggle()
      });
  };
  const move =  e => {
    router.push('/shipSystem/Ship')
  }

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    if(name=='category')
    {
      if(value=='premium')
       setPrice(10)
       else
       setPrice(8)
    }
    setState({
      ...state,
      [name]: value,
    });
  };

  const PostCategory = () => (
    <div className="suppmain">
      <div className="suppUser">
      <div className="dividearea">
          
        
        
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78viL0UazMV3hwxe
        PIdu6aNDF8O41WUnFydp8Trg6fewhLI9yb8Ed4npUr-Fn59_MQEM&usqp=CAU" />
        
        <form className="suppUserForm" onSubmit={submitHandler}>
        <h1 className="suppUserTitle" >New Shipper</h1>
          <div className="suppUserItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
            // className="catlabel"
              id="name"
              placeholder="Shipper Name"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
          <div className="suppUserItem">
            <label for="exampleInputName">Shipping Category</label>
            <select
           // className="form-control"
            id="parent"
            required
            name="category"
            value={state.category}
             onChange={handleChange(name)}
          >
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
            
          </select>

          </div>
        
          <div className="suppUserItem">
            <div style={{display:'flex',flexDirection:'row',alignContent:'space-evenly',marginTop:'10px',marginLeft:'20px'}}>
            <label style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '600', color: 'rgb(151, 150, 150)', width:'400px'}}
             for="exampleInputName">Shipping Rate</label>
            <h5 style={{marginLeft:'320px'}}>{pr} $</h5>
            </div>
            
          </div>
          
          <div className="suppUserItem">
            <label for="exampleInputName">Price for Free Shipping</label>
            <input
              type="text"
            //  className="catlabel"
              
              placeholder="Price"
              required
              name="cartlimit"
              value={state.cartlimit}
              onChange={handleChange(name)}
            />
          </div>


          <div className="suppUserItem">
     
            <button type="submit" className="suppUserButton" >
              Add
            </button>
            
          </div>
        </form>
      </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Shipper Added Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>

      <Modal isOpen={errormodal} toggle={errortoggle}>
        <ModalHeader style={{color:'red'}} toggle={errortoggle}>Alert</ModalHeader>
        <ModalBody>
          <>!OOPs soory something went wrong.Try Again</>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={errortoggle}>
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
export default AddShipper;
