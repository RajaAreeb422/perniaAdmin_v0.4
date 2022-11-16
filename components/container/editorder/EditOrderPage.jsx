import axios from 'axios';
import React, { memo } from 'react';
import { Publish } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Edit } from '@material-ui/icons';
import styled from 'styled-components';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './editorder.scss';
import { useRouter } from 'next/router';
import EditShoppingCart from './EditShoppingCart';
import { toast, ToastContainer } from 'react-nextjs-toast';

const EditOrderPage = memo(props => {
  const [text, setText] = useState('');
  //const { addToast } = useToasts();
  const [protext, setProText] = useState('');
  const [nproduct, setNewProduct] = useState([]);
  const [list, setList] = useState(false);
  const [prolist, setProList] = useState(false);
  const [shipp, setShipping] = useState([]);
  const [combdiv, setCombDiv] = useState(false);
  const [comVal, setComVal] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [wholetotal, setWholeTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [dvalue, setDValue] = useState(0);
  const [sum, setSum] = useState(0);
  const [pay, setPay] = useState('');
  const [dlv, setDelievry] = useState('');
  const router = useRouter();
  const { id } = router.query;
  // Toggle for Modal
  const toggle = () => setModal(!modal);
  const [billput, setBillPut] = useState();
  const [shipput, setShipPut] = useState();
   //for current billing address
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
 
  
  //for new billing address
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
  //for current shipping address
  const [currentship, setCurrentShip] = useState({
    id: null,
    user_address: '',
    type: '',
    name: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
  });
 
  const [addship, setAddShip] = useState({
    id: null,
    user_address: '',
    type: '',
    name: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
  });
  
  const [o_data, setO_Data] = useState({
        
  userId:null,
  products:[],
  orderInfo:{},
  billing_info:{id:null},
  shipping_info:{id:null}
  
});

  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  const [user_Id, setUserId] = useState(null);
  const [state, setOrder] = useState({
    o_id: null,
    user_id: null,
    total_amount: null,
    shipping_id: null,
    billing_id: null,
    date: '',
    payment_status: '',
    fulfillment_status: '',
    total_items: null,
    delivery_method: '',
    payment_method: '',
    products: [],
    product_variant_name: [
      {
        name: 'size',
        values: ['small', 'large', 'xl', 'medium'],
      },
      {
        name: 'color',
        values: ['Red', 'blue', 'black', 'green', 'white'],
      },
      {
        name: 'medium',
        values: ['cotton', 'rubber', 'plastic'],
      },
    ],
  });
  const {
    o_id,
    user_id,
    total_amount,
    shipping_id,
    billing_id,
    date,
    payment_status,
    fulfillment_status,
    total_items,
    delivery_method,
    payment_method,
    products,
    product_variant_name
  } = state;
  //const [data, setState] = useState([]);
  const [prodata, setProData] = useState([]);
  const [product, setProduct] = useState([]);
 
  const [combination, setCombination] = useState([]);
  const [shipId, setShipId] = useState(null);
  const [billId, setBillId] = useState(null);
  const [profilterrow, setProFilterrow] = useState([]);
  const [mydiv, setDiv] = useState(false);
  const [shipdiv, setShipDiv] = useState(false);
  const [billdiv, setBillDiv] = useState(false);
  const [editshipdiv, setEditShipDiv] = useState(false);
  const [editbilldiv, setEditBillDiv] = useState(false);

  useEffect(() => {
 
    let mounted = true;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('calling use effect',config);
    axios
      .get(`http://95.111.240.143:8080/ecom-api/orders/${id}`, config)
      .then(response => {
        
        setNewProduct(response.data.data.products)
        setPay(response.data.data.payment_method)
        setDelievry(response.data.data.delivery_method)
        if(response.data.data.delivery_method=='standard')
        {
          
          setTotal(response.data.data.total_amount-8);
          setPrice(8)
        }
        else{
          
          setTotal(response.data.data.total_amount-10);
          setPrice(10)
        } 
        setUserId(response.data.data.user_id)
        requestSearch(response.data.data.user_id)
        axios
      .get(`http://95.111.240.143:8080/ecom-api/users/${response.data.data.user_id}`, config)
      .then(res=>{

        console.log("user is",res.data.data.first_name)
        setText(res.data.data.first_name)})
      .catch(error=>console.log(error))
      axios
      .get(`http://95.111.240.143:8080/ecom-api/products`, config)
      .then(res=>setProData(res.data.data))
      .catch(error=>console.log(error))
        setOrder(response.data.data);
        setWholeTotal(response.data.data.total_amount)
        
        setSum(response.data.data.total_items);
        
        SplitProduct(response.data.data.products)
      }).catch(err => console.log(err));        

    return () => (mounted = false);
  }, []);

  const SplitProduct=(products)=>{
        
    console.log("products",products)
        const list = [...nproduct];
        products.map(com => {
        
          
          var variantsArr = [];
          if(com.product_variant_name!='')
          {
          var arr = com.product_variant_name.split('_');
          for (var x = 0; x < arr.length; x++) {
            state.product_variant_name.map(item => {
             
              item.values.map(val => {
                
                if (val === arr[x]) {
                  variantsArr.push({
                    name: item.name,
                    value: val,
                  });
                }
              });
            });
          }
          list.push({...com,
            product_id:com.id,
            product_variant_id:com.product_variant_id
           } );
          
          if (arr.length == 3) {
            var st1 = arr[0];
            var st2 = arr[1];
            var st3 = arr[2];
            list[list.length - 1]['variantname'] = variantsArr;
          }
          if (arr.length == 2) {
            var st1 = arr[0];
            var st2 = arr[1];
            list[list.length - 1]['variantname'] = variantsArr;
          }
          if (arr.length == 1) {
            var st1 = arr[0];
            list[list.length - 1]['variantname'] = variantsArr;
          }
          setComVal(list);
        }
        else{
          list.push({...com,
            product_id:com.id,
            product_variant_id:com.product_variant_id
           } );
          list[list.length-1]['variantname']=variantsArr
          setComVal(list);
        }
          

          
        });
      
     
  }

  
  const submitHandler = e => {
    e.preventDefault();
  
    newship.type = 'shipping';

    axios
      .post(
        `http://95.111.240.143:8080/ecom-api/addresses/${user_Id}`,
        newship,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        
        setShipDiv(false);
        setNewShip({
          id: null,
          user_address: '',
          type: '',
          name: '',
          city: '',
          province: '',
          postal_code: '',
          country: '',
        });
       
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };
        const ship_arr = [];
        const selected_ship = [];
        axios
          .get(
            `http://95.111.240.143:8080/ecom-api/addresses/${user_Id}`,
            config,
          )
          .then(response => {
            var i = 0;
            response.data.data.map(item => {
              if (item.type == 'shipping') {
                if (i == 0) {
                  ship_arr.push(item);
                  setOrder({
                    ...state,
                    ['shipping_id']:  item.id
                  });
                  setShipId(item.id)
                  setRadiobtn({
                    selected: item.id,
                  });

                  i = i + 1;
                } else {
                  ship_arr.push(item);
                }
              } else {
                setAddresses(item);
                setBillId(item.id)
                setOrder({
                  ...state,
                  ['billing_id']:  item.id ,
                });
              }
            });
            setShipping(ship_arr);
            
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error);
      });
  };

  //for request to backend for the updation of billing address
  const submitEditBillHandler = e => {
    e.preventDefault();
   
    bill.type = 'billing';
    axios
      .put(
        `http://95.111.240.143:8080/ecom-api/addresses/${bill.id}`,
        billput,
      )
      .then(response => {
        
        toast.notify(`Billing Address Updated Succesfully`, {
          type: 'success',
        });

        setEditBillDiv(false);
        
       // setAddresses(bill);
      }).catch(err=>{
        toast.notify(`Sorry Something went wrong!! Try Again`, {
          type: 'error',
        });
      });
  };
  const submitEditHandler = e => {
    e.preventDefault();
   
   
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    currentship.type = 'shipping';
    axios
      .put(
        `http://95.111.240.143:8080/ecom-api/addresses/${newship.id}`,
        shipput,
      )
      .then(response => {
       
        setEditShipDiv(false);
       
        toast.notify(`Shipping Address Updated Succesfully`, {
          type: 'success',
        });
        
        const ship_arr = [];

        axios
          .get(
            `http://95.111.240.143:8080/ecom-api/addresses/${user_Id}`,
            config,
          )
          .then(response => {
            var i = 0;
            response.data.data.map(item => {
              if (item.type == 'shipping') {
                if (i == 0) {
                  ship_arr.push(item);
                  setShipId(item.id)
                  setOrder({
                    ...state,
                    ['shipping_id']:  item.id ,
                  });
                  setRadiobtn({
                    selected: item.id,
                  });

                  i = i + 1;
                } else {
                  ship_arr.push(item);
                }
              } else setAddresses(item);
            });
            setShipping(ship_arr);
          })
          .catch(err => {
            toast.notify(`OOPs, something went wrong !! Try again`, {
              type: 'error',
            });
          });
      })
      .catch(error => {
        console.log(error);
        toast.notify(`OOPs, something went wrong !! Try again`, {
          type: 'error',
        })
      });
  };

  const handlePMethodChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
   
    setPay(value)
    
    setOrder({ ...state, ['payment_method']: value });
  };
  const handleDMethodChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    setDelievry(value)
    if(value=='standard')
    {
      setWholeTotal(total+8)
      setPrice(8)
    }
    else{
      setWholeTotal(total+10)
      setPrice(10)
    }
 
   
    setOrder({ ...state, ['delivery_method']: value });
  };

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
  
    setShipPut({
      [name]:value
    })
    setCurrentShip({
      ...currentship,
      [name]: value,
    });
  };
  const handleNewChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    console.log('value', value);
    setNewShip({
      ...newship,
      [name]: value,
    });
    
  };

  //for billing address updation
  const handleEditChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    
    setBillPut({
      [name]:value
    })
    setAddresses({
      ...bill,
      [name]: value,
    });
  };

  const handleChild = childData => {
    setTotal(childData);
    setWholeTotal(childData+price)
  
  };
  const handletotal = data => {
    setSum(data);
  };
  const handleProduct = (child,com) => {
    state.products = child;
 
    setComVal(com)
  };
  const InputSearch = name => e => {
    const val = e.target.value;
    
    setText(val);
    if (val === '') {
      setList(false);
      
    } else {
      setList(true);

      const filteredRows = data.filter(row => {
        return row.first_name.toLowerCase().includes(text.toLowerCase());
      });
      // setData(filteredRows);
      setFilterrow(filteredRows);
    }

    console.log(filterrow);
  };
  const InputProSearch = name => e => {
    const val = e.target.value;

    setProText(val);
    if (val === '') {
      setProList(false);
     
    } else {
      setProList(true);

      const filteredRows = prodata.filter(row => {
        return row.name.toLowerCase().includes(protext.toLowerCase());
      });
      // setData(filteredRows);
      setProFilterrow(filteredRows);
    }

   
  };

 

  function requestproSearch(item) {
    setProList(false);

    axios
      .get(`http://95.111.240.143:8080/ecom-api/products/${item.id}`)
      .then(res => {
        
        setProText(item.name);
        setProduct(res.data.data);
        
        let list = [];
        let x;
        if (res.data.data.combinations.length > 0) {
          
          res.data.data.combinations.map(it => {
            list.push({
              ...it,
              ['product_id']: item.id,
              ['path']:item.path
            });
          });
         
          setCombination(list);
          setCombDiv(true);
        } else {
          setCombDiv(false);
          setProText(item.name);
          const list = [...comVal];
          const prolist = [...nproduct];
          let s = sum;
          s = s + 1;
          setSum(s);
         
          if(item.path.includes("//95.111.240.143/ecom-api"))
          {
          x="http"+item.path
          console.log("new img",x)
          }
        
        else
        {
        x="http//95.111.240.143/ecom-api/"+item.path
        console.log("new img",x)
        }
          prolist.push({
            product_id: item.id,
            product_variant_id: null,
            product_variant_name: '',
            product_name: item.name,
            price: item.price,
            path:item.path,
            quantity: 1,
          });
          state.products = prolist;
          setNewProduct(prolist);
          list.push({
            product_id: item.id,
            product_variant_id: null,
            product_variant_name: '',
            product_name: item.name,
            price: item.price,
            path:item.path,
            variantname:[],
            quantity: 1,
          });
       
          setComVal(list);
          
          var tt = total;
          tt = tt + item.price;
          setTotal(tt);
          setWholeTotal(tt+price)
        }
      })
      .catch(err => console.log(err));

    //}
    //}
  }

  function requestSearch(uid) {
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

   
    
    

    const ship_arr = [];
    const selected_ship = [];
    axios
      .get(
        `http://95.111.240.143:8080/ecom-api/addresses/${uid}`,
        config,
      )
      .then(response => {
        
         var i = 0;
        // setUserId(item.user_id);
        // state.userId = item.user_id;
        response.data.data.map(item => {
          setText(item.first_name);
          if (item.type === 'shipping') {
            if (i === 0) {
              setShipId(item.id)
              setOrder({
                ...state,
                ['shipping_id']:  item.id ,
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
            setBillId(item.id)
            setOrder({
              ...state,
              ['billing_id']:  item.id ,
            });
           
            setAddresses(item);
          }
        });
        setShipping(ship_arr);
      })
      .catch(err => console.log(err));
  }

  const handleradioChange = item => e => {
    setRadiobtn({
      selected: e.target.value,
    });
    setOrder({
      ...state,
      ['shipping_id']: 
         item.id,
      
    });
    setShipId(item.id)
    
  };

  const handleChkboxChange = com => e => {
    const list = [...comVal];
    const prolist = [...nproduct];
    var str = '';
    var st = '';
    var variantsArr = [];
    if (e.target.checked == true) {
      var s = sum;
      s = s + 1;
      setSum(s);
      
      var arr = com.product_variant_name.split('_');
      
      var cid = parseInt(com.id);
      prolist.push({
        product_variant_id: cid,
        product_variant_name: com.product_variant_name,
        product_name: protext,
        price: com.regular_price,
        path:com.path,
        quantity: 1,
      });
      setNewProduct(prolist)
     
      
      //list.push(prolist);
      for (var x = 0; x < arr.length; x++) {
        state.product_variant_name.map(item => {
          
          item.values.map(val => {
           
            if (val ==arr[x]) {
              variantsArr.push({
                name: item.name,
                value: val,
              });
            }
          });
        });
      }
      
      if (arr.length === 3) {
        var st1 = arr[0];
        var st2 = arr[1];
        var st3 = arr[2];
        prolist[prolist.length - 1]['variantname'] = variantsArr;
      }
      if (arr.length === 2) {
        var st1 = arr[0];
        var st2 = arr[1];
        prolist[prolist.length - 1]['variantname'] = variantsArr;
      }
      if (arr.length === 1) {
        var st1 = arr[0];
        prolist[prolist.length - 1]['variantname'] = variantsArr;
      }

      var tt = total;
      tt = tt + com.regular_price;
      setTotal(tt);
      setWholeTotal(tt+price)
      // console.log('prolist iss',prolist)
      setComVal(prolist);
     
    } else {
      const arr = [];
     
      if (comVal != []) {
        for (var i = 0; i < comVal.length; i++) {
          if (comVal[i].product_variant_name === com.product_variant_name) {
          } else {
            arr.push(comVal[i]);
          }
        }
      }
     // console.log('arr iss',arr)
      setComVal(arr);
    }
  };



  const AddProduct = () => {
    setCombination([]);
    setCombDiv(false);
    setProText('');
    toggle();
  };

  const submitOrder = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    o_data.orderInfo = {
      total_amount: wholetotal,
      total_items: sum,
      payment_method: pay,
      delivery_method: dlv,
    };
        o_data.billing_info={
      id:billId
    }
    o_data.shipping_info={
      id:shipId
    }
    o_data.products=nproduct
    o_data.userId=user_Id
    axios
      .put(
        `http://95.111.240.143:8080/ecom-api/orders/${id}`,
        o_data,
        config
      )
      .then(res => {console.log(res.data)
        toast.notify("order updated Successfully",{
        type:"success"})
       
      
      }).catch(err => console.log(err));
      
     // movep()
    console.log('order details are', nproduct);
  };
  const movep=()=>{
    router.push('/order/order')
  }

  const shipdetails = () => {
    if (editshipdiv == false) setShipDiv(true);
  };
  const billdetails = () => {
    if (editbilldiv == false) setBillDiv(true);
  };

  function editshipdetails(id) {
    shipp.map(item => {
      if (item.id == id) setCurrentShip(item);
    });
    if (shipdiv == false) {
      setEditShipDiv(true);
    }
  }
  function editbilldetails(id) {
  //  if (bill.id == id) setNewShip(bill);

    if (billdiv == false) {
      setEditBillDiv(true);
    }
  }
  function searchValue(v) {
    console.log('VV', v);
    setText(v);
    setList(false);
    console.log('text issssssssssssss', text);
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Order</h1>
        {/* <Link href="/newproduct">
              <button className="productAddButton">Create</button>
            </Link> */}
      </div>
      <div className="productTop">
        <div className="productTopLeft">
        <ToastContainer align={'right'} position={'middle'} />
          {/* <label className="c_label" for="exampleFormControlSelect1">
            Customer Name
          </label> */}
          <div className='imgpart'>
          <img 
              src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
              alt=""
              className="userShowImg"
            />
           
              <span className='userText'>{text}</span>
          </div>
           
          <label style={{ marginTop: '10px' }}>Payment Method</label>
          <select
            className="form-control"
            id="parent"
            required
            name="payment_method"
            style={{ marginBottom: '10px' }}
            value={state.payment_method}
            onChange={handlePMethodChange('payment_method')}
          >
            <option value="credit card">Credit Card</option>
            <option value="bank transfer">Bank Transfer</option>
            <option value="COD">Cash On Delivery</option>
          </select>

          <label>Delievery Method</label>
          <select
            className="form-control"
            id="parent"
            required
            name="delivery_method"
            style={{ marginBottom: '10px' }}
            value={state.delivery_method}
            onChange={handleDMethodChange('delivery_method')}
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>

          <label className="lbel" for="exampleFormControlSelect1">
            Payment Status
          </label>
          <select
            className="form-control"
            id="parent"
            required
            name="category_id"
            value={state.payment_status}
            // onChange={handleChange(name)}
          >
            <option value="">Paid</option>
            <option value="">UnPaid</option>
          </select>
        </div>
        <div className="productTopRight">
          <h4>Billing Address</h4>
          <div className="productInfoTop">
            <div className="b_label">
              
                <>
                  <div className="billbtns">
                    <div className="newdiv">
                      <div className="prevAdd">
                        <label>{bill.user_address}</label>
                      </div>
                        <div className="edit">
                          <Edit
                            onClick={() => editbilldetails(bill.id)}
                            className="billedit"
                          ></Edit>
                          <label>Edit</label>
                        </div>
                      
                      
                    </div>
                      

                    {editbilldiv && (
                      <>
                        <form
                          onSubmit={submitEditBillHandler}
                         className="editForm"
                        >
                          <div className="editItem">
                            <div className="form-group" style={{width:'410px'}}>
                              <label>Address</label>
                              <input
                                type="text"
                                placeholder="Type Address"
                                className="form-control"
                                name="user_address"
                                value={bill.user_address}
                                onChange={handleEditChange('user_address')}
                              />
                            </div>
                          </div>
                          <div className="editItem">
                            <div className="form-group" style={{width:'410px'}}>
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Type Title"
                                className="form-control"
                                name="name"
                                value={bill.name}
                                onChange={handleEditChange('name')}
                              />
                            </div>
                          </div>

                          <div className="editItem2">
                            <div className="textarea1">
                              <label>City</label>
                              <input
                                type="text"
                                name="city"
                                value={bill.city}
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
                                value={bill.postal_code}
                                placeholder="City Code"
                                onChange={handleEditChange('postal_code')}
                              />
                            </div>
                          </div>

                          <div className="editItem2">
                            <div className="textarea1">
                              <label>Country</label>
                              <input
                                type="text"
                                name="country"
                                value={bill.country}
                                className="gap"
                                placeholder="Your Country"
                                onChange={handleEditChange('country')}
                              />
                            </div>

                            <div className="textarea2">
                              <label>State/Province</label>
                              <input
                                type="text"
                                name="province"
                                value={bill.province}
                                placeholder="Your State"
                                onChange={handleEditChange('province')}
                              />
                            </div>
                          </div>
                          <button type="submit" className="editButton">
                            Update
                          </button>
                          <button
                            onClick={() => setEditBillDiv(false)}
                            className="CloseButton"
                          >
                            Close
                          </button>
                        </form>
                      </>
                    )}
                  </div>

                  
                </>
              
            </div>
          </div>
          <div className="productFormLeft">
            <h4>Shipping Address</h4>
            <div className="s_label">
           
                <>
                  <div className="radiobtns">
                    {shipp.map(item => {
                      return (
                        <div className="newdiv">
                          <div className="prevAdd">
                            <input
                              type="radio"
                              name="address"
                              value={item.id}
                              checked={
                                radio.selected === item.id
                                  ? true
                                  : radio.selected == item.id
                              }
                              onChange={handleradioChange(item)}
                            />
                            <label className="user_address">
                              {item.user_address}
                            </label>
                          </div>
                          <div className="edit">
                            <Edit
                              onClick={() => editshipdetails(item.id)}
                            ></Edit>
                            <label>Edit</label>
                          </div>
                        </div>
                      );
                    })}

                    {shipdiv && (
                      <>
                      
                        {/* form to add new shipping address */}
                        <form onSubmit={submitHandler} className="editForm">
                          <div className="editItem">
                            <div className="form-group" style={{width:'410px'}}>
                              <label>Address</label>
                              <input
                                type="text"
                                placeholder="Type Address"
                                className="form-control"
                                name="user_address"
                                value={newship.user_address}
                                onChange={handleNewChange('user_address')}
                              />
                            </div>
                          </div>
                          <div className="editItem">
                            <div className="form-group" style={{width:'410px'}}>
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Type Title"
                                className="form-control"
                                name="name"
                                value={newship.name}
                                onChange={handleNewChange('name')}
                              />
                            </div>
                          </div>

                          <div className="editItem2">
                            <div className="textarea1">
                              <label>City</label>
                              <input
                                type="text"
                                name="city"
                                value={newship.city}
                                className="gap"
                                placeholder="Your City"
                                onChange={handleNewChange('city')}
                              />
                            </div>

                            <div className="textarea2">
                              <label>Postal Code</label>
                              <input
                                type="text"
                                name="postal_code"
                                value={newship.postal_code}
                                placeholder="City Code"
                                onChange={handleNewChange('postal_code')}
                              />
                            </div>
                          </div>

                          <div className="editItem2">
                            <div className="textarea1">
                              <label>Country</label>
                              <input
                                type="text"
                                name="country"
                                value={newship.country}
                                className="gap"
                                placeholder="Your Country"
                                onChange={handleNewChange('country')}
                              />
                            </div>

                            <div className="textarea2">
                              <label>State/Province</label>
                              <input
                                type="text"
                                name="province"
                                value={newship.province}
                                placeholder="Your State"
                                onChange={handleNewChange('province')}
                              />
                            </div>
                          </div>

                          <button type="submit" className="editButton">
                            Add
                          </button>
                          <button
                            onClick={() => setShipDiv(false)}
                            className="CloseButton"
                          >
                            Close
                          </button>
                        </form>
                      </>
                    )}
                    
                    {/* form to update the selceted  shipping address */}
                    {editshipdiv && (
                      <>
                        <form
                          onSubmit={submitEditHandler}
                          className="editForm"
                        >
                          <div className="editItem">
                            <div className="form-group" style={{width:'410px'}}>
                              <label>Address</label>
                              <input
                                type="text"
                                placeholder="Type Address"
                                className="form-control"
                                name="user_address"
                                value={currentship.user_address}
                                onChange={handleChange('user_address')}
                              />
                            </div>
                          </div>
                          <div className="editItem">
                            <div className="form-group" style={{width:'410px'}}>
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Type Title"
                                className="form-control"
                                name="name"
                                value={currentship.name}
                                onChange={handleChange('name')}
                              />
                            </div>
                          </div>

                          <div className="editItem2">
                            <div className="textarea1">
                              <label>City</label>
                              <input
                                type="text"
                                name="city"
                                value={currentship.city}
                                className="gap"
                                placeholder="Your City"
                                onChange={handleChange('city')}
                              />
                            </div>

                            <div className="textarea2">
                              <label>Postal Code</label>
                              <input
                                type="text"
                                name="postal_code"
                                value={currentship.postal_code}
                                placeholder="City Code"
                                onChange={handleChange('postal_code')}
                              />
                            </div>
                          </div>

                          <div className="editItem2">
                            <div className="textarea1">
                              <label>Country</label>
                              <input
                                type="text"
                                name="country"
                                value={currentship.country}
                                className="gap"
                                placeholder="Your Country"
                                onChange={handleChange('country')}
                              />
                            </div>

                            <div className="textarea2">
                              <label>State/Province</label>
                              <input
                                type="text"
                                name="province"
                                value={currentship.province}
                                placeholder="Your State"
                                onChange={handleChange('province')}
                              />
                            </div>
                          </div>
                          <button type="submit" className="editButton">
                            Update
                          </button>
                          <button
                            onClick={() => setEditShipDiv(false)}
                            className="CloseButton"
                          >
                            Close
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                  <div className="addshipadrs">
                    <button onClick={shipdetails} className="shipbtn">
                      Add Address
                    </button>
                  </div>
                </>
              
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={toggle}
        style={{ marginLeft: '20px' }}
        className="shipbtn"
      >
        Add Product
      </button>

      <div className="productBottom">
        <div className="orderprocess">
          <div className="orderproducts" style={{ width: '600px' }}>
            
            {
              comVal.map((item, i) => (
                
                item.variantname==undefined?'':
                <EditShoppingCart
                  id={item.id}
                  index={i}
                  qty={parseInt(item.quantity)}
                  product_variant_name={item.product_variant_name}
                  variantname={item.variantname}
                  name={nproduct[i].product_name}
                  price={parseInt(item.price)}
                  img={item.path}
                  product={nproduct}
                  total={total}
                  comVal={comVal}
                  sum={sum}
                  parentCall={handleChild}
                  parentProduct={handleProduct}
                  TotalItem={handletotal}
                />
              ))
              }
          </div>
          <div className="orderSummary">
            
            
              <Summary>
                <SummaryNav>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                </SummaryNav>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>${total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Total Items</SummaryItemText>
                  <SummaryItemPrice>{sum}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ {price}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ 0.0</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    <strong>${wholetotal}</strong>
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryButton>
                  <SummaryItemButton onClick={() => submitOrder()}>
                    Update Order
                  </SummaryItemButton>
                </SummaryButton>
              </Summary>
            
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={AddProduct}>Products</ModalHeader>
        <ModalBody>
          <form>
            <label for="exampleFormControlSelect1">Product Name</label>
            <input
              type="text"
              name="search"
              id="header-search"
              autoComplete="off"
              // options={searchList}
              value={protext}
              // openMenuOnClick={false}
              placeholder="Search Product"
              className="form-control"
              onChange={InputProSearch('search')}
            />
            {prolist && (
              <div className="lstdropdown">
                {profilterrow.map((item, i) => {
                  return i < 10 ? (
                    <li
                      className="ulistitem"
                      onClick={() => requestproSearch(item)}
                    >
                      <span style={{ marginLeft: '10px' }}>{item.name}</span>
                    </li>
                  ) : (
                    <></>
                  );
                })}
              </div>
            )}
            {combdiv && (
              <div className="chkdiv">
                {combination.map((com, i) => {
                  return (
                    <div className="chkflex">
                      <input
                        name="isGoing"
                        type="checkbox"
                        className="chkboxes"
                        //checked={this.state.isGoing}
                        onChange={handleChkboxChange(com)}
                      />
                      <label className="chkname">
                        {com.product_variant_name}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AddProduct}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});
export default EditOrderPage;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;

  color: white;
  margin-left: 30px;
`;
const SummaryNav = styled.div`
  font-weight: 200;
  background-color: black;
  color: white;
  border-radius: 10px;
  margin-top: -19px;
  width: 394px;
  margin-left: -18px;
`;
const SummaryButton = styled.div`
  font-weight: 200;
  type: button;
  background-color: black;
  color: white;
  border-radius: 10px;
  margin-top: -19px;
  width: 394px;
  margin-left: -18px;
  height: 30px;
  cursor: pointer;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === 'total' && '500'};
  font-size: ${props => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;
const SummaryItemButton = styled.span`
  text-align: center;
  margin-top: 30px;
  margin-left: 140px;
  cursor: pointer;
  font-size: 16px;

  margin-right: 140px;
`;

const SummaryItemPrice = styled.span``;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const AmountBtn = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
`;

// const Button = styled.button`
// width: 100%;
// padding: 10px;
// background-color: black;
// color: white;
// font-weight: 600;
// `;
