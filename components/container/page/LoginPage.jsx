import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Alert,
  FormFeedback,
  FormText,
  FormControl,
} from 'reactstrap';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import validator from 'validator'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Error, LabelImportantOutlined } from '@material-ui/icons';

const LoginPage = () => {
  const [validate, setField] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(validate);
  const router = useRouter();
  const [disable, setDisable] = useState(true);
  const [access, setPermison] = useState(false);
  const [resMessg, setResponseMsg] = useState('')
  const [remail, setREmail] = useState({
    email:''
  })
  const [forgotmodal, setForgotModal] = React.useState(false);
  const forgottoggle = () => setForgotModal(!forgotmodal);
  const [responsemodal, setResponseModal] = React.useState(false);
  const responsetoggle = () => setResponseModal(!responsemodal);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleChange = names => e => {
    const name = names;
  
    const value = e.target.value;
    const v = '';
   
    if (name == 'email') {
      setField({
        ...validate,
        [name]: value,
      });
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(value)) {
        const v = 'has-success';
      } else {
        const v = 'has-danger';
      }

      //  if(validate.password!="")
      //  setDisable(false);
    }

    if (name == 'password') {
      if (validate.email != '') {
        setField({
          ...validate,
          [name]: value,
        });
        setDisable(true);
        if (validate.password.length > 3) {
          setDisable(false);
     
        }
      }
      // }
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    axios
      .post(
        `https://api.mazglobal.co.uk/maz-api//users/login`,
        { email: validate.email, password: validate.password },

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        console.log(response.data);
        if (response.data.success == 1) {
          

          localStorage.setItem('token', response.data.token);
        
          router.push('/home/Home');
        } else {
          setPermison(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const forgetpassword = () => {

    console.log('in forgett')
    forgottoggle()
  }
  const validateEmail = (e) => {
    let email=e.target.value
   if(email=='')
   {
     setError('')
   }
   else if (validator.isEmail(email)) {

     setREmail({email:e.target.value})
     setError('')
   } else {
     setError("Invalid Email.Please Enter Correct format abc123@xyz.com")
   }
 }
 
 const chkemail = () => {
     
   //https://api.mazglobal.co.uk/maz-api
     axios.post(`https://api.mazglobal.co.uk/maz-api/users/account/forgotPasswordByAdmin`, remail,
            { headers: { 'content-type': 'application/json' } }
         ).then(response => {
          forgottoggle()
  
           setResponseMsg(`${response.data.message}`)
           responsetoggle()

              
             }).catch((err) => {
          
              forgottoggle()
              setResponseMsg(`${err.response.data.message}`)
              responsetoggle()
        
                
             });
 
 
           
 
 };
 

  return (
    <>
    <Card className="w-25 box-shadow">
       
      <CardBody>
        <Form onSubmit={submitHandler}>
          <fieldset>
            <legend className="text-primary bg-gradient-primary font-weight-bold uppercase">
              <h3 className="mt-2 ml-3 text-light text-center">Login</h3>
            </legend>
            <FormGroup style={{ width: '80%'}}>
              <Label for="exampleInputEmail3" >
                Email address
              </Label>
              <Input
                type="email"
                className="form-control"
                style={{ width: '350px'}}
                id="exampleInputEmail3"
                name="email"
                value={validate.email}
                aria-describedby="emailHelp"
                onChange={handleChange('email')}
              />
            </FormGroup>
            <FormGroup style={{ width: '80%' }}>
              <Label for="exampleInputPassword3" s >
                Password
              </Label>

              <Input
                type={values.showPassword ? 'text' : 'password'}
                value={validate.password}
                className="form-control"
                style={{ width: '350px'}}
                name="password"
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck3"
              />
            </FormGroup>
          </fieldset>
          {/* disabled={disable} */}
          <Button
            color="primary"
            block
            size="lg"
            className="mt-2"
          >
            Submit
          </Button>
          {access && <Alert color="danger">Invalid email or password</Alert>}
          
        </Form>
        <p style={{cursor:'pointer',textDecoration:'underline'}} onClick={()=>forgetpassword()}>Forget Password ?</p>
      </CardBody>
    </Card>

    <Modal isOpen={forgotmodal} toggle={forgottoggle}>
          <ModalBody>
            
            <Input style={{width:'100%'}}
             type='email' name='email' placeholder='Enter Registered Email'
             error={error}
              onChange={(e) => validateEmail(e)}>
            </Input>
           
           
          </ModalBody>
          <ModalFooter>
            {remail.email!='' && error==''?
            <Button color="primary" onClick={chkemail}>
              Okay
            </Button>:''
             }
          </ModalFooter>
        </Modal>

        <Modal isOpen={responsemodal} toggle={responsetoggle}>
       
          <ModalBody>
            <p style={{color:'red'}}>{resMessg}</p>
          </ModalBody>
          <ModalFooter>
      
            <Button color="primary" onClick={responsetoggle}>
              Okay
            </Button>
       
          </ModalFooter>
        </Modal>
    </>
  );

};

export default LoginPage;
