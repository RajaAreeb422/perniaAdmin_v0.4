import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';
import { data } from '../../../data';
import './editcoupon.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import router from 'next/router';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';
import Drop from './Drop';
import jwt_decode from "jwt-decode";

const EditCollectionPage = memo(props => {
  const [state, setState] = useState({
    name: '',
    brand_id: null,
    tag_id: null,
    category_id: null,
  });

  const [selected, setSelected] = useState([]);
  const [user, setUser] = useState({});
  const [brand, setBrand] = useState([]);
  const [tag, setTag] = useState([]);
  const [path, setPath] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState();
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  const [mydiv, setDiv] = useState(false);

  const { name, brand_id, tag_id, category_id } = state;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const Errortoggle = () => setErrorModal(!errormodal);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {

    var decoded = jwt_decode(localStorage.getItem('token'));
    setUser(decoded.result)
    if(!id){
      return
    }
    axios
      .get(`https://api.mazglobal.co.uk/maz-api/collections/${id}`)
      .then(response => {
        console.log("collection",response.data.data)
        setState(response.data.data);
        let server_path = [];
        server_path.push(
          'https://api.mazglobal.co.uk/' + response.data.data.path,
        );
    
        setPath(server_path);
      })
      .catch(err => console.log(err));
    // axios.get('http://localhost:8080/ecom-api/suppliers')
    // .then(res => {
    //     console.log("data",res.data.data)
    //     setBrand(res.data.data)
    // })
    // .catch(err => console.log(err));
    axios
      .get('https://api.mazglobal.co.uk/maz-api/tags')
      .then(res => setTag(res.data.data))
      .catch(err => console.log(err));
    axios
      .get('https://api.mazglobal.co.uk/maz-api/categories')
      .then(res => setCategories(res.data.data))
      .catch(err => console.log(err));
  
      axios
      .get('https://api.mazglobal.co.uk/maz-api/suppliers')
      .then(res => setSuppliers(res.data.data))
      .catch(err => console.log(err));

  }, [id]);

  const submitHandler = e => {
    e.preventDefault();
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    // if(state.coupon_code==''||state.coupon_type==''||state.coupon_description==''||state.expiry_date==''
    // ||state.discount_type==''|| state.discount_value==null || state.usage_limit_per_coupon==null ||state.usage_limit_per_user==null)
    if (state.name == '' || (!path && !file)) Errortoggle();
    else {
      // let bb=parseInt(state.brand_id);
      let cc = parseInt(state.category_id);
      let tt = parseInt(state.tag_id);
      //state.brand_id=bb;
      state.category_id = cc;
      state.tag_id = tt;

      if (file) {
        axios
          .put(
            `https://api.mazglobal.co.uk/maz-api/collections/${id}`,

            state,
          )
          .then(response => {
            var formData = new FormData();
            formData.append('imageFile', file);
     

            axios
              .post(
                `https://api.mazglobal.co.uk/maz-api/collections/uploadCollectionImage/${id}`,
                formData,
                config,
                {},
              )
              .then(res => {
              
                toggle();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => console.log(err));
      } else {
        axios
          .put(
            `https://api.mazglobal.co.uk/maz-api/collections/${id}`,

            state,
          )
          .then(response => {
            toggle();
          })
          .catch(err => console.log(err));
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
    //setFile(childData);
    setPath([])
  };

  const handleImgChange = name => e => {
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];     
      setFile(imgg);
    }
  };


  const move = () => {
    router.push('/collections/Collection');
  };

  const PostCategory = () => (
    <div className="main">
      <div className="newCoupon">
        <ToastContainer align={'right'} position={'middle'} />
        <div className="couponNav">
          <h1 className="newCouponTitle">Edit Collection</h1>
          <img
            className="couponimg"
            src="https://freepngimg.com/thumb/gift/137009-vector-surprise-birthday-gift-png-free-photo.png"
          />
        </div>

        <form className="newCouponForm" onSubmit={submitHandler}>
          <div className="newCouponItem">
            <div style={{ padding: '20px' }}>
              <label style={{ marginLeft: '0px' }}>Collection Name</label>
              <input
                type="text"
                style={{ marginLeft: '0px', width: '300px' }}
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange('name')}
              />
            </div>
            <div style={{ padding: '20px', width: '400px' }}>
              <label style={{ marginLeft: '0px' }}>Tag</label>
              <select
                className="form-control"
                id="parent"
                required
                name="tag_id"
                value={state.tag_id}
                style={{
                  marginBottom: '10px',
                  width: '300px',
                  marginLeft: '0px',
                }}
                onChange={handleChange('tag_id')}
              >
                {tag.map(it => (
                  <option value={it.id}>{it.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="newCouponItem">
            <div style={{ padding: '20px', width: '400px' }}>
              <label style={{ marginLeft: '0px' }}>Category</label>
              <select
                className="form-control"
                id="parent"
                required
                value={state.category_id}
                name="category_id"
                style={{
                  marginBottom: '10px',
                  width: '300px',
                  marginLeft: '0px',
                }}
                onChange={handleChange('category_id')}
              >
                {categories.map(it => (
                  <option value={it.id}>{it.name}</option>
                ))}
              </select>
            </div>
            {user.role_id==1 &&
            <div style={{ padding: '20px', width: '360px' }}>
            <label style={{marginLeft:'0px'}}>Supplier</label>
            <select
              className="form-control"
              id="brand"
              required
              name="brand_id"
              readonly={true}
              value={state.brand_id}
              onChange={handleChange(name)}
            >
              {suppliers.map(p => (
                <option value={p.id}>{p.name}</option>
              ))}
              <option value="null">Select Supplier</option>
            </select>
          </div>
          }
          </div>

          <div className="newCouponItem1">
            <div style={{ width: '700px', marginLeft: '20px' }}>
              <label>Image</label>

              {path.length === 0 ? (
              <input
                type="file"  
                id="name"
                placeholder="Your Category Label"
                required
                name="imageFile"
                accept='image/*'
                onChange={handleImgChange(name)}
              />
           
              ) : (
                <Drop path={path} parentCall={handleChild} />
              )}
              
            </div>
          </div>

          <div className="newCouponItem">
            <button type="submit" className="newCouponButton">
              Update
            </button>
          </div>
        </form>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Collection Updated Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={errormodal} toggle={Errortoggle}>
        <ModalHeader style={{ color: 'red' }} toggle={Errortoggle}>
          !Warning
        </ModalHeader>
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

  return <>{PostCategory()}</>;
});
export default EditCollectionPage;
