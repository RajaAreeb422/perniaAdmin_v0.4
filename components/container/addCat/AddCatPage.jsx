import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './mycatgry.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AirlineSeatIndividualSuite } from '@material-ui/icons';
import router from 'next/router';
import jwt_decode from "jwt-decode";
//import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const AddCatPage = memo(props => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const errortoggle = () => setErrorModal(!errormodal);
  const [mydiv, setDiv] = useState(false);
  const [sub, setSub] = useState(null);
  const [state, setState] = useState({
    name: '',
    parent: null,
    status: 1,
    supplier_id:null,
    path: null,
  });
  const [parnt_cat, setParent] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [img, setImg] = useState();
  const [user, setUser] = useState({});

  const { name, parent, status,supplier_id } = state;

  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    console.log('local',localStorage.getItem('token'))
    console.log('lres',decoded.result)
    setUser(decoded.result)
    setState({...state,['supplier_id']:decoded.result.supplier_id})

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
   
      if(decoded.result.role_id==1)
    {
      axios
      .get(`https://api.mazglobal.co.uk/maz-api/categories`, config)
      .then(response => {
        setParent(response.data.data);
      })
      .catch(err => console.log(err));
    }
    else{
      axios
      .get(`https://api.mazglobal.co.uk/maz-api/categories/getCategoriesBySupplierId/${decoded.result.supplier_id}`)
      .then(res =>  setParent(res.data.data))
      .catch(err => console.log(err));
    }
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if(state.name==''|| img=='')
    errortoggle
    else{

    
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if (sub != 'null') state.parent = sub;
    // https://api.perniacouture.pk/pernia-api/categories
    axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/categories`,
        state,
        config,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        console.log('ress and state', response.data.InsertedId,state);
        var formData = new FormData();
        formData.append('imageFile', img);
        console.log('image', img);
        //    // go()

        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/categories/uploadImage/${response.data.InsertedId}`,
            formData,
            config,
            {},
            
          )
          .then(res => {
            console.log("after upload",res.data);
            toggle();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
      errortoggle()
      });
  };
  }
 

  const handleSubChange = name => e => {
    setSub(e.target.value);
  };

  const handleChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    let list = [...subCat];
    setState({
      ...state,
      [name]: value,
    });

    if (name === 'parent') {
      setSub(value);
      
      parnt_cat.map(item => {
        
        if (item.parent == value) {
          
          setDiv(true);
          list.push(item);
          setSubCat(list);
          
        }
      });
    }
  };

  const handleImgChange = name => e => {
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];
      
      setImg(imgg);
    }
  };

  const move = () => {
    router.push('/category/Category');
  };

  const PostCategory = () => (
    <div className="main">
      <div className="myCategory">
        
        <h1 className="myCategoryTitle">New Category</h1>
        <form className="myCategoryForm" onSubmit={submitHandler} >
          <div  className="myCategoryItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Your Category Label"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
          <div className="myCategoryItem">
            <label for="exampleFormControlSelect1">Parent Category</label>
            <select
              className="myCategorySelect"
              id="parent"
              required
              name="parent"
              value={state.parent}
              onChange={handleChange(name)}
            >
              {parnt_cat.map(p => (
                <option value={p.id}>{p.name}</option>
              ))}
              <option value="null">Select Cataegory</option>
            </select>
          </div>
          {mydiv && (
            <div className="myCategoryItem">
              <label for="exampleFormControlSelect1">Sub Category</label>
              <select
                className="myCategorySelect"
                id="parent"
                
                name="sub"
                value={sub}
                onChange={handleSubChange(name)}
              >
                {subCat.map(p => (
                  <option value={p.id}>{p.name}</option>
                ))}
                <option value="null">Select Cataegory</option>
              </select>
            </div>
          )}

          <div className="myCategoryItem">
              <label
                for="exampleInputName"
              >
                Upload Image
              </label>
              <input
              
                type="file"
                
                id="name"
                placeholder="Your Category Label"
                required
                name="imageFile"
                accept='image/*'
                onChange={handleImgChange(name)}
              />
            </div>

            
            <button type="submit" className="myCategoryButton" >
              Add
            </button>
           
          
        </form>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Category Addded Successfully</>
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
          <>!Please Add image or Enter Name</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={errortoggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>


    </div>
  );

  return <>{PostCategory()}</>;
});
export default AddCatPage;
