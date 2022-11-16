import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './addsupp.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import router from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DropLogo from './DropLogo'
import DropHead from './DropHead'
//import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const AddSupplier = memo(props => {
  const [modal, setModal] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [headselected, setHeadSelected] = useState([]);
  const [errormodal, setErrorModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const imgtoggle = () => setImgModal(!imgmodal);
  const servertoggle = () => setServerModal(!servermodal);
  const errortoggle = () => setErrorModal(!errormodal);
  const [state, setState] = useState({
    name: '',
    address:'',
    phone:'',
    email:'',
    description:'',
    featured:'No',
    reference:''
    
  });
  

  const {name,address,phone,email,featured,reference} = state;

  const move = () => {
     router.push('/supplier/Supplier')
    
  }
  const handleChild = childData => {
    setSelected({ ...childData });
    console.log('selected', selected);
   
  };
  const handleHead = child=> {
    setHeadSelected({ ...child });
    console.log('selected', headselected);
   
  };
  useEffect(() => {
   
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if(state.name=='' || state.address=='' || state.phone=='' || state.email=='' || state.reference=='')
    {
      errortoggle()
    }
    else if(selected.length==0 || headselected.length==0)
    {
      imgtoggle()
    }
    else{
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('state',state)
   // https://api.mazglobal.co.uk/maz-api
    axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/suppliers`,
        state,config,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        console.log('res',response)
        
        var formData = new FormData();
        for (const key of Object.keys(selected)) {
          formData.append('imageFile', selected[key]);
          console.log('in lopppp', formData);
        }
        
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/suppliers/uploadBrandLogo/${response.data.data.insertId}`,
            formData,
            config,
            {},
          )
          .then(res => {
            console.log(res.data);
            //succtoggle();
          })
      .catch(error => {
        servertoggle()
        console.log(error);
      });

      
      var formData2 = new FormData();
      for (const key of Object.keys(headselected)) {
        formData2.append('imageFile', headselected[key]);
        console.log('in lopppp', formData2);
      }
      
      axios
        .post(
          `https://api.mazglobal.co.uk/maz-api/suppliers/uploadBrandHead/${response.data.data.insertId}`,
          formData2,
          config,
          {},
        )
        .then(res => {
          console.log(res.data);
          //succtoggle();
        })
    .catch(error => {
      servertoggle()
      console.log(error);
    });



        toggle();
        //router.push('/supplier/Supplier')
      })
      .catch(error => {
        console.log(error)
        servertoggle()
      });
    }
  };

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    
    setState({
      ...state,
      [name]: value,
    });
  };

  const PostCategory = () => (
    <div className="addSuppmain">
      <div className="addSupp">
        <h1 className="addSuppTitle">New Supplier</h1>
        <form className="addSuppForm" onSubmit={submitHandler}>
          <div className="addSuppItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Company Name"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
          <div className="addSuppItem">
            <label for="exampleInputName">Logo</label>
            <DropLogo parentCall={handleChild}/>
          </div>
          <div className="addSuppItem">
            <label for="exampleInputReference">Reference Link</label>
            <input
              type="text"
              className="catlabel"
              id="reference"
              placeholder="Page/Website Link"
              required
              name="reference"
              value={state.reference}
              onChange={handleChange(name)}
            />
          </div>

           <div className="addSuppFlexItem">
             <div className='addSuppinnerBox'>
            <label for="exampleInputName">Email</label>
            <input
              type="email"
              name='email'
              required
              placeholder='abc123@gmail.com'
              value={state.email}
               onChange={handleChange('email')}
            />
          </div> 
             <div className='addSuppinnerBox'style={{marginLeft:'5px'}}>
            <label for="exampleInputName">Phone</label>
            <input
              type="tel"
              name='phone'
              required
              placeholder='051-228'
              value={state.phone}
              onChange={handleChange('phone')}
            />
          </div> 
          </div>

          <div className="addSuppFlexItem">
             <div className='addSuppinnerBox'>
             <label for="exampleInputName">Branch Address</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Branch Location"
              required
              name="address"
              value={state.address}
              onChange={handleChange(name)}
            />
          </div> 
             <div className='addSuppinnerBox'style={{marginLeft:'5px'}}>
            <label for="exampleInputName">Featured Brand</label>
            <select
            id='select'
            className="brand"
            width='400px'
            name='featured'
            onChange={handleChange(name)}
            >
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </div> 
          </div>
       


          <div className="addSuppdesp">
            <label for="exampleInputName">Description</label>
            <input
              type="text"
              id="descp"
              placeholder="Enter your text"
              required
              name="description"
              value={state.description}
              onChange={handleChange(name)}
            />
          </div>
          <div className="addSuppItem">
            <label for="exampleInputName">Header Image</label>
            <DropHead headCall={handleHead}/>
          </div>
          <div className="addSuppItem">
     
            <button type="submit" className="addSuppButton">
              Add
            </button>
            
          </div>
        </form>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Supplier Added Successfully</>
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
          <>!Please provide the required fields</>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={errortoggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>

      
      <Modal isOpen={imgmodal} toggle={imgtoggle}>
        <ModalHeader style={{color:'red'}} toggle={imgtoggle}>Alert</ModalHeader>
        <ModalBody>
          <>Please Add The Images</>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={imgtoggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={servermodal} toggle={servertoggle}>
        <ModalHeader style={{color:'red'}} toggle={servertoggle}>Alert</ModalHeader>
        <ModalBody>
          <>!OOPs soory something went wrong.Try Again</>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={servertoggle}>
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
export default AddSupplier;
