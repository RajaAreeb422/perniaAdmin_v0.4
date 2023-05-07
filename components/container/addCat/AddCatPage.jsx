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
  const [categorymodal, setCategoryModal] = React.useState(false);
  const categorytoggle = () => setCategoryModal(!categorymodal);
  const [dbmodal, setDBModal] = React.useState(false);
  const dbtoggle = () => setDBModal(!dbmodal);
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
  const [supplier, setSupplier] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [img, setImg] = useState();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});

  const { name, parent, status,supplier_id } = state;

  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));

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
      axios
      .get(`https://api.mazglobal.co.uk/maz-api/suppliers`, config)
      .then(response => {
        setSupplier(response.data.data);
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
    
    setLoader(true)
    e.preventDefault();
    if(user.role_id==1)
    { 
   
    if(state.name==''|| img=='' || state.supplier_id==null)
    {

    setLoader(false)
    errortoggle()
    }
    else if(parnt_cat.length==8)
    {
      setLoader(false)
      categorytoggle()
    } 
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
        
        var formData = new FormData();
        formData.append('imageFile', img);
      

        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/categories/uploadImage/${response.data.InsertedId}`,
            formData,
            config,
            {},
            
          )
          .then(res => {
           
            setLoader(false)
            toggle();
          })
          .catch(error => {
            setLoader(false)
            dbtoggle()
            console.log(error);
          });
      })
      .catch(error => {
        setLoader(false)
      dbtoggle()
      });
      };

    }
    else{
    if(state.name==''|| img=='')
    {
    setLoader(false)
    errortoggle()
    }
  
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
       
        var formData = new FormData();
        formData.append('imageFile', img);
        
        //    // go()

        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/categories/uploadImage/${response.data.InsertedId}`,
            formData,
            config,
            {},
            
          )
          .then(res => {
        
            setLoader(false)
            toggle();
          })
          .catch(error => {
            setLoader(false)
            dbtoggle()
            console.log(error);
          });
      })
      .catch(error => {
        setLoader(false)
      dbtoggle()
      console.log(error);
      });
  };
  }
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
           {loader && <div className="Loader" />}
      <div
        className="order"
        style={
          loader === true ? { backgroundColor: 'black', opacity: '0.2' } : {}
        }
      >
      <div className="addCategory">
        
        <h1 className="addCategoryTitle">New Category</h1>
        <form className="addCategoryForm" onSubmit={submitHandler} >
          <div  className="addCategoryItem">
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
          <div className="addCategoryItem">
            <label for="exampleFormControlSelect1">Parent Category</label>
            <select
              className="addCategorySelect"
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
            <div className="addCategoryItem">
              <label for="exampleFormControlSelect1">Sub Category</label>
              <select
                className="addCategorySelect"
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

           {user.role_id==1 &&
           <div className="addCategoryItem">
            <label for="exampleFormControlSelect1">Supplier</label>
            <select
              className="addCategorySelect"
              id="supplier"
              required
              name="supplier_id"
              value={state.supplier_id}
              onChange={handleChange(name)}
            >
              {supplier.map(p => (
                <option value={p.id}>{p.name}</option>
              ))}
              <option value="null">Select Supplier</option>
            </select>
          </div>
         }

          <div className="addCategoryItem">
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

            
            <button type="submit" className="addCategoryButton" >
              Add
            </button>
           
          
        </form>
      </div>
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
          <>!Please Add the required fields</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={errortoggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={categorymodal} toggle={categorytoggle}>
        <ModalHeader toggle={categorytoggle}>Alert</ModalHeader>
        <ModalBody>
          <>Maximum 8 Categories can be added</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={categorytoggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={dbmodal} toggle={dbtoggle}>
        <ModalHeader toggle={dbtoggle}>Alert</ModalHeader>
        <ModalBody>
          <>!Database Connection Error</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={dbtoggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>


    </div>
  );

  return <>{PostCategory()}</>;
});
export default AddCatPage;
