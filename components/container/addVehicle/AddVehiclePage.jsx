import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './myveh.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AirlineSeatIndividualSuite } from '@material-ui/icons';
import router from 'next/router';
//import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const AddVehiclePage = memo(props => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const errortoggle = () => setErrorModal(!errormodal);
  const [mydiv, setDiv] = useState(false);
  const [sub, setSub] = useState(null);
  const [state, setState] = useState({
    name: '',
    type: '',
    model:'',
    year: '',
  });
  const [parnt_cat, setParent] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [img, setImg] = useState();

  const { name, parent, status } = state;

  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .get(`http://localhost:8080/maz-api/vehicles`, config)
      .then(response => {
        setParent(response.data.data);

        console.log(response.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    // if(state.name==''|| img=='')
    // errortoggle
    // else{

    
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    // if (sub != 'null') state.parent = sub;


    console.log('state',state)
    axios
      .post(
        `https://mazglobal.co.uk/maz-api/vehicles`,
        state,
        config,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        toggle()
        // console.log('ress', response.data.InsertedId);
        // var formData = new FormData();
        // formData.append('imageFile', img);
        // console.log('image', img);
        // //    // go()

        // axios
        //   .post(
        //     `http://95.111.240.143:8080/ecom-api/categories/uploadCategoryImage/${response.data.InsertedId}`,
        //     formData,
        //     config,
        //     {},
        //   )
        //   .then(res => {
        //     console.log("after upload",res.data);
        //     toggle();
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      })
      .catch(error => {
      errortoggle()
      });
  
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
  };

  const handleImgChange = name => e => {
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];
      
      setImg(imgg);
    }
  };

  const move = () => {
    router.push('/vehicle/Vehicle');
  };

  const PostCategory = () => (
    <div className="main">
       <h1 className="myCategoryTitle">New Vehicle</h1>
      <div className="myCategory">
        <img className="vimg" height='160vh' src='data:image/jpeg;base64,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oAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooAooooD//2Q=='/>
        {/* <h1 className="myCategoryTitle">New Vehicle</h1> */}
        <form className="myCategoryForm" onSubmit={submitHandler} >
          <div  className="myCategoryItem">
            <div className="vlabel">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
              className="myCategorySelect"
              id="name"
              placeholder="Your Vehicle Label"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
            </div>
          
          <div className="vlabel">
            <label for="exampleFormControlSelect1">Vehicle Type</label>
            <select
              className="myCategorySelect"
              id="type"
              required
              name="type"
              value={state.type}
              onChange={handleChange(name)}
            >
              {/* {parnt_cat.map(p => ( */}
                <option value='truck'>Truck</option>
                <option value='utility vehicle'>Utility Vehicle</option>
              {/* ))} */}
              <option value="null">Select Cataegory</option>
            </select>
          </div>
          </div>

          <div  className="myCategoryItem">
            <div className="vlabel">
            <label for="exampleInputName">Model</label>
            <input
              type="text"
              className="myCategorySelect"
              id="model"
              placeholder="Model"
              required
              name="model"
              value={state.model}
              onChange={handleChange(name)}
            />
            </div>
          
          <div className="vlabel">
            <label for="exampleFormControlSelect1">Year</label>
            <input
              type="text"
              className="myCategorySelect"
              id="year"
              placeholder="Year"
              required
              name="year"
              value={state.year}
              onChange={handleChange(name)}
            />
          </div>
          </div>



            
            <button type="submit" className="myCategoryButton" >
              Add
            </button>
           
          
        </form>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Vehicle Addded Successfully</>
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
export default AddVehiclePage;
