import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import router, { useRouter } from 'next/router';

import { Label, FormGroup, Input } from 'reactstrap';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import {
  DeleteOutline,
  EditOutlined,
  CheckCircle,
  Add,
} from '@material-ui/icons';
import './variant.scss';

const Variants = props => {
  const [state, setState] = useState([]);
  const [vardiv, setVariantDiv] = useState(false);
  const [showcomb, setShowComb] = useState(false);
  const [error, setErrorDiv] = useState(false);
  const [verror, setVErrorDiv] = useState(false);
  const [filterrow, setFilterrow] = useState([]);
  const [pr_error, setPrError] = useState([]);
  const [text, setText] = useState('');
  const [stext, setSText] = useState('');
  const [list, setList] = useState(false);
  const [chkbox, setChkbox] = useState(false);
  const [fdiv, setfDiv] = useState(false);
  const [snddiv, setSndDiv] = useState(false);
  const [thrddiv, setThrdDiv] = useState(false);
  const [sndaddbtn, setSndAddBtn] = useState(false);
  const [thrdaddbtn, setThrdAddBtn] = useState(false);
  const [displaydiv, setDisplayDiv] = useState(false);
  const [ntext, setnText] = useState('');
  const [int, setInt] = useState(0);
  const [chkVariant, setChkVariant] = useState(false);
  const [variant, setVariant] = useState([
    {
      id: null,
      name: '',
      values: [],
    },
  ]);
  const [combination, setCombination] = useState([]);

  const [variantVal, setVariantVal] = useState(['']);
  const [variantname, setVariantName] = useState({
    name: '',
    id: null,
  });
 
  const { name, values } = variant;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  
  useEffect(() => {
    let mounted = true;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    //https://api.mazglobal.co.uk/maz-api/products
    axios
      .get(`https://api.mazglobal.co.uk/maz-api/products/variants`)
      .then(response => {
        setState(response.data.data);
        if (mounted) {
        }

        //setRows(data)
        //console.log(response.data)
      })
      .catch(err => console.log(err));

    return () => (mounted = false);
  }, []);

  function requestSearch(item, index) {
    setText(item.variants);

    setErrorDiv(false);
    setList(false);

    setVariantName({
      ['name']: item.variants,
      ['id']: item.id,
    });


    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  }

  const handleSndNameChange = (e, index) => {
    setVariantName({
      ['name']: e.target.value,
    });
  };

  const handleNameChange = (e, index) => {
    const val = e.target.value;

    setText(val);

    setVariantName({
      ['name']: e.target.value,
      ['id']: null,
    });

    if (val === '') {
      setList(false);
    } else {
      setList(true);

      const filteredRows = state.filter(row => {
        return row.variants
          .toLowerCase()
          .includes(variantname.name.toLowerCase());
      });

      setFilterrow(filteredRows);
    }

  };

  const handleChkbox = e => {
    setChkbox(e.target.checked);
    if (e.target.checked === true) setfDiv(true);
    else setfDiv(false);
  };

  const handleDivTime = e => {
    setTimeout(() => {
      setFilterrow([]);
    }, 8000);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...variantVal];
    list[index] = value;
    setVariantVal(list);
  };

  const handleSndInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...variantVal];
    list[index] = value;
    setVariantVal(list);
  };
  const handleAddClick = () => {
    setVariantVal([...variantVal, '']);
  };
  
  const openDiv = index => {
    setSndDiv(true);
    setSndAddBtn(false);
  };
  const openLastDiv = index => {
    setThrdDiv(true);
    setThrdAddBtn(false);
  };

  const handleAddVariant = index => {
    // setV1(variantVal)
    const list = [...variant];
    list[index]['values'] = variantVal;
    list[index]['name'] = variantname.name;

    if (variantVal[0] === '' || variantname.name === '') {
      setVErrorDiv(true);
    } else {
      const list = [...variant];
      list[index]['values'] = variantVal;
      list[index]['name'] = variantname.name;
      list[index]['id'] = variantname.id;
      setVariant(list);
      var x = int;
      x = x + 1;
      setInt(x);
      setfDiv(false);
      setDisplayDiv(true);
      setVErrorDiv(false);
      setSndAddBtn(true);
      setVariantDiv(true);
      setVariantVal(['']);
      setVariantName({
        name: '',
        id: null,
      });
      Combinations(list);
    }
  };
  const handleSndAddVariant = index => {
    if (text === variant[0].name) {
      setErrorDiv(true);
    } else {
      const list = [...variant];

      list.push({
        id: variantname.id,
        name: variantname.name,
        values: variantVal,
      });
      setVariant(list);
      
      var x = int;
      x = x + 1;
      setInt(x);
      setDisplayDiv(true);
      setSndDiv(false);
      setSndAddBtn(false);
      setThrdAddBtn(true);
      setText('');
      setErrorDiv(false);
      setShowComb(false);
      setVariantDiv(true);
      setVariantVal(['']);
      setVariantName({
        name: '',
        id: null,
      });

      setCombination([]);
      Combinations(list);
    }
  };

  const Combinations = list => {
   
    if (list.length === 0) {
      setVariantDiv(false);
      setVariant([
        {
          id: null,
          name: '',
          values: [],
        },
      ]);
      setDisplayDiv(false);
    } else {
      for (var i = 0; i < list[0].values.length; i++) {
        if (list.length > 1) {
          for (var j = 0; j < list[1].values.length; j++) {
            if (list.length > 2) {
              for (var k = 0; k < list[2].values.length; k++) {
                var x =
                  list[0].values[i] +
                  '_' +
                  list[1].values[j] +
                  '_' +
                  list[2].values[k];
                console.log('xxx', x);
                const arr = {
                  product_variant_name: x,
                  sku: '',
                  regular_price: null,
                };
                setCombination(prevArr => [...prevArr, arr]);
              }
            } else {
              
              var x = list[0].values[i] + '_' + list[1].values[j];
              
              const arr = {
                product_variant_name: x,
                sku: '',
                regular_price: null,
              };
              setCombination(prevArr => [...prevArr, arr]);
            }
          }
        } else {
         
          const arr = {
            product_variant_name: list[0].values[i],
            sku: '',
            regular_price: null,
          };
         
          setCombination(prevArr => [...prevArr, arr]);
        }
      }
    }
  };

  const handleThrdAddVariant = index => {
    let status=false
    variant.map(it=>{
      if(text==it.name)
      {
        status=true;
        exit;
      }
    })
    if (status==true) {
      setErrorDiv(true);
    } else {
 

      list.push({
        name: variantname.name,
        values: variantVal,
        id: variantname.id,
      });
      setVariant(list);
      var x = int;
      x = x + 1;
      setInt(x);
      setDisplayDiv(true);
      setText('');
      setErrorDiv(false);
      setThrdDiv(false);
      setThrdAddBtn(false);
      setShowComb(false);
      setVariantDiv(true);

      setVariantVal(['']);
      setVariantName({
        name: '',
        id: null,
      });
   
      setCombination([]);
      Combinations(list);
    }
  };
  const priceChange = (e, index) => {
    const { name, value } = e.target;
    combination[index] = {
      product_variant_name: combination[index].product_variant_name,
      sku: combination[index].sku,
      regular_price: e.target.value,
    };
    setCombination(combination);
  };
  const skuChange = (index)=>(e) => {
    
    const { name, value } = e.target;
    combination[index] = {
      product_variant_name: combination[index].product_variant_name,
      sku: e.target.value,
      regular_price: combination[index].regular_price,
    };
  
    setCombination(combination);
  };

  const movetoParent = () => {
    var finalarr = [];
    let list=[]
    let status=false
    finalarr[0] = variant;
    finalarr[1] = combination;
    // combination.map(it=>
    //    list.push({
    //      price:false,
    //      sku:false
    //    })
    //   )
    combination.map((co,i)=>{
  
      if(co.regular_price==null )
      status=true
      //list[i].price=true
      else if(co.sku=='')
      status=true
      //list[i].sku=true
      else if(co.regular_price==null && co.sku=='')
      {
        status=true
        //list[i].price=true
        //list[i].sku=true
      }
      else
      ''
    })
    setPrError(list)
    if(status==false)
    {

    props.variantCall(finalarr);
    setVariantDiv(false);
    setShowComb(true);
    }
    //setUploadBtn(false)
  };
  const deleteComb = index => {
    var arr = [];
    for (var i = 0; i < combination.length; i++) {
      if (i === index) {
      } else {
        arr.push(combination[i]);
      }
    }
    setCombination(arr);
    if (arr.length === 0) {
      setVariantDiv(false);
      setShowComb(false);
    }
  };
  const saveChange = i => {
   
    // setModalOpen(false)
    if (confirm('Are you sure you want to delete this??????')) {
      // Save it!
      deleteComb(i);
    } else {
    
    }
  };
  const deleteVariant = index => {
    var arr = [];
    for (var i = 0; i < variant.length; i++) {
      if (i === index) {
        if (index === 0) {
          if (variant.length === 1) setfDiv(true);
          if (variant.length === 3) setThrdAddBtn(true);
          if (variant.length === 2) {
            setThrdAddBtn(false);
            setSndAddBtn(true);
          }
        }
        if (index === 1) {
          if (variant.length === 3) setThrdAddBtn(true);
          if (variant.length === 2) {
            setThrdAddBtn(false);
            setSndAddBtn(true);
          }
        }

        if (index === 2) setThrdAddBtn(true);
      } else {
        arr.push(variant[i]);
      }
    }
    setVariant(arr);
    setCombination([]);
    Combinations(arr);
  };

  return (
    <>
      <div className="optiondiv">
        <span className="opleft">Option</span>
        <form>
          <input
            style={{ marginLeft: '50px' }}
            type="checkbox"
            checked={chkbox}
            onChange={handleChkbox}
          ></input>
          <label style={{ marginLeft: '10px' }}>
            This product has option like size/color..
          </label>
        </form>
      </div>
      {displaydiv && (
        <>
          <div className="displaydiv">
            <div className="variantflex">
              {variant.map((item, j) => {
                return (
                  <div className="hovereffect">
                    <div className="vname">
                      {item.name}
                      <DeleteOutline
                        className="dleteSVar"
                        onClick={() => deleteVariant(j)}
                      />
                    </div>
                    <div className="vvalue">
                      <div className="vitem">
                        {item.values.map((data, i) => {
                          return (
                            <div
                              style={{
                                backgroundColor: 'rgb(33, 155, 226)',
                                textAlign: 'center',
                                marginRight: '10px',
                                width: '70px',
                                marginLeft: '25px',
                              }}
                            >
                              <span>{data}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {sndaddbtn && (
            <div className="addAnother">
              <Add
                className="addicn"
                onClick={() => {
                  openDiv(true);
                }}
              ></Add>
              <span> Add Another Variant</span>
            </div>
          )}
          {thrdaddbtn && (
            <div className="addAnother">
              <Add
                className="addicn"
                onClick={() => {
                  openLastDiv(true);
                }}
              ></Add>
              <span> Add Another Variant</span>
            </div>
          )}
        </>
      )}

      {fdiv && (
        <div className="vardiv1Item" onClick={() => setFilterrow([])}>
          <div>
            <label
              style={{
                marginLeft: '110px',
                width: '500px',
                marginTop: '30px',
                marginBottom: '20px',
              }}
            >
              Option Name
            </label>

            <input
              type="text"
              name="name"
              value={variantname.name}
              required
              autoComplete="off"
              onKeyUp={e => handleDivTime()}
              className="inputfld1"
              onChange={e => handleNameChange(e, 0)}
            />

            {list && (
              <div className="lstdropdown">
                {filterrow.map(item => {
                  return (
                    <li
                      className="ulistitem"
                      onClick={() => requestSearch(item, 0)}
                    >
                      {item.variants}
                    </li>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <label
              style={{ marginLeft: '110px', width: '500px' }}
              for="exampleInputName"
            >
              Option Value
            </label>
            {variantVal.map((data, i) => {
              return (
                <>
                  {console.log('dataa', data)}
                  <input
                    type="text"
                    name="value"
                    required
                    value={data}
                    className="inputfld"
                    onChange={e => handleInputChange(e, i)}
                  ></input>
                  {variantVal.length - 1 === i && (
                    <Add className="addicn" onClick={handleAddClick}>
                      Add
                    </Add>
                  )}
                </>
              );
            })}
          </div>
          <button
            onClick={() => {
              handleAddVariant(0);
            }}
            className="donebtn"
          >
            Done
          </button>
          {verror && (
            <div
              style={{
                color: 'red',
                marginBottom: '20px',
                marginLeft: '110px',
              }}
            >
              Please Add Variants Name and Values
            </div>
          )}
        </div>
      )}

      {snddiv && (
        <div className="vardiv1Item">
          <div>
            <label
              style={{
                marginLeft: '110px',
                width: '500px',
                marginTop: '30px',
                marginBottom: '20px',
              }}
              for="exampleInputName"
            >
              Option Name
            </label>

            <input
              type="text"
              name="name"
              value={variantname.name}
              required
              autoComplete="off"
              onKeyUp={e => handleDivTime()}
              className="inputfld1"
              onChange={e => handleNameChange(e, 0)}
            />
            {error && (
              <div
                style={{
                  color: 'red',
                  marginBottom: '20px',
                  marginLeft: '110px',
                }}
              >
                This Variant has been already added
              </div>
            )}

            {list && (
              <div className="lstdropdown">
                {filterrow.map(item => {
                  return (
                    <li
                      className="ulistitem"
                      onClick={() => requestSearch(item, 1)}
                    >
                      {item.variants}
                    </li>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <label
              style={{ marginLeft: '110px', width: '500px' }}
              for="exampleInputName"
            >
              Option Value
            </label>
            {variantVal.map((data, i) => {
              return (
                <>
                  {console.log('dataa', data)}
                  <input
                    type="text"
                    name="value"
                    required
                    value={data}
                    className="inputfld"
                    onChange={e => handleSndInputChange(e, i)}
                  ></input>
                  {variantVal.length - 1 === i && (
                    <Add className="addicn" onClick={handleAddClick}>
                      Add
                    </Add>
                  )}
                </>
              );
            })}
          </div>

          <button onClick={() => handleSndAddVariant(1)} className="donebtn">
            Done
          </button>
        </div>
      )}

      {thrddiv && (
        <div className="vardiv1Item">
          <div>
            <label
              style={{
                marginLeft: '110px',
                width: '500px',
                marginTop: '30px',
                marginBottom: '20px',
              }}
              for="exampleInputName"
            >
              Option Name
            </label>
            <input
              type="text"
              name="name"
              required
              // id="header-search"
              value={variantname.name}
              autoComplete="off"
              onKeyUp={e => handleDivTime()}
              className="inputfld1"
              onChange={e => handleNameChange(e, 0)}
            />
            {error && (
              <div
                style={{
                  color: 'red',
                  marginBottom: '20px',
                  marginLeft: '110px',
                }}
              >
                This Variant has been already added
              </div>
            )}
            {list && (
              <div className="lstdropdown">
                {filterrow.map(item => {
                  return (
                    <li
                      className="ulistitem"
                      onClick={() => requestSearch(item, 2)}
                    >
                      {item.variants}
                    </li>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <label
              style={{ marginLeft: '110px', width: '500px' }}
              for="exampleInputName"
            >
              Option Value
            </label>
            {variantVal.map((data, i) => {
              return (
                <>
                  <input
                    type="text"
                    name="value"
                    required
                    value={data}
                    className="inputfld"
                    onChange={e => handleInputChange(e, i)}
                  ></input>
                  {variantVal.length - 1 === i && (
                    <Add className="addicn" onClick={handleAddClick}>
                      Add
                    </Add>
                  )}
                </>
              );
            })}
          </div>

          <button onClick={() => handleThrdAddVariant(1)} className="donebtn">
            Done
          </button>
        </div>
      )}

      {vardiv && (
        
        <div className="variantdiv">
          <label className="v_head">Variants</label>
          {combination.map((data, i) => {
            return (
              
              <div className="hov_div">
                <div className="var_flex">
                  <div className="varcom" style={{ fontWeight: 'bold' }}>
                    {data.product_variant_name}
                  </div>
                  <div style={{display:'flex',flexDirection:'column'}}>
                  <input
                    className="varprice"
                    placeholder=" price"
                    required
                    value={data.regular_price}
                    onChange={e => priceChange(e, i)}
                    type="number"
                  />
                  {!data.regular_price?
                    <p style={{color:'red'}}>required</p>:''
                  }
                  </div>
                  <div style={{display:'flex',flexDirection:'column'}}>
                  <input
                    type="text"
                    className="varqty"
                    placeholder={data.sku==''?'Quantity':data.sku}
                    name='sku'
                    required
                    //value={data.sku}
                    onChange={skuChange(i)}
                  />
                   {data.sku==''?
                    <p  className="varqty" style={{color:'red'}}>required</p>:''
                  }
                  </div>
                  <DeleteOutline
                    onClick={() => saveChange(i)}
                    className="varDelete"
                  />
             
                  {/* <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                      Sample Modal Title
                    </ModalHeader>
                    <ModalBody>Sample Modal Body Text to display...</ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={toggle}>
                        Okay
                      </Button>
                    </ModalFooter>
                  </Modal> */}
                </div>
              </div>
            );
          })}

          <button  className="movebtn" onClick={movetoParent}>
            Done
          </button>
        </div>
    
      )}

      {showcomb && (
        <div className="displaycomb">
          <span
            className="addicn"
            onClick={() => {
              setVariantDiv(true), setShowComb(false);
            }}
          >
            {' '}
            Display Combinations
          </span>
        </div>
      )}

    </>
  );
};
export default Variants;
