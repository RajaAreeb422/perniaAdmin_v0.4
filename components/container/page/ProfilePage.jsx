import React, { memo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Edit,
  LockOpen,
  Accessibility,
} from '@material-ui/icons';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState, useEffect } from 'react';
import '../editUser/edit.scss';
import '../editUser/add.scss';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast'
import jwt_decode from "jwt-decode";

const ProfilePage = memo(props => {
  const [user,setUser]=useState({})
const [data, setData] = useState();
const [modal, setModal] = React.useState(false);
const [movemodal, setMoveModal] = React.useState(false);
const toggle = () => setModal(!modal);
const movetoggle = () => setMoveModal(!movemodal);

const [state, setState] = useState({
  first_name: '',
  last_name: '',
  last_login: '',
  type: '',
  email: '',
  password: '',
  phone: '',
  mobile: '',
  date_of_birth: '',
});
const router = useRouter();
const { id } = router.query;
const {
  first_name,
  last_name,
  type,
  email,
  password,
  phone,
  mobile,
  date_of_birth,
} = state;

useEffect(() => {
  var decoded = jwt_decode(localStorage.getItem('token'));

  setUser(decoded.result)
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  axios
    .get(`https://api.mazglobal.co.uk/maz-api//users/${decoded.result.id}`, config)
    .then(response => {
     
      let date=''
      const d = new Date( response.data.data.last_login);
      let dd=d.toString()
      for(let i=0; i<15;i++)
      date=date+dd[i]
      response.data.data.last_login=date
    
      if (response.data.data.date_of_birth === '') {
        setState(response.data.data);
      } else {
        if (response.data.data.date_of_birth.length > 10) {
          response.data.data.date_of_birth = response.data.data.date_of_birth.substring(
            0,
            10,
          );
          setState(response.data.data);
        }
      }
            })
    .catch(error => console.log(error));

}, []);

const handleChange = names => e => {
   
  const name = e.target.name;

  let value = e.target.value;
  

  setState({
    ...state,
    [name]: value,
  });
};

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12" id="profile">
            <h1>Profile</h1>
          </Col>
        </Row>
      </Container>
      <div className="user">

    <div className="userContainer">
      <div className="userShow">
        <div className="userShowTop">
          <img
            src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
            alt=""
            className="userShowImg"
          />
          <div  style={{marginLeft:'160px'}}>
          {/* <ToastContainer align={"right"} position={"middle"}/> */}
            <span className="userShowUsername">{state.first_name} {state.last_name}</span>
            
          </div>
        </div>
        
        
        <div className="userShowBottom">
          <span className="userShowTitle">User Info</span>
          <button style={{float:'right',fontSize:'10px',width:'130px'}} 
          onClick={toggle} className="DoneButton">
          Change Password
        </button>
          <div className="userShowInfo">
            <PermIdentity className="userShowIcon" />
            <span className="userShowInfoTitle">{state.first_name+" "}{state.last_name}</span>
          </div>
          <div className="userShowInfo">
            <CalendarToday className="userShowIcon" />

            <span className="userShowInfoTitle">{state.date_of_birth}</span>
          </div>
          <div className="userShowInfo">
            <Accessibility className="userShowAccessIcon" />

            <span className="userShowInfoTitle">{state.type}</span>
          </div>
          <div className="userShowInfo">
            <LockOpen className="userShowIcon" />

            <span className="userShowInfoTitle">{state.last_login}</span>
          </div>
          <span className="userShowTitle">Contact Details</span>
          <div className="userShowInfo">
            <MailOutline className="userShowIcon" />
            <span className="userShowInfoTitle">{state.email}</span>
          </div>
          <div className="userShowInfo">
            <PhoneAndroid className="userShowIcon" />
            <span className="userShowInfoTitle">{state.phone}</span>
          </div>

          <div className="userShowInfo">
            <LocationSearching className="userShowIcon" />
            <span className="userShowInfoTitle">{state.address?state.address:"No Information"}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change Password</ModalHeader>
        <ModalBody>
             <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Current Password</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange('name')}
              />
            </div>
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>New Password</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange('name')}
              />
            </div>
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Confirm Password</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange('name')}
              />
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >
          {/* onClick={move} */}
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
    </>
  );
});

export default ProfilePage;




