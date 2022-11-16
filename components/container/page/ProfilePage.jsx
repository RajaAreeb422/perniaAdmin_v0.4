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
  console.log('local',localStorage.getItem('token'))
  console.log('lres',decoded.result)
  setUser(decoded.result)
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  axios
    .get(`https://api.mazglobal.co.uk/maz-api//users/${decoded.result.id}`, config)
    .then(response => {
      console.log("res",response)
      let date=''
      const d = new Date( response.data.data.last_login);
      let dd=d.toString()
      for(let i=0; i<15;i++)
      date=date+dd[i]
      response.data.data.last_login=date
      
      console.log(response.data.data), setData(response.data.data);
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
  console.log(name);
  let value = e.target.value;
  
  console.log(value);
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
            {/* <Container>
              <Row>
                <Col xs="12" lg="12" className="mx-auto">
                  <div className="text-center">
                    <h1 className="font-head-base text-dark mt-5">
                      Mister Chef Doe
                      <small className="h5 d-block">Master Kitchen</small>
                    </h1>
                    <Col xs="10" md="5" className="mx-auto">
                      <img
                        src="/images/profile2.jpg"
                        className="rounded-circle img-thumbnail mt-5"
                        alt="Profile"
                      />
                    </Col>
                    <div className="text-dark mt-5">
                      <p className="lead my-4 mx-0 mx-sm-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis, architecto facilis obcaecati beatae, aperiam qui
                        animi cumque corrupti, voluptatem cum libero quo.
                      </p>
                      <hr className="col-3 col-lg-3 mx-auto" />
                      <div className="my-4 mx-auto px-0 d-flex justify-content-center">
                        <a
                          href="#"
                          className="btn btn-outline-warning btn-md btn-ghost-light shadow-md mr-1"
                        >
                          Contact Me
                        </a>
                        <a
                          href="#"
                          className="btn btn-outline-warning btn-md btn-ghost-light shadow-md px-3 mr-1"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="#"
                          className="btn btn-outline-warning btn-md btn-ghost-light shadow-md px-3 mr-1"
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a
                          href="#"
                          className="btn btn-outline-warning btn-md btn-ghost-light shadow-md px-3 mr-1"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                    <div className="mx-auto text-center">
                      <a
                        href="#biography"
                        className="text-secondary scrollTo button-down"
                      >
                        Biography
                        <div className="clearfix">
                          <span className="btn text-secondary">
                            <i className="fas fa-chevron-down up-down-pulse"></i>
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </Col>
                <div id="biography">
                  <Row className="row">
                    <Col lg="3">
                      <ul className="list-navigation">
                        <li className="list-navigation-item">
                          <a className="list-navigation-link" href="#">
                            About
                          </a>
                        </li>
                        <li className="list-navigation-item">
                          <a className="list-navigation-link" href="#">
                            Background
                          </a>
                        </li>
                        <li className="list-navigation-item">
                          <a className="list-navigation-link" href="#">
                            History
                          </a>
                        </li>
                      </ul>
                    </Col>
                    <Col lg="9">
                      <h4 className="headline text-left">
                        Grew up where all the families loves to cooks
                      </h4>
                      <blockquote>
                        <p className="lead">
                          Through this Internet network, our company wishes to
                          provide a brief explanation of who we are and how we
                          think and perform our work. Our company perceived that
                          trust and support from the public is required for the
                          success of our work and business. We invite you to get
                          to know our company and product closer through this
                          internet network.
                        </p>
                        <footer>
                          Quote from:
                          <cite title="Source Title" className="text-danger">
                            (Mister Chef Doe)
                          </cite>
                        </footer>
                      </blockquote>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloribus sit maxime eius! Tempore placeat totam
                        consectetur nostrum, doloribus ratione quas molestiae
                        sit maiores.
                        <br />
                        <br />
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fuga saepe eum, optio cupiditate, minus a nulla
                        quod nemo eius laudantium dolorem quasi culpa.
                        Consequuntur commodi, rerum reprehenderit eos hic
                        possimus similique dolore reiciendis.
                      </p>

                      <p className="lead text-muted">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloribus sit maxime eius! Tempore placeat totam
                        consectetur nostrum, doloribus ratione quas molestiae
                        sit maiores. Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Fuga saepe eum, optio cupiditate,
                        minus a nulla quod nemo eius laudantium dolorem quasi
                        culpa. Consequuntur commodi, rerum reprehenderit eos hic
                        possimus similique dolore reiciendis.
                      </p>
                      <br />

                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Esse minus neque asperiores natus, voluptatem
                        numquam consequuntur sapiente? Libero illum expedita,
                        dolore id velit at dolores aut! Maxime impedit neque
                        expedita numquam, odio voluptate repudiandae.
                      </p>
                      <div>
                        Shares: &nbsp;
                        <a href="#" className="h4 mr-1">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="h4 mr-1">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="h4 mr-1">
                          <i className="fab fa-pinterest"></i>
                        </a>
                        <a href="#" className="h4 mr-1">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Row>
            </Container> */}
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




