import React, { memo } from 'react';
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

import { useState, useEffect } from 'react';
import './edit.scss';
import './add.scss';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast'
// import {toast} from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.scss';
// toast.configure()


const EditUserPage = memo(props => {
  const [data, setData] = useState();
  const [catgry, setCatgry] = useState([]);
  const [shipp, setShipping] = useState([]);
  const [user_Id, setUserId] = useState(null);
  const [mydiv, setDiv] = useState(false);
  const [shipdiv, setShipDiv] = useState(false);
  const [billdiv, setBillDiv] = useState(false);
  const [editshipdiv, setEditShipDiv] = useState(false);
  const [editbilldiv, setEditBillDiv] = useState(false);
  const [newshipdiv, setNewShipDiv] = useState(false);
  const [modal, setModal] = React.useState(false);
  const [movemodal, setMoveModal] = React.useState(false);
  const [billinfo, setBillInfo] = useState();
  const [shipinfo, setShipInfo] = useState();
  const [billput, setBillPut] = useState();
  const [shipput, setShipPut] = useState();
  const [newshipput, setNewShipPut] = useState();
  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  
  const toggle = () => setModal(!modal);
  const movetoggle = () => setMoveModal(!movemodal);
  const [bill, setAddresses] = useState({
    id: null,
    user_address: '',
    type: '',
    name: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
  });
  const [ship, setShip] = useState({
    id: null,
    user_address: '',
    type: '',
    name: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
  });
  const [newship, setNewShip] = useState({
    id: null,
    user_address: '',
    type: '',
    name: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
  });

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
  
  //for submition of new ship address form
  const submitHandler=(e)=>{
    e.preventDefault();
 
   ship.type='shipping'
    axios.post(`http://95.111.240.143:8080/ecom-api/addresses/${id}`,ship,
  
  {headers: { 'content-type': 'application/json' }}
  )
  .then(response=>{
    
    toast.notify(`New Address Added Succesfully`,{
      type:'success'
    })
    setNewShipDiv(false)
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const ship_arr = [];
    const selected_ship = [];
    axios
      .get(`http://95.111.240.143:8080/ecom-api/addresses/${id}`, config)
      .then(response => {
        var i = 0;
        response.data.data.map(item => {
          if (item.type == 'shipping') {
            if (i == 0) {
             
              ship_arr.push(item);
              setShipInfo({
                id:item.id
              })
             
              setRadiobtn({
                selected:item.id
              })
              
              i = i + 1;
            }
            else{
              ship_arr.push(item);
            }
            
          } else''
           
          }
        );
        setShipping(ship_arr);
        
        
        
      })
      .catch(err => console.log(err));

  } 
  )
  .catch(error=>{
    toast.notify(`Opps some problem occured! Try Again`,{
      type:'error'
    })
    console.log(error)
  })
}

//for submition of edit bill address form
  const submitEditBillHandler = e => {
    e.preventDefault();

    newship.type = 'billing';
    axios
      .put(
        `http://95.111.240.143:8080/ecom-api/addresses/${newship.id}`,
        billput,
      )
      .then(response => {
       
        toast.notify(`Billing Address Updated!`,{
          type:'success'
        })
        setEditBillDiv(false);
        
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };
        setAddresses(newship);
      }).catch(err=>{
        toast.notify(`OPPs some problem occured! Try Again`,{
          type:'danger'
        })
      });
  };
//for submition of edit ship address form
  const submitEditHandler=(e)=>{
    e.preventDefault();
    
    newship.type='shipping'
    axios.put(`http://95.111.240.143:8080/ecom-api/addresses/${newship.id}`,newshipput)
  .then(response=>{

    toast.notify(`Shipping Address Updated!`,{
      type:'success'
    })
    setEditShipDiv(false)
   
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      
      
  
      const ship_arr = [];
      
      axios
        .get(`http://95.111.240.143:8080/ecom-api/addresses/${id}`, config)
        .then(response => {
          var i = 0;
          response.data.data.map(item => {
            if (item.type == 'shipping') {
              if (i == 0) {
               
                ship_arr.push(item);
                 setShipInfo({
                   id:item.id
                 })
                
                setRadiobtn({
                  selected:item.id
                })
                
                i = i + 1;
              }
              else{
                ship_arr.push(item);
              }
              
            } else '';
          });
          setShipping(ship_arr);
          
          
          
        })
        .catch(err => {
          
          console.log(err)});
 
   
  } 
  )
  .catch(error=>{
    toast.notify(`Opps some problem occured! Try Again`,{
      type:'danger'
    })
    console.log(error)
  })
  }

  //for new shipping address
  const handleChange = (name) => (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
   
      
  //     [name]: value
  // })

    setShip({
        ...ship,
        [name]: value
    })
   
  }

  //For change or edit in billing address
  const handleEditChange = name => e => {
    
    const name = e.target.name;
    const value = e.target.value;
 
   
    setBillPut({
      [name]: value
    })
    setNewShip({
      ...newship,
      [name]: value,
    });
  };

//For change or edit in shipping address
  const handleEditShipChange = name => e => {
    
    const name = e.target.name;
    const value = e.target.value;
   
   
    setNewShipPut({
      [name]: value
    })
    setNewShip({
      ...newship,
      [name]: value,
    });
  };






  const handleradioChange = item => e => {
    setRadiobtn({
      selected: e.target.value,
    });

  };
  
  const shipdetails = () => {
    if (newshipdiv == false) setNewShipDiv(true);
  };
  const billdetails = () => {
    if (editbilldiv == false) setBillDiv(true);
  };

  function editshipdetails(id) {
      shipp.map(item => {
      if (item.id == id) setNewShip(item);
    });
    if (shipdiv == false) {
      setEditShipDiv(true);
    }
  }
  function editbilldetails(id) {
    if (bill.id == id) setNewShip(bill);

    if (billdiv == false) {
      setEditBillDiv(true);
    }
  }




  useEffect(() => {
    let mounted = true;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
   
    axios
      .get(`http://95.111.240.143:8080/ecom-api/users/${id}`, config)
      .then(response => {
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
      var ship_arr = [];
        axios
          .get(`http://95.111.240.143:8080/ecom-api/addresses/${id}`, config)
          .then(response => {
        
            var i=0
              response.data.data.map(item => {
                if (item.type === 'shipping') {
                  if (i === 0) {
                    setShipInfo({
                      id: item.id,
                    });

                    ship_arr.push(item);
                    setRadiobtn({
                      selected: item.id,
                    });
                    i = i + 1;
                  } else {
                    ship_arr.push(item);
                  }
                }
                if (item.type === 'billing') {
                  setBillInfo({
                    id: item.id,
                  });
                  setAddresses(item);
                }
              });
            setShipping(ship_arr);
          })
          .catch((err => console.log(err)));


    return () => (mounted = false);
  }, []);

  return (
    <div className="user">
     
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link href="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
            <ToastContainer align={"right"} position={"middle"}/>
              <span className="userShowUsername">{state.first_name}</span>
              <span className="userShowUserTitle">{state.last_name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">User Info</span>
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
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Addresses</span>
          <div className="productTopRight">
            <h4>Billing Address</h4>
            <div >
              <div className="userBillingInfo">
              <label> {bill.user_address}</label>
              {/* className="billedit" */}
               <Edit 
                onClick={() => editbilldetails(bill.id)}
                 style={{cursor:'pointer'}}
              ></Edit>
              </div>
               {/* // Bill Address Edit Form */}
              {editbilldiv && (
                <>
                  <form
                    onSubmit={submitEditBillHandler}
                   // className="newUserForm"
                  >
                    <div className="newUserBillItem2">
                      <div className="textarea1">
                        <label>Address</label>
                        <input
                          type="text"
                          placeholder={newship.user_address}
                          className="form-control"
                          name="user_address"
                          //className="gap"
                          required
                          value={newship.user_address}
                          onChange={handleEditChange('user_address')}
                        />
                      </div>
                    
                      <div className="textarea2">
                        <label>Title</label>
                        <input
                          type="text"
                          placeholder="Type Title"
                          className="form-control"
                          name="name"
                          required
                          value={newship.name}
                          onChange={handleEditChange('name')}
                        />
                      </div>
                    </div>

                    <div className="newUserBillItem">
                      <div className="textarea1">
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          value={newship.city}
                          required
                          className="gap"
                          placeholder="Your City"
                          onChange={handleEditChange('city')}
                        />
                      </div>

                      <div className="textarea2">
                        <label>Postal Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          value={newship.postal_code}
                          required
                          placeholder="City Code"
                          onChange={handleEditChange('postal_code')}
                        />
                      </div>
                    </div>

                    <div className="newUserBillItem">
                      <div className="textarea1">
                        <label>Country</label>
                        <input
                          type="text"
                          name="country"
                          value={newship.country}
                          className="gap"
                          required
                          placeholder="Your Country"
                          onChange={handleEditChange('country')}
                        />
                      </div>

                      <div className="textarea2">
                        <label>State/Province</label>
                        <input
                          type="text"
                          name="province"
                          value={newship.province}
                          required
                          placeholder="Your State"
                          onChange={handleEditChange('province')}
                        />
                      </div>
                    </div>
                    <div className='btns'>
                    <button type="submit" className="DoneButton">
                      Update
                    </button>
                    <button
                    style={{marginLeft:'260px'}}
                      onClick={() => setEditBillDiv(false)}
                      className="CloseButton"
                    >
                      Close
                    </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          
          <div className="productTopRight" style={{marginTop:'50px'}}>
          <div className="addshipadrs" >
            <h4>Shipping Address</h4>
           
                    <button onClick={shipdetails} className="shipbtn">
                      Add Address
                    </button>
                  </div>
           
            <div className="userShippingInfo">
                  {/* // Shipping List */}
                    {shipp.map(item => {
                      return (
                        <div className='radiobtuns'>
                        <div>
                        
                            <input
                              type="radio"
                              name="address"
                              value={item.id}
                              checked={radio.selected === item.id?true:radio.selected==item.id}
                              onChange={handleradioChange(item)}
                            />
                            <label className="user_address">
                              {item.user_address}
                            </label>
                          </div>
                        
                            <Edit style={{cursor:'pointer'}}
                              onClick={() => editshipdetails(item.id)}
                            ></Edit>
                            
                          </div>
                      );
                    })}
                   
                    {/* // New Ship Address Form */}
                    {newshipdiv && (
                      <>
                        

                        <form onSubmit={submitHandler} className="newUserForm">
                          <div className="newUserBillItem2">
                            <div className="textarea1" >
                              <label>Address</label>
                              <input
                                type="text"
                                placeholder="Type Address"
                                className="gap"
                                required
                                name="user_address"
                                value={ship.user_address}
                                onChange={handleChange("user_address")}
                              />
                            </div>
                        
                            <div className="textarea2">
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Type Title"
                                className="form-control"
                                name="name"
                                required
                                value={ship.name}

                                onChange={handleChange("name")}
                              />
                            </div>
                          </div>

                          <div className="newUserBillItem2">
                          <div className="textarea1">
                              <label >City</label>
                              <input
                                type="text"
                                name="city"
                                value={ship.city}
                                className="gap"
                                required
                                placeholder="Your City"
                                onChange={handleChange("city") }
                              />
                            
                          </div>
                          
                          <div className="textarea2">
                              <label >Postal Code</label>
                              <input
                                type="text"
                                name="postal_code"
                                required
                                value={ship.postal_code}
                               
                                placeholder="City Code"
                                onChange={handleChange("postal_code") }
                              />
                            
                          </div>
                          </div>
                           
                           
                          <div className="newUserBillItem2">
                          <div className="textarea1">
                              <label >Country</label>
                              <input
                                type="text"
                                name="country"
                                value={ship.country}
                                className="gap"
                                required
                                placeholder="Your Country"
                                onChange={handleChange("country") }
                              />
                            
                          </div>
                          
                          <div className="textarea2">
                              <label >State/Province</label>
                              <input
                                type="text"
                                name="province"
                                value={ship.province}
                                placeholder="Your State"
                                required
                                onChange={handleChange("province") }
                              />
                            
                          </div>
                          </div>
                           <div className="btns"> 
                          <button type="submit" className="DoneButton">
                            Add
                          </button>
                          <button
                            style={{marginLeft:'260px'}}
                            onClick={() => setNewShipDiv(false)}
                            className="CloseButton"
                          >
                            Close
                          </button>
                           </div> 
                        </form>
                      </>
                    )}
                   {/* //Ship Address Edit Form */}
                    {editshipdiv && (
                      <>
                     

                        <form onSubmit={submitEditHandler} className="newUserForm">
                          <div className="newUserBillItem2">
                            <div className="textarea1">
                              <label>Address</label>
                              <input
                                type="text"
                                placeholder="Type Address"
                                className="gap"
                                name="user_address"
                                required
                                value={newship.user_address}
                                onChange={handleEditShipChange("user_address")}
                              />
                            </div>
                          
                            <div className="textarea2">
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Type Title"
                                className="form-control"
                                name="name"
                                required
                                value={newship.name}

                                onChange={handleEditShipChange("name")}
                              />
                            </div>
                          </div>

                          <div className="newUserBillItem2">
                          <div className="textarea1">
                              <label >City</label>
                              <input
                                type="text"
                                name="city"
                                value={newship.city}
                                className="gap"
                                required
                                placeholder="Your City"
                                onChange={handleEditChange("city") }
                              />
                            
                          </div>
                          
                          <div className="textarea2">
                              <label >Postal Code</label>
                              <input
                                type="text"
                                name="postal_code"
                                value={newship.postal_code}
                                required
                                placeholder="City Code"
                                onChange={handleEditShipChange("postal_code") }
                              />
                            
                          </div>
                          </div>
                           
                           
                          <div className="newUserBillItem2">
                          <div className="textarea1">
                              <label >Country</label>
                              <input
                                type="text"
                                name="country"
                                value={newship.country}
                                className="gap"
                                required
                                placeholder="Your Country"
                                onChange={handleEditShipChange("country") }
                              />
                            
                          </div>
                          
                          <div className="textarea2">
                              <label >State/Province</label>
                              <input
                                type="text"
                                name="province"
                                value={newship.province}
                                required
                                placeholder="Your State"
                                onChange={handleEditShipChange("province") }
                              />
                            
                          </div>
                          </div>
                          <div className='btns'>
                          <button type="submit" className="DoneButton">
                            Update
                          </button>
                          <button
                          style={{marginLeft:'260px'}}
                            onClick={() => setEditShipDiv(false)}
                            className="CloseButton"
                          >
                            Close
                          </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                  
          
                   </div>

        </div>
      </div>
    </div>
  );
});

export default EditUserPage;
