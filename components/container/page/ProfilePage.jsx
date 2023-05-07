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
const [newPassword,setNewPassword]=useState({})
const [confirmPswd,setConfirmPassword]=useState({})
const [msg, setMsg] = useState();
const [modal, setModal] = React.useState(false);
const [msgmodal, setMsgModal] = React.useState(false);
const [infomodal, setInfoModal] = React.useState(false);
const [movemodal, setMoveModal] = React.useState(false);
const toggle = () => setModal(!modal);
const msgtoggle = () => setMsgModal(!msgmodal);
const infotoggle = () => setInfoModal(!infomodal);
const movetoggle = () => setMoveModal(!movemodal);
const [info, setInfo] = useState({})
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
    .get(`https://api.mazglobal.co.uk/maz-api/users/${decoded.result.id}`, config)
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

const handleChange =  e => {
   
  const name = e.target.name;

  let value = e.target.value;
  setNewPassword(value);
};
const handleConfirmChange =  e => {
   
  const name = e.target.name;

  let value = e.target.value;
  setConfirmPassword(value);
};
const handleInfoChange = e => {
   
  const name = e.target.name;

  let value = e.target.value;
  

  setInfo({
    ...info,
    [name]: value,
  });
};

const updateInfo = ()=> {
//https://api.mazglobal.co.uk/maz-api


if(info.email==undefined && !info.email)
{
   info.email=state.email
}
if(info.first_name==undefined && info.last_name==undefined)
{
  infotoggle()
  setMsg('Please Fill Out First Name And Last Name Fields')
  msgtoggle()
}
else{
  axios
  .put(`https://api.mazglobal.co.uk/maz-api/users/${user.id}`,info)
  .then(response => {
    setMsg(response.data.message)
    infotoggle()
    msgtoggle()
  }).catch(err=>{
    setMsg(err.response.data.message)
    infotoggle()
    msgtoggle()
  })
}
};

const updatePassword= ()=> {
  //https://api.mazglobal.co.uk/maz-api
  
  
  if(newPassword==null && confirmPswd==null)
  {
    toggle()
    setMsg('Please Fill Out All Fields')
    msgtoggle()
  }
  else if(newPassword!==confirmPswd)
  {
    toggle()
    setMsg('Password do not matched.')
    msgtoggle()
  }
  else{
    //
    axios
    .put(`https://api.mazglobal.co.uk/maz-api/users/account/updatePassword/${user.id}`,{newPassword})
    .then(response => {
      setMsg(response.data.message)
      toggle()
      msgtoggle()
    }).catch(err=>{
      setMsg(err.response.data.message)
      toggle()
      msgtoggle()
    })
  }
  };

const load=()=>{
  router.reload()
}

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
          <button style={{float:'right',fontSize:'10px'}} 
          onClick={toggle} className="DoneButton">
          Change Password
        </button>
          <button style={{float:'right',fontSize:'10px'}} 
          onClick={infotoggle} className="DoneButton">
          Edit Info 
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
              <label  style={{marginLeft:'0px'}}>New Password</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                className="form-control"
                name="password"
                value={state.name}
                onChange={e=>handleChange(e)}
              />
            </div>
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Confirm Password</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                className="form-control"
                name="confirmpassword"
                value={state.name}
                onChange={e=>handleConfirmChange(e)}
              />
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updatePassword}>
      
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
     
      <Modal isOpen={infomodal} toggle={infotoggle}>
        <ModalHeader toggle={infotoggle}>My Info</ModalHeader>
        <ModalBody>
             <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>First Name</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                className="form-control"
                required
                name="first_name"
                value={info.first_name}
                onChange={e=>handleInfoChange(e)}
              />
            </div>
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Last Name</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder=""
                required
                className="form-control"
                name="last_name"
                value={info.last_name}
                onChange={e=>handleInfoChange(e)}
              />
            </div>
            <div style={{padding:'20px'}}>
              <label  style={{marginLeft:'0px'}}>Email</label>
              <input
                type="text"
                style={{marginLeft:'0px',width:'300px'}}
                placeholder={state.email}
                required
                className="form-control"
                name="email"
                value={info.email}
                onChange={e=>handleInfoChange(e)}
              />
            </div>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={updateInfo}>
            Update
          </Button>
         
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={msgmodal} toggle={msgtoggle}>
        <ModalHeader toggle={msgtoggle}></ModalHeader>
        <ModalBody>
             <>
             <p>{msg}</p>
             </>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={load}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>



    </>
  );
});

export default ProfilePage;




