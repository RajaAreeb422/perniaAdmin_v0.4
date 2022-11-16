import axios from 'axios';
import React, { memo } from 'react';
import './editsupp.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

toast.configure();

const EditSupplier = ()=> {
  const [modal, setModal] = React.useState(false);
  const [errormodal, setErrorModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const errortoggle = () => setErrorModal(!errormodal);
  const [state, setState] = useState({
    name: '',
    address:'',
    phone:'',
    email:'',
    description:''
    
  });
  const[put,setPut]=useState()
  
  const {name,address,phone,email,description} = state;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
   axios.get(`https://api.mazglobal.co.uk/maz-api/suppliers/${id}`)
   .then(res=>{
       console.log('data',res.data.data)
       setState(res.data.data)
   })
   .catch(err=>console.log(err))
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .put(
        `https://api.mazglobal.co.uk/maz-api/suppliers/${id}`,
        put,config,

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
    router.push('/supplier/Supplier')
  }

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    
    setState({
      ...state,
      [name]: value,
    });
    setPut({
      ...put,
      [name]:value
    })
  
  };

  const PostCategory = () => (
    <div className="editSuppmain">
      <div className="editSupp">
        <h1 className="editSuppTitle">Edit Supplier</h1>
        <form className="editSuppForm" onSubmit={submitHandler}>
          <div className="editSuppItem">
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
          <div className="editSuppFlexItem">
             <div className='editSuppinnerBox'>
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
             <div className='editSuppinnerBox'style={{marginLeft:'5px'}}>
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
          
          <div className="editSuppItem">
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


        
          <div className="editSuppdesp">
            <label for="exampleInputName">Description</label>
            <input
              type="text"
              id="descp"
              required
              name="description"
              value={state.description}
               onChange={handleChange(name)}
            />
          </div>
          <div className="editSuppItem">
     
            <button type="submit" className="editSuppButton">
              Update
            </button>
            
          </div>
        </form>
      </div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Supplier Updated Successfully</>
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
};
export default EditSupplier;
