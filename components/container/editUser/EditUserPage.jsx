import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import './edit.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import router from 'next/router';
import { AirlineSeatIndividualSuite } from '@material-ui/icons';
import jwt_decode from 'jwt-decode';
//import {toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//toast.configure();

const EditUserPage = memo(props => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    type: '',
    role_id: null,
    supplier_id: null,
    phone: '',
    mobile: '',
    date_of_birth: '',
  });

  const [newstate, setNewState] = useState({});
  const [newPassword, setNewPswrd] = useState();
  const [cnfrmPassword, setCnfrmPswrd] = useState();
  const [message, setMessage] = useState();
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState();
  const [role, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [mydiv, setDiv] = useState(false);

  const {
    first_name,
    last_name,
    email,
    password,
    role_id,
    supplier_id,
    phone,
    mobile,
    date_of_birth,
  } = state;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [pswdModal, setPswdModal] = React.useState(false);
  const [successpmodal, setSuccessPModal] = React.useState(false);
  const successPswrdToggle = () => setSuccessPModal(!successpmodal);
  const pswdtoggle = () => setPswdModal(!pswdModal);
  const [errormodal, setErrorModal] = React.useState(false);
  const errortoggle = () => setErrorModal(!errormodal);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    //https://api.mazglobal.co.uk/maz-api
    axios
      .get(`https://api.mazglobal.co.uk/maz-api/users/${id}`, config)
      .then(response => {
        if (response.data.data.supplier_id) {
          axios
            .get(
              `https://api.mazglobal.co.uk/maz-api/suppliers/${response.data.data.supplier_id}`,
            )
            .then(resp => {
              setBrand(resp.data.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
        console.log('data', response.data.data);
        setState(response.data.data);

        // if(response.data.data.role_id==1)
        // {
        //   typ='super admin'
        // }
        // else if(response.data.data.role_id==2)
        // {
        //   typ='admin'
        // }
        // else if(response.data.data.role_id==2)
        // {
        //   typ='user'
        // }
        // else{
        //   typ='guest'
        // }

        // setState({
        //   ...state,
        //   type:typ
        // })
      })
      .catch(err => console.log(err));
  }, [id]);

  const submitHandler = e => {
    //e.preventDefault();

    // const config = {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token'),
    //   },
    // };
    //https://api.mazglobal.co.uk/maz-api/users/adminSignup
    newstate['email'] = state.email;
 
    axios
      .put(`https://api.mazglobal.co.uk/maz-api/users/${id}`, newstate, {})
      .then(response => {
        
        toggle();
      })
      .catch(error => {
        console.log('err', error.response);
        setError(error.response.data.message);
        errortoggle();
      });
  };

  const handleChange = names => e => {
    const name = e.target.name;

    const value = e.target.value;

    setNewState({
      ...newstate,
      [name]: value,
    });
    setState({
      ...state,
      [name]: value,
    });
  };

  const handlePaswordChange = e => {
    setNewPswrd(e.target.value);
    setMessage('');
  };

  const handleCPaswordChange = e => {
    setCnfrmPswrd(e.target.value);
  };
  const move = () => {
    router.push('/users/Users');
  };

  const updatePassword = () => {
    if (cnfrmPassword != newPassword) {
      setMessage("Password Doesn't matched");
    } else {
      //https://api.mazglobal.co.uk/maz-api
      console.log('new',newPassword)
      axios
      .put(`https://api.mazglobal.co.uk/maz-api/users/account/updatePassword/${id}`, {newPassword},{})
      .then(response => {
        console.log('resss', response.data.data);
        pswdtoggle()
        successPswrdToggle();
      })
      .catch(error => {
        console.log('err', error.response);
        pswdtoggle()
        setError(error.response.data.message);
        errortoggle();
      });

    }
  };
  // className="newUserForm"

  const PostCategory = () => (
    <div className="main">
      <div className="newUser">
        <h1 className="newUserTitle">Edit User</h1>
        <div className="updatePswdBtn" onClick={pswdtoggle}>
          Update Password
        </div>

        <div>
          <div className="newUserItem">
            <div className="form-group">
              <label>User Type</label>
              <select
                className="form-control"
                id="parent"
                required
                readonly="true"
                name="role_id"
                onChange={handleChange('role_id')}
              >
                <option value={state.role_id}>{state.type}</option>
                {/* {role.map(it => (
                  user.role_id==2 && it.id==1?<div></div>:
                  <option value={it.id}>{it.role}</option>
                ))} */}
              </select>
            </div>
          </div>
          {brand && (
            <div className="newUserItem">
              <div className="form-group">
                <label>Brand</label>
                <select
                  className="form-control"
                  id="parent"
                  required
                  name="supplier_id"
                  onChange={handleChange('supplier_id')}
                >
                  <option value={brand.id}>{brand.name}</option>
                  {/* {brand.map(it => (
                  <option value={it.id}>{it.name}</option>
                ))} */}
                </select>
              </div>
            </div>
          )}
          <div className="newUserItem">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                placeholder="First Name"
                className="form-control"
                name="first_name"
                required
                value={state.first_name}
                onChange={handleChange('first_name')}
              />
            </div>
          </div>
          <div className="newUserItem">
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="last_name"
                value={state.last_name}
                className="form-control"
                required
                placeholder="Last name"
                onChange={handleChange('last_name')}
              />
            </div>
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={state.date_of_birth}
                placeholder="Birthday"
                name="date_of_birth"
                onChange={handleChange('date_of_birth')}
                className="form-control"
              />
            </div>
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={state.email}
                placeholder="Email"
                name="email"
                required
                onChange={handleChange('email')}
                className="form-control"
              />
            </div>
            {mydiv && <div style={{ color: 'red' }}>{error}</div>}
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Phone no</label>
              <input
                type="tel"
                name="phone"
                value={state.phone}
                placeholder="Phone no"
                onChange={handleChange('phone')}
                className="form-control"
              />
            </div>
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Mobile no</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={state.mobile}
                onChange={handleChange('mobile')}
                className="form-control"
              />
            </div>
          </div>
          {/* <div className="newUserItem">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                required
                onChange={handleChange('password')}
                className="form-control"
              />
            </div>
          </div> */}

          <div className="newUserItem">
            <button onClick={submitHandler} className="newUserButton">
              Update
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Success</ModalHeader>
        <ModalBody>
          <>User Updated Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={successpmodal} toggle={successPswrdToggle}>
        <ModalHeader toggle={successPswrdToggle}>Success</ModalHeader>
        <ModalBody>
          <>User's Password Updated Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={successPswrdToggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={pswdModal} toggle={pswdtoggle}>
        <ModalHeader toggle={pswdtoggle}>Update Password</ModalHeader>
        <ModalBody>
          <div className="updatePswrdDiv">
            <label>New Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={newPassword}
              onChange={e => handlePaswordChange(e)}
            ></input>
            <label>Confirm Password</label>
            <input
              type="text"
              className="form-control"
              name="confirm_password"
              value={cnfrmPassword}
              onChange={e => handleCPaswordChange(e)}
            ></input>
            {message && <p style={{ color: 'red' }}>{message}</p>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!newPassword && !cnfrmPassword}
            color="primary"
            onClick={updatePassword}
          >
            Update
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={errormodal} toggle={errortoggle}>
        <ModalHeader toggle={errortoggle}>Alert</ModalHeader>
        <ModalBody>
          <>{error}.</>
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
export default EditUserPage;
