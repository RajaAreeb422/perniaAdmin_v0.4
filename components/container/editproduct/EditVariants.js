import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import router, { useRouter } from 'next/router';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Input } from 'reactstrap';
import {
  FileCopy,
  SettingsSystemDaydreamTwoTone,
  Visibility,
} from '@material-ui/icons';
import {
  DeleteOutline,
  EditOutlined,
  CheckCircle,
  Add,
} from '@material-ui/icons';
// import router from 'next/router';

const EditVariants = props => {
  const [state, setState] = useState([]);
  const [data, setData] = useState([]);
  const [vardiv, setVariantDiv] = useState(false);
  const [showcomb, setShowComb] = useState(false);
  const [error, setErrorDiv] = useState(false);
  const [verror, setVErrorDiv] = useState(false);
  const [filterrow, setFilterrow] = useState([]);
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
  // const Name=data[0].name
  // const Values=data[0].values
  // const Id=data[0].id
  const [variant, setVariant] = useState([
    {
      id: null,
      name: '',
      values: [],
    },
  ]);
  const [combination, setCombination] = useState([]);

  const [variantVal, setVariantVal] = useState([
    {
      value: '',
    },
  ]);
  const [variantname, setVariantName] = useState({
    name: '',
    id: null,
  });
  // const {name,values}=variant;
  useEffect(() => {
    let mounted = true;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log(config);
    axios
      .get(`https://perniacouture.pk/pernia-api/products/variants`)
      .then(response => {
        setState(response.data.data);
        setData(props.variants);
        setVariant(data[0]);
        setCombination(data[1]);
        console.log('callllllllllll is', props.variants[0].name);
        // if (mounted) {

        // }

        //setRows(data)
        //console.log(response.data)
      })
      .catch(err => console.log(err));

    // return () => (mounted = false);
  }, []);

  function requestSearch(item, index) {
    setText(item.variants);

    setErrorDiv(false);
    setList(false);

    setVariantName({
      ['name']: item.variants,
      ['id']: item.id,
    });

    console.log('Add Search');
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

    console.log(filterrow);
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
    list[index][name] = value;
    setVariantVal(list);
  };

  const handleSndInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...variantVal];
    list[index][name] = value;
    setVariantVal(list);
  };
  const handleAddClick = () => {
    setVariantVal([...variantVal, {}]);
  };
  // const handleSndAddClick = () => {
  //   setVariantVal([...variantVal, { }]);
  // };
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

    if (variantVal[0].value === '' || variantname.name === '') {
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
      setVariantVal([
        {
          value: '',
        },
      ]);
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
      console.log('list', list);
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
      setVariantVal([
        {
          value: '',
        },
      ]);
      setVariantName({
        name: '',
        id: null,
      });
      console.log('variant', variant);
      setCombination([]);
      Combinations(list);
    }
  };

  const Combinations = list => {
    console.log('comboooooooo', combination);
    console.log('variantssssssssss', variant);
    console.log('listssssssssss', list);
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
                  list[0].values[i].value +
                  '/' +
                  list[1].values[j].value +
                  '/' +
                  list[2].values[k].value;
                console.log('xxx', x);
                const arr = {
                  product_variant_name: x,
                  sku: '',
                  regular_price: null,
                };
                setCombination(prevArr => [...prevArr, arr]);
              }
            } else {
              console.log('else');
              var x = list[0].values[i].value + '/' + list[1].values[j].value;
              console.log('2nnddddd var', x);
              const arr = {
                product_variant_name: x,
                sku: '',
                regular_price: null,
              };
              setCombination(prevArr => [...prevArr, arr]);
            }
          }
        } else {
          console.log('item value');
          const arr = {
            product_variant_name: list[0].values[i].value,
            sku: '',
            regular_price: null,
          };
          console.log(arr);
          setCombination(prevArr => [...prevArr, arr]);
        }
      }
    }
    // variant[0].variant_value.map((item,i)=>{
    //   console.log('lengthlllllll')
    //   if(variant.length>1)
    //   {
    //     console.log('iffff')
    //     variant[1].variant_value.map((item1,i)=>{
    //       if(variant.length>2)
    //       {
    //         variant[2].variant_value.map((item2,i)=>{
    //           var x=item.value+'/'+item1.value+'/'+item2.value
    //           console.log('xxx',x)
    //           const arr={
    //             product_variant_name:x,
    //             sku:'',
    //             regular_price:null
    //           }
    //            setCombination(prevArr=>[...prevArr,arr])
    //         }
    //         )

    //       }
    //       else{
    //         console.log('else')
    //         var x=item.value+'/'+item1.value
    //         console.log('2nnddddd var',x)
    //         const arr={
    //           product_variant_name:x,
    //           sku:'',
    //           regular_price:null
    //         }
    //          setCombination(prevArr=>[...prevArr,arr])
    //       }
    //     }
    //     )
    //   }
    //   else{
    //     console.log('item value',item.value)
    //     const arr={
    //       product_variant_name:item.value,
    //       sku:'',
    //       regular_price:null
    //     }
    //     console.log(arr)
    //      setCombination(prevArr=>[...prevArr,arr])
    //   }
    // }
    // )
  };

  const handleThrdAddVariant = index => {
    if (text === variant[1].name || text === variant[0].name) {
      setErrorDiv(true);
    } else {
      const list = [...variant];

      // list[1]['values'] = variantVal;
      // list[1]['name']=variantname.name;
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

      setVariantVal([
        {
          value: '',
        },
      ]);
      setVariantName({
        name: '',
        id: null,
      });
      console.log('variant', variant);
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
  const skuChange = (e, index) => {
    // const{name,value}=e.target
    console.log('price value', e.target.value);
    // var arr=combination
    //   arr[index]={
    //   product_variant_name:arr[index].product_variant_name,
    //   sku:e.target.value,
    //   regular_price:arr[index].regular_price
    // }
    // setCombination(arr)
    const { name, value } = e.target;
    combination[index] = {
      product_variant_name: combination[index].product_variant_name,
      sku: e.target.value,
      regular_price: combination[index].regular_price,
    };
    console.log(combination[index]);
    setCombination(combination);
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
    console.log('hhhhhhhaftatar');
    // setModalOpen(false)
    if (confirm('Are you sure you want to delete this??????')) {
      // Save it!
      deleteComb(i);
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
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

  const movetoParent = () => {
    var finalarr = [];
    finalarr[0] = variant;
    finalarr[1] = combination;
    console.log('fileeeeee', finalarr);
    props.variantCall(finalarr);
    setVariantDiv(false);
    setShowComb(true);
    //setUploadBtn(false)
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
                  <>
                    <div className="vname">{item.name}</div>
                    <div className="vvalue">
                      <div className="vitem">
                        {item.values.map((data, i) => {
                          return (
                            <div className="vflex">
                              <span>{data}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
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
                    value={data.value}
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
                    value={data.value}
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

          <button onClick={handleSndAddVariant(1)} className="donebtn">
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
            {/* <input
          
          type="text"
          name="name"
          className="inputfld"
          value={variantname.name}
          onChange={e =>handleNameChange(e,1)}
        ></input> */}
            <input
              type="text"
              name="name"
              // id="header-search"
              // options={searchList}
              value={variantname.name}
              autoComplete="off"
              onKeyUp={e => handleDivTime()}
              // openMenuOnClick={false}
              // placeholder="Search User"
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
                    value={data.value}
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
                <div class="var_flex">
                  <div className="varcom" style={{ fontWeight: 'bold' }}>
                    {data.product_variant_name}
                  </div>
                  <input
                    className="varprice"
                    placeholder=" price"
                    value={data.regular_price}
                    onChange={e => priceChange(e, i)}
                    type="number"
                  />
                  <input
                    type="text"
                    className="varqty"
                    placeholder=" Quantity"
                    // value={data.sku}
                    onChange={e => skuChange(e, i)}
                  />
                  <DeleteOutline className="varDelete" />
                </div>
              </div>
            );
          })}
          <button className="movebtn" onClick={movetoParent}>
            Done
          </button>
        </div>
      )}
      {showcomb && (
        <div className="displaycomb">
          {/* <Visibility/>  */}
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
export default EditVariants;
