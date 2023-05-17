import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';
import { data } from '../../../data';
import '../addTag/addtag.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';

const EditTagPage = memo(props => {
  const [tag, setTag] = useState({
  });
  const [state, setState] = useState({
});
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const Errortoggle = () => setErrorModal(!errormodal);
  
  const router = useRouter();
  const { id } = router.query;


  useEffect(() => {
    axios
    .get(
      `https://api.mazglobal.co.uk/maz-api/tags/${id}`
      )
    .then(response => {
      setTag(response.data.data)
    }).catch(err=>console.log(err))
  }, []);
  
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
    .put(
      `https://api.mazglobal.co.uk/maz-api/tags/${tag.id}`,
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
    let value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });

    setTag({
        ...tag,
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
        <h1 className="addtagTitle">Edit Tag</h1>
        
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
                value={tag.name}
                onChange={handleChange('name')}
              />
            </div>
          </div>
       

          <div className="addtagItem">
            <button type="submit" className="addtagButton">
              Update
            </button>
          </div>
          
        </form>
        </div>
      </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Tag Updated Successfully</>
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
          <>Please Fill the Name Fields</>
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
export default EditTagPage;
