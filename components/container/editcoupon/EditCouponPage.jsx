import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

//import "react-datepicker/dist/react-datepicker.scss";
import './editcoupon.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { useRouter } from 'next/router';


const EditCouponPage = memo(props => {
  const [state, setState] = useState({
    coupon_code: '',
    coupon_type: '',
    coupon_description: '',
    expiry_date: '',
    usage_limit_per_coupon: null,
    usage_limit_per_user: null,
    discount_type: '',
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
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const Errortoggle = () => setErrorModal(!errormodal);
  useEffect(() => {
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      axios.get(`http://95.111.240.143:8080/ecom-api/coupons/${id}`,config)
      .then(res=>{
        console.log('expitren',(res.data.data.expiry_date))
        // let dateVal ="-Date("+res.data.data.expiry_date+")-";
        // console.log('dateVal',dateVal)
        // let dat = new Date(parseFloat(res.data.data.expiry_date));
        let dat=''
        for(let i=0;i<10;i++)
        dat=dat+res.data.data.expiry_date[i]
        console.log('jdjsjd',dat)
       res.data.data.expiry_date=dat
        
       
          console.log('dateeeg',(res.data.data.expiry_date),'da',dat)
          setState(res.data.data)
      })

  }, []);
  
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
        console.log('stattrcytstyhsfu',state)
    //   let upu=state.usage_limit_per_user;
    //   upu=parseInt(upu)
    //   state.usage_limit_per_user=upu
    axios
    .put(
      `http://95.111.240.143:8080/ecom-api/coupons/${id}`,
      data,config,

      { headers: { 'content-type': 'application/json' } },
    )

    .then(response => {
      toggle()
      
      console.log("respoooos coupon",response);
    })
    .catch(error => {
      console.log('error',error)
     
    });

    }

  };

  const handleChange = names => e => {
   
    const name = e.target.name;
    console.log(name);
    const value = e.target.value;
    console.log(value);
    setData({
        ...data,
        [name]: value,
      });
     

    setState({
      ...state,
      [name]: value,
    });
  }
  const move = ()  => {
    router.push('/coupon/Coupon')
  }

  const PostCategory = () => (
    <div className="editCouponmain">
      <div className="editCoupon">
        <div className='editCouponNav'>
        <h1 className="editCouponTitle">Edit Coupon</h1>
        <img  className='editCuponimg' src='https://freepngimg.com/thumb/gift/137009-vector-surprise-birthday-gift-png-free-photo.png'/>
        </div>  
        
        <form className="editCouponForm" onSubmit={submitHandler}>
          <div className="editCouponItem">
            <div style={{padding:'20px'}}>
              <label>Coupon Code</label>
              <input
                type="text"
                style={{marginRight:'90px'}}
                placeholder="code..."
                className="form-control"
                name="coupon_code"
                value={state.coupon_code}
                onChange={handleChange('coupon_code')}
              />
            </div>
          
            <div style={{padding:'20px',width:'400px'}}>
            <label >Coupon Type</label>
            <select
            className="form-control"
            id="parent"
            required
         
            name="coupon_type"
            style={{marginBottom:'10px'}}
             onChange={handleChange('coupon_type')}
            >
            <option value="cart">Cart</option>
            <option value="user">User</option>
            <option value="product">Product</option>
            </select>
            </div>
          </div>

          <div className="editCouponItem1">
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
          
          <div className="editCouponItem1">
            <div style={{marginTop:'20px',marginLeft:'20px'}}>
              <label>Expiry Date </label>
              <input
              id="date_required"
                type="date"
                name="expiry_date"
                value={state.expiry_date}
                //defaultValue={state.expiry_date}
                onChange={handleChange('expiry_date')}
                className="form-control"
              />
            </div>
         
          </div>

          {/* <div className="editCouponItem1">
            <div style={{marginTop:'20px',marginLeft:'20px'}}>
              <label>Expiry Date </label>
              <DatePicker selected={state.expiry_date}  onChange={handleChange('expiry_date')}/>
            </div>
         
          </div> */}



          <div className="editCouponItem1">
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

          <div className="editCouponItem1">
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

          <div className="editCouponItem1">
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
          <div className="editCouponItem1">
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

      

          <div className="editCouponItem">
            <button type="submit" className="editCouponButton">
              Update
            </button>
          </div>
        </form>
      </div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Coupon Updated Successfully</>
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
export default EditCouponPage;
