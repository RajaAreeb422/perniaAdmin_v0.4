import axios from 'axios';
import React, { memo } from 'react';
import { Publish, SettingsBackupRestore } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Edit } from '@material-ui/icons';
import styled from 'styled-components';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import { Dropdown } from 'semantic-ui-react'
//import SelectSearch from 'react-select-search'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './addorder.scss';
import ShippingAddress from './ShippingAddress';
import ShoppingCart from './ShoppingCart';

import { toast, ToastContainer } from 'react-nextjs-toast';
import router from 'next/router';

const AddOrderPage = memo(props => {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(0);
  //const { addToast } = useToasts();
  const [protext, setProText] = useState('');
  const [list, setList] = useState(false);
  const [nproduct, setNewProduct] = useState([]);
  const [prolist, setProList] = useState(false);
  const [shipp, setShipping] = useState([]);
  const [shipers, setShippers] = useState([]);
  const [combdiv, setCombDiv] = useState(false);
  const [comVal, setComVal] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [movemodal, setMoveModal] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);
  const [billinfo, setBillInfo] = useState();
  const [shipinfo, setShipInfo] = useState();
  // Toggle for Modal
  const toggle = () => setModal(!modal);
  const movetoggle = () => setMoveModal(!movemodal);
  const [billput, setBillPut] = useState();
  const [shipput, setShipPut] = useState();
  //for new billing address
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
  //for current billing address
  const [address, setBill] = useState({
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

  const switchstate = {};
  const select = '';
  var i = 0;
  for (i = 0; i < 1; i++) {
    //  select=shipp[i].id;
  }

  const [radio, setRadiobtn] = useState({
    selected: '',
  });
  const [user_Id, setUserId] = useState(null);
  const [state, setOrder] = useState({
    userId: user_Id,
    products: [],
    orderInfo: {},
    billing_info: { id: null },
    shipping_info: { id: null },
  });
  const { userId, products, orderInfo, billing_info, shipping_info } = state;
  const [data, setState] = useState([]);
  const [prodata, setProData] = useState([]);
  const [product, setProduct] = useState();
  const [method, setMethod] = useState({
    total_amount: total,
    total_items: sum,
    delivery_method: 'standard',
    payment_method: '',
  });
  const { total_amount, total_items, delivery_method, payment_method } = method;
  const [combination, setCombination] = useState([]);
  const [defaultOptions, setOptions] = useState([]);
  const [filterrow, setFilterrow] = useState([]);
  const [profilterrow, setProFilterrow] = useState([]);
  const [mydiv, setDiv] = useState(false);
  const [shipdiv, setShipDiv] = useState(false);
  const [billdiv, setBillDiv] = useState(false);
  const [editshipdiv, setEditShipDiv] = useState(false);
  const [editbilldiv, setEditBillDiv] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let mounted = true;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .get(`http://95.111.240.143:8080/ecom-api/users`, config)
      .then(response => {
        setState(response.data.data);
        axios
          .get(`http://95.111.240.143:8080/ecom-api/products`, config)
          .then(res => {
            setProData(res.data.data);
          })
          .catch(err => console.log(err));
        axios
          .get(`http://95.111.240.143:8080/ecom-api/shipping`, config)
          .then(resp => {
            setShippers(resp.data.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    // return () => (mounted = false);
  }, []);

  const submitBillHandler = e => {
    e.preventDefault();

    bill.type = 'billing';

    axios
      .post(
        `http://95.111.240.143:8080/ecom-api/addresses/${user_Id}`,
        bill,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
       
        setBillDiv(false);
        setAddresses({
          id: null,
          user_address: '',
          type: '',
          name: '',
          city: '',
          province: '',
          postal_code: '',
          country: '',
        });
        setBill(bill);
        setBillInfo({
          id: response.data.insertId,
        });
        setOrder({
          ...state,
          ['billing_info']: {
            id: response.data.insertId,
          },
        });
       
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };
      })
      .catch(err => console.log(err));
  };

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
          .get(`http://95.111.240.143:8080/ecom-api/addresses/${user_Id}`, config)
          .then(response => {
            var i = 0;
            response.data.data.map(item => {
              if (item.type == 'shipping') {
                if (i == 0) {
                  ship_arr.push(item);
                  setShipInfo({
                    id: item.id,
                  });
                  setOrder({
                    ...state,
                    ['shipping_info']: { id: item.id },
                  });
                  setRadiobtn({
                    selected: item.id,
                  });

                  i = i + 1;
                } else {
                  ship_arr.push(item);
                }
              } else {
                setBill(item);
                setBillInfo({
                  id: item.id,
                });
                setOrder({
                  ...state,
                  ['billing_info']: { id: item.id },
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

  const submitEditBillHandler = e => {
    e.preventDefault();
    
    axios
      .put(`http://95.111.240.143:8080/ecom-api/addresses/${address.id}`, billput)
      .then(response => {
        console.log('rsponse', response.data);
        toast.notify(`Billing Address Updated Succesfully`, {
          type: 'success',
        });
        setEditBillDiv(false);

        setBill(address);
      })
      .catch(err => {
        toast.notify(`Sorry Something went wrong!! Try Again`, {
          type: 'error',
        });
      });
  };

  const submitEditHandler = e => {
    e.preventDefault();
    console.log(currentship.id);
    axios
      .put(
        `http://95.111.240.143:8080/ecom-api/addresses/${currentship.id}`,
        shipput,
      )
      .then(response => {
        console.log('rsponse', response.data);
        toast.notify(`Shipping Address Updated Succesfully`, {
          type: 'success',
        });
        setEditShipDiv(false);
        
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };

        const ship_arr = [];

        axios
          .get(`http://95.111.240.143:8080/ecom-api/addresses/${user_Id}`, config)
          .then(response => {
            var i = 0;
            response.data.data.map(item => {
              if (item.type == 'shipping') {
                if (i == 0) {
                  ship_arr.push(item);
                  setShipInfo({
                    id: item.id,
                  });
                  setOrder({
                    ...state,
                    ['shipping_info']: { id: item.id },
                  });
                  setRadiobtn({
                    selected: item.id,
                  });

                  i = i + 1;
                } else {
                  ship_arr.push(item);
                }
              } else setBill(item);
            });
            setShipping(ship_arr);
          })
          .catch(err => {
            console.log(err);
            toast.notify(`OOPs, something went wrong !! Try again`, {
              type: 'error',
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePMethodChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
 
    method.payment_method = value;

    setOrder({ ...state, orderInfo: method });
  };
  const handleDMethodChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;


    let x = total;

    // axios.get(`http://95.111.240.143:8080/ecom-api/shipping/${value}`)
    // .then(res=>{
    shipers.map(item => {
      if (item.category == value) {
        let tt = total;
        if (rate != 0) {
          tt = tt - rate;
          tt = tt + item.price;
        } else tt = tt + item.price;
        setTotal(tt);
        setRate(item.price);
        method.delivery_method = item.category;
      }
      
    });

    setOrder({ ...state, orderInfo: method });
  };

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;

    setAddresses({
      ...bill,
      [name]: value,
    });
  };
  const handleShipChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
   
    setNewShip({
      ...newship,
      [name]: value,
    });
  };

  const handleEditChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    
    setBillPut({
      [name]: value,
    });
    setBill({
      ...address,
      [name]: value,
    });
  };
  const handleEditShipChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    
    setShipPut({
      [name]: value,
    });
    setCurrentShip({
      ...currentship,
      [name]: value,
    });
  };

  const handleChild = childData => {
    setTotal(childData);
  
  };

  const handletotal = data => {
    setSum(data);
  };

  const handleProduct = (child, a_child) => {
    state.products = child;
    setNewProduct(child);
    setComVal(a_child);
   
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

    console.log(filterrow);
  };

  function requestproSearch(item) {
    setProList(false);

    axios
      .get(`http://95.111.240.143:8080/ecom-api/products/${item.id}`)
      .then(res => {
        console.log('single item response', res.data.data);
        setProText(item.name);
        setProduct(res.data.data);
       console.log("price un",item)
        let list = [];
        if (res.data.data.combinations.length > 0) {
          res.data.data.combinations.map(it => {
            console.log("img",item.path)
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
         
          prolist.push({
            product_id: item.id,
            product_variant_id: null,
            product_variant_name: '',
            product_name: item.name,
            path:item.path,
            price: item.price,
            quantity: 1,
          });
          state.products = prolist;
          setNewProduct(prolist);
          list.push({
            product_id: item.id,
            product_variant_id: null,
            variantname: '',
            product_name: item.name,
            path:item.path,
            regular_price: item.price,
            quantity: 1,
          });
        
          setComVal(list);
          var tt = total;
          tt = tt + item.price;
          setTotal(tt);
        }
      })
      .catch(err => console.log(err));

    //}
    //}
  }

  function requestSearch(item) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    setText(item.first_name);
    setList(false);
  

    if (item.user_id != '') {
      setDiv(true);
    } else {
      setDiv(false);
    }
    const ship_arr = [];

    axios
      .get(`http://95.111.240.143:8080/ecom-api/addresses/${item.user_id}`, config)
      .then(response => {
        var i = 0;
        setUserId(item.user_id);
        state.userId = item.user_id;
        response.data.data.map(item => {
          if (item.type == 'shipping') {
            if (i === 0) {
              setShipInfo({
                id: item.id,
              });
              setOrder({
                ...state,
                ['shipping_info']: { id: item.id },
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
          if (item.type == 'billing') {
            setBillInfo({
              id: item.id,
            });
            setOrder({
              ...state,
              ['billing_info']: { id: item.id },
            });
           
            setBill(item);
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
      ['shipping_info']: {
        id: item.id,
      },
    });
    console.log(e.target.value);
  };

  const handleChkboxChange = com => e => {
    const list = [...comVal];
    const prolist = [...nproduct];
    var str = '';
    var st = '';
    var variantsArr = [];
    if (e.target.checked === true) {
      var s = sum;
      s = s + 1;
      setSum(s);
     
      var arr = com.product_variant_name.split('_');
     
      var cid = parseInt(com.id);
      prolist.push({
        product_id: com.product_id,
        product_variant_id: cid,
        product_variant_name: com.product_variant_name,
        product_name: protext,
        price: com.regular_price,
        path:com.path,
        quantity: 1,
      });
      state.products = prolist;
      setNewProduct(prolist);
      
      list.push(com);
      for (var x = 0; x < arr.length; x++) {
        product.variants.map(item => {
      
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
     
      if (arr.length === 3) {
        var st1 = arr[0];
        var st2 = arr[1];
        var st3 = arr[2];
        list[list.length - 1]['variantname'] = variantsArr;
      }
      if (arr.length === 2) {
        var st1 = arr[0];
        var st2 = arr[1];
        list[list.length - 1]['variantname'] = variantsArr;
      }
      if (arr.length === 1) {
        var st1 = arr[0];
        list[list.length - 1]['variantname'] = variantsArr;
      }

      var tt = total;
      tt = tt + com.regular_price;
      setTotal(tt);
      setComVal(list);
     
    } else {
      const arr = [];
      
      if (list != []) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].product_variant_name === com.product_variant_name) {
          } else {
            arr.push(list[i]);
          }
        }
      }
    
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
    if (method.payment_method == '' && method.delivery_method == '') {
      toast.notify(`!Please Add Payment and Delivery Merthod`, {
        type: 'error',
      });
    } else if (method.payment_method == '') {
      console.log('paymentt');
      toast.notify(`!Please Add Payment Method`, {
        type: 'error',
      });
    } else if (method.delivery_method == '') {
      console.log('delivery');
      toast.notify(`!Please Add Delivery Method`, {
        type: 'error',
      });
    } else {
      setLoader(true);
      
      console.log("nn products ",nproduct)
      state.shipping_info = shipinfo;
      state.billing_info = billinfo;
      state.products = nproduct;
      state.orderInfo = {
        total_amount: total,
        total_items: sum,
        payment_method: method.payment_method,
        delivery_method: method.delivery_method,
      };

      axios
        .post(
          `http://95.111.240.143:8080/ecom-api/orders`,
          state,

          { headers: { 'content-type': 'application/json' } },
        )
        .then(res => {
          setLoader(false);
          movetoggle();
          console.log(res.data);
        })

        .catch(err => {
          toast.notify(`Sorry! There is some problem..`, {
            type: 'error',
          });
          console.log(err);
        });

      console.log('order details are', state);
    }
  };

  const move = () => {
    router.push('/order/order');
  };
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
    // if (address.id == id) setNewShip(address);

    if (billdiv == false) {
      setEditBillDiv(true);
    }
  }
  function searchValue(v) {
    console.log('VV', v);
    setText(v);
    setList(false);
 
  }

  return (
    <>
      {loader && <div className="Loader" />}
      <div
        className="order"
        style={
          loader === true ? { backgroundColor: 'black', opacity: '0.2' } : {}
        }
      >
        <ToastContainer align={'right'} position={'middle'} />
        <div className="orderTitleContainer">
          <h1 className="orderTitle">Create Order</h1>
        </div>
        <div className="orderTop">
          {/* order basic info like customer name,date,payment method etc. */}
          <div className="orderTopLeft">
            <label className="ordc_label" for="exampleFormControlSelect1">
              Customer Name
            </label>

            <input
              type="text"
              name="search"
              id="header-search"
              value={text}
              autoComplete="off"
              placeholder="  Search User"
              className="form-control"
              onChange={InputSearch('search')}
            />
            {list && (
              <div className="ordlstdropdown">
                {filterrow.map(item => {
                  return (
                    <li
                      className="ulistitem"
                      onClick={() => requestSearch(item)}
                    >
                      {item.first_name}
                    </li>
                  );
                })}
              </div>
            )}
            <label style={{ marginTop: '10px' }}>Payment Method</label>
            <select
              className="form-control"
              id="parent"
              required
              name="payment_method"
              style={{ marginBottom: '10px' }}
              //value="Paid"
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
              //value="Paid"
              onChange={handleDMethodChange('delivery_method')}
            >
              <option selected="true" disabled="disabled">
                Select Delivery Method
              </option>
              {shipers.map(item => (
                <option value={item.category}>{item.name}</option>
              ))}
            </select>

            <label className="ordlbel" for="exampleFormControlSelect1">
              Payment Status
            </label>
            <select
              className="form-control"
              id="parent"
              required
              name="category_id"
              value="Paid"
              // onChange={handleChange(name)}
            >
              <option value="">Paid</option>
              <option value="">UnPaid</option>
            </select>
          </div>

          <div className="orderTopRight">
            <h4>Billing Address</h4>

            <div className="orderInfoTop">
              <div className="ordb_label">
                {mydiv && (
                  <>
                    <div className="ordradiobtns">
                      <div className="ordnewdiv">
                        <div className="ordprevAdd">
                          <label>{address.user_address}</label>
                        </div>

                        {address.user_address != '' ? (
                          <div className="ordedit">
                            <Edit
                              onClick={() => editbilldetails(bill.id)}
                              className="ordbilledit"
                            ></Edit>
                            <label>Edit</label>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      {billdiv && (
                        <>
                          <form
                            onSubmit={submitBillHandler}
                            className="newUserForm"
                          >
                            <div className="neworderItem">
                              <div className="form-group">
                                <label>Address</label>
                                <input
                                  type="text"
                                  placeholder="Type Address"
                                  className="form-control"
                                  name="user_address"
                                  value={bill.user_address}
                                  onChange={handleChange('user_address')}
                                />
                              </div>
                            </div>
                            <div className="neworderItem">
                              <div className="form-group">
                                <label>Title</label>
                                <input
                                  type="text"
                                  placeholder="Type Title"
                                  className="form-control"
                                  name="name"
                                  value={bill.name}
                                  onChange={handleChange('name')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem">
                              <div className="form-group">
                              
                                <label>City</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={bill.city}
                                  className="ordgap"
                                  placeholder="Your City"
                                  onChange={handleChange('city')}
                                />
                             </div>
                              </div>
                              <div className="neworderItem">
                              <div className="form-group">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  name="postal_code"
                                  value={bill.postal_code}
                                  placeholder="City Code"
                                  onChange={handleChange('postal_code')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem">
                              <div className="form-group">
                                <label>Country</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={bill.country}
                                  className="ordgap"
                                  placeholder="Your Country"
                                  onChange={handleChange('country')}
                                />
                              </div>
                              </div>
                              <div className="neworderItem">
                              <div className="form-group">
                                <label>State/Province</label>
                                <input
                                  type="text"
                                  name="province"
                                  value={bill.province}
                                  placeholder="Your State"
                                  onChange={handleChange('province')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem">
                              <button type="submit" className="neworderButton">
                                Add
                              </button>
                              <button
                                onClick={() => setBillDiv(false)}
                                // className="ordCloseButton"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </>
                      )}

                      {editbilldiv && (
                        <>
                          <form
                            onSubmit={submitEditBillHandler}
                            className="newUserForm"
                          >
                            <div className="neworderItem">
                              <div className="form-group" style={{width:'380px'}}>
                                <label>Address</label>
                                <input
                                  type="text"
                                  placeholder="Type Address"
                                  className="form-control"
                                  name="user_address"
                                  value={address.user_address}
                                  onChange={handleEditChange('user_address')}
                                />
                              </div>
                            </div>
                            <div className="neworderItem">
                              <div className="form-group" style={{width:'380px'}}>
                                <label>Title</label>
                                <input
                                  type="text"
                                  placeholder="Type Title"
                                  className="form-control"
                                  name="name"
                                  value={address.name}
                                  onChange={handleEditChange('name')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem2">
                              <div className="textarea1">
                                <label>City</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={address.city}
                                 // className="ordgap"
                                  placeholder="Your City"
                                  onChange={handleEditChange('city')}
                                />
                              </div>

                              <div className="textarea1">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  name="postal_code"
                                  value={address.postal_code}
                                  placeholder="City Code"
                                  onChange={handleEditChange('postal_code')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem2">
                              <div className="textarea2" >
                                <label>Country</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={address.country}
                                  //className="ordgap"
                                  placeholder="Your Country"
                                  onChange={handleEditChange('country')}
                                />
                              </div>

                              <div className="textarea2">
                                <label>State/Province</label>
                                <input
                                  type="text"
                                  name="province"
                                  value={address.province}
                                  placeholder="Your State"
                                  onChange={handleEditChange('province')}
                                />
                              </div>
                            </div>
                            <div className="Item" >
                              
                            <button type="submit" className="neworderButton">
                              Update
                            </button>
                            
                            
                            <button
                              onClick={() => setEditBillDiv(false)}
                              className="ordCloseButton"
                            >
                              Close
                            </button>
                         
                            </div>
                          </form>
                        </>
                      )}
                    </div>

                    <div className="ordaddshipadrs">
                      {address.id == null ? (
                        <button onClick={billdetails} className="ordshipbtn">
                          Add Address
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="orderFormLeft">
              <h4>Shipping Address</h4>
              <div className="ords_label">
                {mydiv && (
                  <>
                    <div className="ordradiobtns">
                      {shipp.map(item => {
                        return (
                          <div className="ordnewdiv">
                            <div className="ordprevAdd">
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
                              <label className="orduser_address">
                                {item.user_address}
                              </label>
                            </div>
                            <div className="ordedit">
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
                          {/*  */}

                          <form
                            onSubmit={submitHandler}
                            className="newUserForm"
                          >
                            <div className="neworderItem" >
                              <div className="form-group" style={{width:'380px'}}>
                                <label>Address</label>
                                <input
                                  type="text"
                                  placeholder="Type Address"
                                  className="form-control"
                                  name="user_address"
                                  value={newship.user_address}
                                  onChange={handleShipChange('user_address')}
                                />
                              </div>
                            </div>
                            <div className="neworderItem" >
                              <div className="form-group" style={{width:'380px'}}>
                                <label>Title</label>
                                <input
                                  type="text"
                                  placeholder="Type Title"
                                  className="form-control"
                                  name="name"
                                  value={newship.name}
                                  onChange={handleShipChange('name')}
                                />
                              </div>
                            </div>

                            <div className='neworderItem2'>
                              <div
                              className='textarea1'
                              >
                                <label>City</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={newship.city}
                                  //className="ordgap"
                                  placeholder="Your City"
                                  onChange={handleShipChange('city')}
                                />
                              </div>

                              <div
                              className='textarea2'
                              >
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  name="postal_code"
                                  value={newship.postal_code}
                                  placeholder="City Code"
                                  onChange={handleShipChange('postal_code')}
                                />
                              </div>
                            </div>

                            <div
                             className='neworderItem2'
                            >
                              <div
                              className='textarea1'
                              >
                                <label>Country</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={newship.country}
                                  className="ordgap"
                                  placeholder="Your Country"
                                  onChange={handleShipChange('country')}
                                />
                              </div>

                              <div
                              className='textarea2'
                              >
                                <label>State/Province</label>
                                <input
                                  type="text"
                                  name="province"
                                  value={newship.province}
                                  placeholder="Your State"
                                  onChange={handleShipChange('province')}
                                />
                              </div>
                            </div>

                            <div
                              className='Item'
                            >
                              <button type="submit" className="neworderButton">
                                Add
                              </button>
                              <button
                                onClick={() => setShipDiv(false)}
                                className="ordCloseButton"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </>
                      )}

                      {editshipdiv && (
                        <>
                          <form
                            onSubmit={submitEditHandler}
                            className="newUserForm"
                          >
                            <div className="neworderItem">
                              <div className="form-group" style={{width:'380px'}}>
                                <label>Address</label>
                                <input
                                  type="text"
                                  placeholder="Type Address"
                                  className="form-control"
                                  name="user_address"
                                  value={currentship.user_address}
                                  onChange={handleEditShipChange(
                                    'user_address',
                                  )}
                                />
                              </div>
                            </div>
                            <div className="neworderItem">
                              <div className="form-group" style={{width:'380px'}}>
                                <label>Title</label>
                                <input
                                  type="text"
                                  placeholder="Type Title"
                                  className="form-control"
                                  name="name"
                                  value={currentship.name}
                                  onChange={handleEditShipChange('name')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem2">
                              <div className="textarea1">
                                <label>City</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={currentship.city}
                                  className="ordgap"
                                  placeholder="Your City"
                                  onChange={handleEditShipChange('city')}
                                />
                              </div>

                              <div className="textarea2">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  name="postal_code"
                                  value={currentship.postal_code}
                                  placeholder="City Code"
                                  onChange={handleEditShipChange('postal_code')}
                                />
                              </div>
                            </div>

                            <div className="neworderItem2">
                              <div className="textarea1">
                                <label>Country</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={currentship.country}
                                  className="ordgap"
                                  placeholder="Your Country"
                                  onChange={handleEditShipChange('country')}
                                />
                              </div>

                              <div className="textarea2">
                                <label>State/Province</label>
                                <input
                                  type="text"
                                  name="province"
                                  value={currentship.province}
                                  placeholder="Your State"
                                  onChange={handleEditShipChange('province')}
                                />
                              </div>
                            </div>
                            <div className='Item'>
                            <button type="submit" className="neworderButton">
                              Update
                            </button>
                            <button
                              onClick={() => setEditShipDiv(false)}
                              className="ordCloseButton"
                            >
                              Close
                            </button>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
                    <div className="ordaddshipadrs">
                      <button onClick={shipdetails} className="ordshipbtn">
                        Add Address
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {state.userId === null ||
        state.billing_info === null ||
        state.shipping_info === null ? (
          ''
        ) : (
          <button
            onClick={toggle}
            style={{ marginLeft: '20px' }}
            className="ordshipbtn"
          >
            Add Product
          </button>
        )}
        <div className="orderBottom">
          <div className="orderprocess">
            <div className="orderproducts" style={{ width: '600px' }}>
              {sum === 0 ? (
                <div>No Product is Added Yet </div>
              ) : (
                comVal.map((item, i) => (
                  <ShoppingCart
                    key={item.id}
                    id={item.id}
                    index={i}
                    comVal={comVal}
                    variantname={item.variantname}
                    name={nproduct[i].product_name}
                    price={item.regular_price}
                    product={nproduct}
                    total={total}
                    img={item.path}
                    sum={sum}
                    parentCall={handleChild}
                    parentProduct={handleProduct}
                    TotalItem={handletotal}
                  />
                ))
              )}
            </div>
            <div className="orderSummary">
              {state.products.length === 0 ? (
                <div></div>
              ) : (
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
                    <SummaryItemPrice>{rate}</SummaryItemPrice>
                  </SummaryItem>

                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>
                      <strong>${total}</strong>
                    </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryButton>
                    <SummaryItemButton onClick={() => submitOrder()}>
                      Confirm Order
                    </SummaryItemButton>
                  </SummaryButton>
                </Summary>
              )}
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
                <div className="ordlstdropdown">
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
                <div className="ordchkdiv">
                  {combination.map((com, i) => {
                    return (
                      <div className="ordchkflex">
                        <input
                          name="isGoing"
                          type="checkbox"
                          className="ordchkboxes"
                          //checked={this.state.isGoing}
                          onChange={handleChkboxChange(com)}
                        />
                        <label className="ordchkname">
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

        <Modal isOpen={movemodal} toggle={movetoggle}>
          <ModalHeader toggle={AddProduct}>Order Status</ModalHeader>
          <ModalBody>
            <>Order Added Successfully</>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={move}>
              Okay
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
});
export default AddOrderPage;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 2px;
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
  margin-top: 39px;
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
