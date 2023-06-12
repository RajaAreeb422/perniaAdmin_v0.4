import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import '../Styles/SuperAdmin.scss';
import { useState, useEffect } from 'react';
import { data } from '../../../data';
import './addcoupon.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import router from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';
import Drop from './Drop';
import jwt_decode from "jwt-decode";

const AddCollectionPage = memo(props => {
  const [state, setState] = useState({
     name:'',
     brand_id:null,
     tag_id:-1,
     category_id:null
   
  });

  const [selected, setSelected] = useState([]);
  const [brand, setBrand] = useState([]);
  const [tag, setTag] = useState([]);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState();
  const [supplier, setSupplier] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [mydiv, setDiv] = useState(false);

  const {
    name,
    brand_id,
    tag_id,
    category_id


  } = state;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [servermodal, setServerModal] = React.useState(false);
  const servertoggle = () => setServerModal(!servermodal);
  const [errormodal, setErrorModal] = React.useState(false);
  const Errortoggle = () => setErrorModal(!errormodal);
  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    setUser(decoded.result)
   setState({...state,['brand_id']:decoded.result.supplier_id})
    axios
    .get('https://api.mazglobal.co.uk/maz-api/tags')
    .then(res => setTag(res.data.data))
    .catch(err => console.log(err));

    axios
    .get(`https://api.mazglobal.co.uk/maz-api/categories`)
    .then(res => setCategories(res.data.data))
    .catch(err => console.log(err));
    if(decoded.result.role_id==1)
    {
     
      axios
      .get(`https://api.mazglobal.co.uk/maz-api/suppliers`)
      .then(res => setSupplier(res.data.data))
      .catch(err => console.log(err));
    }

   
  }, []);
  
  const submitHandler = e => {

    setLoader(true)
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

   if(user.role_id==1)
   {
    if(state.name=='' || state.category_id=='' || state.category_id==null
    ||state.tag_id=='' ||state.tag_id==null  ||  state.brand_id==null || selected.length==0)
    {
    setLoader(false)
    Errortoggle()
    }
    else
    {
      let bb=parseInt(state.brand_id);
      let cc=parseInt(state.category_id);
      let tt=parseInt(state.tag_id);
      state.brand_id=bb;
      state.category_id=cc;
      state.tag_id=tt;
      
      axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/collections`,
        state,
      ).then(response=>{

        var formData = new FormData();
        for (const key of Object.keys(selected)) {
          formData.append('imageFile', selected[key]);
        
        }
        
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/collections/uploadCollectionImage/${response.data.InsertedId}`,
            formData,
            config,
            {},
          )
          .then(res => {
         
            setLoader(false)
            toggle()
            //succtoggle();
          })
      .catch(error => {
        setLoader(false)
        servertoggle()
        console.log(error);
      });
    }).catch(err=>console.log(err))
        

    }
  }
  else{
    if(state.name=='' || state.category_id=='' || state.category_id==null
    ||state.tag_id=='' ||state.tag_id==null  || selected.length==0)
    {
    setLoader(false)
    Errortoggle()
    }
    else
    {
      let bb=parseInt(state.brand_id);
      let cc=parseInt(state.category_id);
      let tt=parseInt(state.tag_id);
      state.brand_id=bb;
      state.category_id=cc;
      state.tag_id=tt;
      
      axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/collections`,
        state,
      ).then(response=>{

        var formData = new FormData();
        for (const key of Object.keys(selected)) {
          formData.append('imageFile', selected[key]);
         
        }
        
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/collections/uploadCollectionImage/${response.data.InsertedId}`,
            formData,
            config,
            {},
          )
          .then(res => {
           
            setLoader(false)
            toggle()
            //succtoggle();
          })
      .catch(error => {
        setLoader(false)
        servertoggle()
        console.log(error);
      });
    }).catch(err=>{
      setLoader(false)
      servertoggle()
      console.log(err)
    })
        
  
    }

  }

  };

  const handleChange = names => e => {
   
    const name = e.target.name;

    let value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleChild = childData => {
    setSelected({ ...childData });
   
   
  };
  const move = ()  => {
    router.push('/collections/Collection')
  }

  const PostCategory = () => (

    <div className='col-lg-8 m-auto'>
 <div className="main">
      {loader && <div className="Loader" />}
      <div
        className="order"
        style={
          loader === true ? { backgroundColor: 'black', opacity: '0.2' } : {}
        }
      >
      <div className="newCoupon">
      <ToastContainer align={"right"} position={"middle"}/>
        <div className='couponNav'>
        <h1 className="newCouponTitle">Add Collection</h1>
        <img  className='couponimg' src='https://freepngimg.com/thumb/gift/137009-vector-surprise-birthday-gift-png-free-photo.png'/>
        </div>  
        
        <form className="newCouponForm" onSubmit={submitHandler}>
          <div className="newCouponItem">
            <div >
              <label  style={{marginLeft:'0px'}}>Collection Name</label>
              <input
                type="text"
                
                placeholder="name"
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange('name')}
              />
            </div>
   
             <div >
            <label style={{marginLeft:'0px'}}>Tag</label>
            <select
            className="form-control"
            id="parent"
            required
            name="tag_id"
           
             onChange={handleChange('tag_id')}
            >
                {tag.map(it=>(
                    <option value={it.id}>{it.name}</option>
                ))

                }
               <option value={-1}>Other</option>
            </select>
            </div>
          </div>


          <div className="newCouponItem">
         
       
          <div>
            <label style={{marginLeft:'0px'}}>Category</label>
            <select
            className="form-control"
            id="parent"
            required
         
            name="category_id"
            
             onChange={handleChange('category_id')}
            >
            {categories.map(it=>(
                    <option value={it.id}>{it.name}</option>
                ))

                }
            </select>
            </div>

           {user.role_id==1 &&
           <div >
            <label style={{marginLeft:'0px'}}>Supplier</label>
            <select
              className="form-control"
              id="brand"
              required
              name="brand_id"
              value={state.brand_id}
              onChange={handleChange(name)}
            >
              {supplier.map(p => (
                <option value={p.id}>{p.name}</option>
              ))}
              <option value="null">Select Supplier</option>
            </select>
          </div>
          }
          </div>

          <div className="newCouponItem1">
            <div>
              <label>Image</label>
              <Drop parentCall={handleChild}/>
            </div>
          </div>
          
      
          <div className="middle-box">
            <button type="submit" className="newCouponButton">
              Add
            </button>
          </div>
        </form>
      </div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Collection Added Successfully</>
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
          <>Please provide All the Fields including Image</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={Errortoggle}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
      <Modal isOpen={servermodal} toggle={servertoggle}>
        <ModalHeader style={{color:'red'}} toggle={servertoggle}>!Warning</ModalHeader>
        <ModalBody>
          <>Sorry Something Went Wrong!</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={servertoggle}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
     </div> 
    </div>
    </div>
   
  );

  return (
    <>
     
      {PostCategory()}
    </>
  );
});
export default AddCollectionPage;
