import axios from 'axios';
import React, { memo } from 'react';
import './profile.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import jwt_decode from "jwt-decode";

toast.configure();

const ProfileBPage = ()=> {
  const [modal, setModal] = React.useState(false);
  const [logoModal, setLogoModal] = React.useState(false);
  const [user, setUser] = useState();
  const [spin, setSpin] = useState(false);
  const [imgg, setImg] = useState();
  const [errormodal, setErrorModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const logoToggle = () => setLogoModal(!logoModal);
  const errortoggle = () => setErrorModal(!errormodal);
  const [state, setState] = useState({
    id:'',
    name: '',
    address:'',
    phone:'',
    email:'',
    description:'',
    reference:'',
    logo:''
  });
  const[put,setPut]=useState()
  
  const {name,address,phone,email,description,reference} = state;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    setUser(decoded.result)
   axios.get(`https://api.mazglobal.co.uk/maz-api/suppliers/${decoded.result.supplier_id}`)
   .then(res=>{
       console.log('data',res.data.data)
       if(res.data.data.logo)
       {
       let logo='https://api.mazglobal.co.uk/'+ res.data.data.logo
       res.data.data.logo=logo
       
       }
       setState(res.data.data)
   })
   .catch(err=>console.log(err))
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .put(
        `https://api.mazglobal.co.uk/maz-api/suppliers/${user.supplier_id}`,
        put,config,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        toggle()
        
      })
      .catch(error => {
        errortoggle()
      });
  };
  const clear =  e => {
    setImg('')
    logoToggle
    router.reload()
  }
  const update =  e => {
    setSpin(true)
    const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      var formData = new FormData();
      formData.append('imageFile', imgg);
    axios
          .put(
            `https://api.mazglobal.co.uk/maz-api/suppliers/uploadBrandLogo/${state.id}`,  
            formData,
            config,
            {},
          )
          .then(res => {
              toggle()
              logoToggle()
              
            //succtoggle();
          })
      .catch(error => {
        logoToggle()
        errortoggle()
        console.log(error);
      });
  }
  const handleImgChange = name => e => {
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];
      
      setImg(imgg);
    }
  };

  const load =e=>{
    router.reload()
  }
  const changeLogo =e=>{
    setImg('')
    state.logo=''
  }
  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    
    setState({
      ...state,
      [name]: value,
    });
    setPut({
      ...put,
      [name]:value
    })
  
  };

  const PostCategory = () => (
    <div className="profilemain">
      <div className="profile">
        <h1 className="profileTitle">{state.name}</h1>
        <form className="profileForm" onSubmit={submitHandler}>
          <div className="profileItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Company Name"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
          {/* <div className="profileItem">
            <label for="exampleInputName">Logo</label>
            <DropLogo parentCall={handleChild}/>
          </div> */}
          <div className="profileFlexItem">
             <div className='profileinnerBox'>
            <label for="exampleInputName">Email</label>
            <input
              type="email"
              name='email'
              required
              placeholder='abc123@gmail.com'
              value={state.email}
               onChange={handleChange('email')}
            />
          </div> 
             <div className='profileinnerBox'style={{marginLeft:'5px'}}>
            <label for="exampleInputName">Phone</label>
            <input
              type="tel"
              name='phone'
              required
              placeholder='051-228'
              value={state.phone}
              onChange={handleChange('phone')}
            />
          </div> 
          </div>
          
          <div className="profileItem">
            <label for="exampleInputName">Branch Address</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Branch Location"
              required
              name="address"
              value={state.address}
              onChange={handleChange(name)}
            />
          </div>
          <div className="profileItem">
            <label for="exampleInputReference">Reference Link</label>
            <input
              type="text"
              className="catlabel"
              id="reference"
              placeholder="Page/Website Link"
              required
              name="reference"
              value={state.reference}
              onChange={handleChange(name)}
            />
          </div>

        
          <div className="profiledesp">
            <label for="exampleInputName">Description</label>
            <input
              type="text"
              id="descp"
              required
              name="description"
              value={state.description}
               onChange={handleChange(name)}
            />
          </div>
          <div className="profileItem" style={{display:'flex',flexDirection:'row'}}>
     
            <button type="submit" className="profileButton">
              Update
            </button>
            <button type="button" className="profileButton" onClick={logoToggle}>
              Update Logo
            </button>
            
          </div>
        </form>
      </div>
      
      <Modal isOpen={modal} toggle={toggle}>
       
        <ModalBody>
          <> Brand Profile Updated Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={load}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
      <Modal isOpen={logoModal} toggle={logoToggle}>
       
       <ModalBody>
         <>
         {state.logo ?
         <img style={{width:'100%'}} src={state.logo}>
         </img>:
         <div>
              <label
                for="exampleInputName"
              >
                Upload Logo
              </label>
              <input
              
                type="file"
                
                id="name"
                placeholder="Your Logo"
                required
                name="imageFile"
                accept='image/*'
                onChange={handleImgChange(name)}
              />
              {spin &&
              <h3>Updating.....</h3>

              }
         </div>
         }
          
         </>
       </ModalBody>
       <ModalFooter>
        {imgg ?
         <Button color="primary" onClick={update}>
           Update
         </Button>:
         <Button color="primary" onClick={changeLogo}>
         Change
       </Button>
        }
         <Button color="primary" onClick={clear}>
           Cancel
         </Button>
       </ModalFooter>
     </Modal>

      <Modal isOpen={errormodal} toggle={errortoggle}>
        <ModalHeader style={{color:'red'}} toggle={errortoggle}>Error</ModalHeader>
        <ModalBody>
          <>!OOPs soory something went wrong.Try Again</>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary" onClick={errortoggle}>
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
};
export default ProfileBPage;
