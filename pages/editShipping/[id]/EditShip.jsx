import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './editship.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//import router from 'next/router';
import { useRouter } from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const EditShip = memo(props => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const errortoggle = () => setErrorModal(!errormodal);
  const [pr, setPrice] = useState(0);
  const [state, setState] = useState({
    id:null,
    name: '',
    category:'',
    price:null,
    limit:null
    
  });
  const [put,setPut]=useState()

  const { name,price,limit} = state;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`https://api.mazglobal.co.uk/maz-api/shipping/${id}`)
    .then(res=>{
        setState(res.data.data)
        setPrice(res.data.data.price)
        
    })
    .catch(err=>console.log(err))
  }, []);
  const move = () => {
    router.push('/shipSystem/Ship')
  }
  const submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('sss',put)
  
    
    axios
      .put(
        `https://api.mazglobal.co.uk/maz-api/shipping/${id}`,
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

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    let p=0;
    if(name=='category')
    {
      if(value=='premium')
      {
       p=10; 
       setPrice(10)
       setPut({...put,
         [name]:value,
       })
      
      }
       else
       {
         p=8;
       setPrice(8)
       setPut({
        [name]:value,
        
      })
       }

     
    }
 
    setPut({...put,
      [name]:value,
      ['price']:p
    })

    setState({
      ...state,
      [name]: value,
    });
  };

  const PostCategory = () => (
    <div className="editShippmain">
      <div className="editShipp">
      <div className="editShippdividearea">
          
        
        
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78viL0UazMV3hwxe
        PIdu6aNDF8O41WUnFydp8Trg6fewhLI9yb8Ed4npUr-Fn59_MQEM&usqp=CAU" />
        
        <form className="editShippForm" onSubmit={submitHandler}>
        <h1 className="editShippTitle" >Edit Shipper</h1>
          <div className="editShippItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
             // className="catlabel"
              id="name"
              placeholder={state.name}
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
        
          <div className="editShippItem">
            <label for="exampleInputName">Shipping Category</label>
            <select
            className="form-control"
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
        
          <div className="editShippItem">
            <div style={{display:'flex',flexDirection:'row',alignContent:'space-evenly',marginTop:'10px',marginLeft:'-280px'}}>
            <label style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '600', color: 'rgb(151, 150, 150)' }}
             for="exampleInputName">Shipping Rate</label>
            <h5 style={{marginLeft:'300px'}}>{pr} $</h5>
            </div>
            
          </div>
          
          <div className="editShippItem">
            <label for="exampleInputName">Price for Free Shipping</label>
            <input
              type="text"
              className="catlabel"
              
              placeholder="In $"
              required
              name="cartlimit"
              value={state.cartlimit}
              onChange={handleChange(name)}
            />
          </div>

          <div className="editShippItem">
            <button type="submit" className="editShippButton">
              Update
            </button>
            
          </div>
        </form>
      </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Shipper Updated</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={errormodal} toggle={errortoggle}>
        <ModalHeader toggle={errortoggle}>Alert</ModalHeader>
        <ModalBody>
          <>!OOPs some thing went wrong.Try Again</>
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
export default EditShip;
