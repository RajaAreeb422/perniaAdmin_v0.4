import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';
import { data } from '../../../data';
import './addcoupon.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import router from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';

const AddCouponPage = memo(props => {
  const [state, setState] = useState({
    coupon_code: '',
    coupon_type: 'cart',
    coupon_description: '',
    expiry_date: '',
    usage_limit_per_coupon: null,
    usage_limit_per_user: null,
    discount_type: 'percentage',
    discount_value: null,
  });

  
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [mydiv, setDiv] = useState(false);

  const {
    coupon_code,
    coupon_type,
    coupon_description,
    expiry_date,
    usage_limit_per_coupon,
    usage_limit_per_user,
    discount_type,
    discount_value,

  } = state;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const Errortoggle = () => setErrorModal(!errormodal);
  useEffect(() => {}, []);
  
  const submitHandler = e => {
    e.preventDefault();
    console.log(state);
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if(state.coupon_code==''||state.coupon_type==''||state.coupon_description==''||state.expiry_date==''
    ||state.discount_type==''|| state.discount_value==null || state.usage_limit_per_coupon==null ||state.usage_limit_per_user==null)
    Errortoggle()
    else
    {
      
    axios
    .post(
      `http://95.111.240.143:8080/ecom-api/coupons`,
      state,config,

      { headers: { 'content-type': 'application/json' } },
    )

    .then(response => {
      toggle()
      
      console.log("respoooos coupon",response);
    })
    .catch(error => {
      console.log('error',error)
      toast.notify(`Sorry! Coupon code is not unique..`,{
        type:'error'
      })
     
    });

    }

  };

  const handleChange = names => e => {
   
    const name = e.target.name;
    console.log(name);
    let value = e.target.value;
    if(name=='discount_value')
    {
      if(state.discount_type=='percentage')
      {
        if(value>100)
         value=100
      }
    }
    console.log(value);
    setState({
      ...state,
      [name]: value,
    });
  };
  const move = ()  => {
    router.push('/coupon/Coupon')
  }

  const PostCategory = () => (
    <div className="main">
      <div className="newCoupon">
      <ToastContainer align={"right"} position={"middle"}/>
        <div className='couponNav'>
        <h1 className="newCouponTitle">Create Coupon</h1>
        <img  className='couponimg' src='https://freepngimg.com/thumb/gift/137009-vector-surprise-birthday-gift-png-free-photo.png'/>
        </div>  
        
        <form className="newCouponForm" onSubmit={submitHandler}>
          <div className="newCouponItem">
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Coupon Code</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder="code..."
                className="form-control"
                name="coupon_code"
                value={state.coupon_code}
                onChange={handleChange('coupon_code')}
              />
            </div>
          
            <div style={{padding:'20px',width:'400px'}}>
            <label style={{marginLeft:'0px'}}>Coupon Type</label>
            <select
            className="form-control"
            id="parent"
            required
         
            name="coupon_type"
            style={{marginBottom:'10px',width:'300px',marginLeft:'0px'}}
             onChange={handleChange('coupon_type')}
            >
            <option value="cart">Cart</option>
            <option value="user">User</option>
            <option value="product">Product</option>
            </select>
            </div>
          </div>

          <div className="newCouponItem1">
            <div style={{width:'700px',marginLeft:'20px'}}>
              <label>Description</label>
              <textarea
                type="date"
                style={{height:'120px'}}
                value={state.coupon_description}
                placeholder="details....."
                name="coupon_description"
                onChange={handleChange('coupon_description')}
                className="form-control"
              />
            </div>
          </div>
          
          <div className="newCouponItem1">
            <div style={{marginTop:'20px',marginLeft:'20px'}}>
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiry_date"
                onChange={handleChange('expiry_date')}
                className="form-control"
              />
            </div>
         
          </div>



          <div className="newCouponItem1">
            <div style={{marginTop:'20px'}}>
              <label>Usage Limit per Coupon</label>
              <input
                type="number"
                value={state.usage_limit_per_coupon}
                
                name="usage_limit_per_coupon"
                onChange={handleChange('usage_limit_per_coupon')}
                className="form-control"
              />
            </div>
            {mydiv &&
            <div style={{color:'red'}}>
              {error}
              </div>

            }
          </div>

          <div className="newCouponItem1">
            <div style={{marginTop:'20px'}}>
              <label>Usage Limit per User</label>
              <input
                type="number"
                name="usage_limit_per_user"
                value={state.usage_limit_per_user}
                onChange={handleChange('usage_limit_per_user')}
                className="form-control"
              />
            </div>
         
          </div>

          <div className="newCouponItem1">
            <div style={{marginLeft:'20px',marginTop:'20px',width:'200px'}}>
              <label >Discount Type</label>
          <select
            className="form-control"
            id="parent"
            required
            name="discount_type"
            style={{marginBottom:'10px'}}
             onChange={handleChange('discount_type')}
           >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
            
          </select>
            </div>
          </div>
          <div className="newCouponItem1">
            <div style={{marginTop:'20px'}}>
              <label>Discount Value</label>
              <input
                type="number"
                name="discount_value"
                placeholder="value..."
                value={state.discount_value}
                onChange={handleChange('discount_value')}
                className="form-control"
              />
            </div>
          </div>

      

          <div className="newCouponItem">
            <button type="submit" className="newCouponButton">
              Create
            </button>
          </div>
        </form>
      </div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Coupon Created Successfully</>
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
export default AddCouponPage;
