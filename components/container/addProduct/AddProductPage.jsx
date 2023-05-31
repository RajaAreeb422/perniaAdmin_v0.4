import axios from 'axios';
import React, { memo } from 'react';
import './addproduct.scss';
import { useState, useEffect } from 'react';
import DropZone from './DropZone';
import Variants from './Variants';
import router from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import jwt_decode from "jwt-decode";
import { Audio,RevolvingDot } from 'react-loader-spinner';


const AddProductPage = memo(props => {
  const [state, setState] = useState({
    name: '',
    category_id: null,
    collection_id: 0,
    supplier_id: null,
    price: null,
    quantity: null,
    sku: '',
    product_description: '',

    variants: [],
    combinations: [],
  });
  const [newCol, setNewCollection] = useState({
    name:'',
    category_id: null,
    brand_id: null,
    tag_id: null,
  });
  const [modal, setModal] = React.useState(false);
  const [dbmodal, setDBModal] = React.useState(false);
  const [brandmodal, setBrandModal] = React.useState(false);
  const [Imgmodal, setImgModal] = React.useState(false);
  const [succmodal, setSuccModal] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [variantss, setVariants] = useState([]);
  const [varArr, setVarArr] = useState([]);
  const [comb, setComb] = useState([]);
  const [mydiv, showDiv] = useState(false);
  const [file, setFile] = useState({
    imageFile: '',
  });
  const [parnt_cat, setParent] = useState([]);
  const [tags, setTags] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [brand, setBrand] = useState();
  const [sub, setSub] = useState(state.category_id);
  const [protext, setProText] = useState('');
  const [msg, setMsg] = useState('');
  const [prolist, setProList] = useState(false);
  const [user, setUser] = useState({});
  const [bCollection, setBrandCollection] = useState();
  const [profilterrow, setProFilterrow] = useState([]);
  const [collectiondiv, setCollectionDiv] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collImg, setCollImg] = useState()
  const [dberror, setDBError] = useState('');
  const [loader, setLoader] = useState();
  const [colloader, setColLoader] = useState();
  const {
    name,
    category_id,
    price,
    quantity,
    sku,
    product_description,
    variants,
    combinations,
    collection_id,
    supplier_id
  } = state;
  const toggle = () => setModal(!modal);
  const dbtoggle = () => setDBModal(!dbmodal);
  const brandtoggle = () => setBrandModal(!brandmodal);
  const Imgtoggle = () => setImgModal(!Imgmodal);
  const succtoggle = () => setSuccModal(!succmodal);

  useEffect(() => {
    let mounted = true;
    var decoded = jwt_decode(localStorage.getItem('token'));

    setUser(decoded.result)
    setState({ ...state, ['supplier_id']: decoded.result.supplier_id })
    if (mounted) {
      axios
        .get(`https://api.mazglobal.co.uk/maz-api/categories`)
        .then(res => setParent(res.data.data))
        .catch(err => console.log(err));
      axios
        .get('https://api.mazglobal.co.uk/maz-api/suppliers')
        .then(res => setSupplier(res.data.data))

        .catch(err => console.log(err));

      axios
        .get('https://api.mazglobal.co.uk/maz-api/tags')
        .then(res => setTags(res.data.data))

        .catch(err => console.log(err));

    }

  }, []);

  function useUniqueId() {
    let sku=Math.random().toString(16).slice(2)
    return sku+state.name;
  }

  const submitHandler = e => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    setLoader(true)
    e.preventDefault();
    state.sku=useUniqueId()
    let comQty = 0;
    let pp = state.price
    let qq = state.quantity
    let col = 0;
    if (state.collection_id == 0 || state.collection_id == '' || state.collection_id == null)
      col = parseInt(0)
    else
    col = state.collection_id
    col = parseInt(col)
    pp = parseInt(pp)
    qq = parseInt(qq)

    state.price = pp;
    state.quantity = qq;
    if (variantss.length != 0) {
      state.variants = variantss[0];
      state.combinations = variantss[1];
      state.combinations.map(com => {
        comQty = parseInt(comQty) + parseInt(com.sku)
      })

    }
    else {
      state.variants = null;
      state.combinations = null;

    }



    if (user.role_id == 1) {

      if (state.name == '' || state.category_id == '' || state.category_id == null || state.sku == '' || state.quantity == null || state.price == null || state.product_description == ''
        || state.supplier_id == null || state.collection_id == null || state.collection_id == 0) {
        let reqFields;
        setLoader(false)
        Object.keys(state).map(v => {
          if (!state[v])
            reqFields = reqFields + v
        })
        setMsg(`Please Fill All Fields including Collection`)
        toggle()
      }
      else if (selected.length == 0) {
        setLoader(false)
        Imgtoggle()
      }
      else if (state.quantity < comQty) {
        setMsg(`Quantity sum for combinations is ${comQty} While actual product qunatity is 
      ${state.quantity} `)
        setLoader(false)
        toggle()
      }

      else {
        console.log('state',state)

        // https://api.mazglobal.co.uk/maz-api/products
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/products`,
            state,
            config,

            { headers: { 'content-type': 'application/json' } },
          )
          .then(response => {


            var formData = new FormData();
            for (const key of Object.keys(selected)) {
              formData.append('imageFile', selected[key]);

            }

            axios
              .post(
                `https://api.mazglobal.co.uk/maz-api/products/uploadProductImages/${response.data.InsertedId}`,
                formData,
                config,
                {},
              )
              .then(res => {

                setLoader(false)
                succtoggle();
              })
              .catch(error => {
                setLoader(false)
                console.log(error);
              });



          }).catch(err => console.log(err))

      }
    }
    else {

      if (state.name == '' || state.category_id == '' || state.category_id == null || state.sku == '' ||
        state.quantity == null || state.price == null || state.product_description == '' || state.collection_id == null
        || state.collection_id == 0
      ) {
        setLoader(false)
        Object.keys(state).map(v => {
          if (!state[v])
            reqFields = reqFields + v
        })
        setMsg(`Please Fill All Fields including Collection`)
        toggle()
      }
      else if (selected.length == 0) {
        setLoader(false)
        Imgtoggle()
      }
      else if (comQty > state.qty) {
        setMsg(`Quantity sum for combinations is ${comQty} While actual product qunatity is ${state.quantity} `)
        setLoader(false)
        toggle()
      }
      else {

        // https://api.mazglobal.co.uk/maz-api/products
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/products`,
            state,
            config,

            { headers: { 'content-type': 'application/json' } },
          )
          .then(response => {


            var formData = new FormData();
            for (const key of Object.keys(selected)) {
              formData.append('imageFile', selected[key]);

            }

            axios
              .post(
                `https://api.mazglobal.co.uk/maz-api/products/uploadProductImages/${response.data.InsertedId}`,
                formData,
                config,
                {},
              )
              .then(res => {
                setLoader(false)

                succtoggle();
              })
              .catch(error => {
                setLoader(false)
                setDBError("Error Uploading Image")
                dbtoggle()
                console.log(error);
              });



          }).catch(err => {
            setLoader(false)
            setDBError(`${err.response.data.message}`)
            dbtoggle()
            console.log(err)
          })

      }
    }
  };
  const move = () => {
    router.push('/product/product');
  };
  const handleEditorChange = (content, editor) => e => {
    const value = content;

    setState({
      ...state,
      ['product_description']: e.target.value,
    });
  };


  const handleCollChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;

    console.log("ee", e.target.value)
    setState({
      ...state,
      [name]: value,
    });
    //setBrandCollection(e.target.value.name)

    axios.get(`https://api.mazglobal.co.uk/maz-api/collections/${value}`)
      .then(col => {
        console.log("coll", col)
        setBrandCollection(col.data.data)
      }).catch(err => console.log(err))

  }


  const handleBrandChange = name => (e) => {
    const name = e.target.name;
    const value = e.target.value;
      setState({
        ...state,
        ['supplier_id']: value
      })
      if(value!='null'){
        axios.get(`https://api.mazglobal.co.uk/maz-api/suppliers/${value}`)
        .then(res=>{
          setBrand(res.data.data)
        })
        .catch(err=>console.log(err))

      getCollectionsBySupplierId(value)
      }
      else{
       
        setBrand()
      }
    }

  const handleChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    var arr = [];
    arr = parnt_cat;
    setState({
      ...state,
      [name]: value,
    });


    if (name == 'category_id') {
      setSub(value);
    }


    if (value != '') {
      showDiv(false);
      for (var i = 0; i < parnt_cat.length; i++) {
        if (parnt_cat[i].parent == value) {
          showDiv(true);
          break;
        }
      }

    } else {
      showDiv(false);
    }
  };

  const handleSubChange = name => e => {
    const name = e.target.name;
    const val = e.target.value;

    setSub(val);
  };

  const handleChild = childData => {
    setSelected({ ...childData });

  };
  const handleVariant = child => {
    setVariants({ ...child });

  };

  const InputProSearch = name => e => {
    const val = e.target.value;

    setProText(val);
    if (val === '') {
      setProList(false);

    } else {
      setProList(true);

      const filteredRows = supplier.filter(row => {
        return row.name.toLowerCase().includes(protext.toLowerCase());
      });
      // setData(filteredRows);

      setProFilterrow(filteredRows);
    }


  };

  function getCollectionsBySupplierId(id) {

    axios
      .get(`https://api.mazglobal.co.uk/maz-api/collections`)
      .then(res => {

        let list = [];
        res.data.data.map(cl => {
          if (cl.brand_id == id) {
            cl['status'] = false;
            list.push(cl);
          }
        })
        //setCollectionDiv(true);
        setCollections(list);
      })

  }

  function requestproSearch(item) {
    setProList(false);
    setProText(item.name)
    axios
      .get(`https://api.mazglobal.co.uk/maz-api/collections`)
      .then(res => {

        let list = [];
        res.data.data.map(cl => {
          if (cl.brand_id == item.id) {
            list.push(cl);
          }
        })
        setCollectionDiv(true);
        setCollections(list);
      })

  }

  const AddCollection = () => {
    console.log('in add coll')
    setColLoader(true)
    if(newCol.name=='' || newCol.category_id=='' || newCol.category_id==null
    ||newCol.tag_id=='' ||newCol.tag_id==null  ||  brand.id==null || !collImg)
    {
       console.log('in add coll')
       brandtoggle()
       setColLoader(false)
       setDBError(`Please add all the fields`)
       dbtoggle()
    }
    else
    {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      //let bb=parseInt(newCol.brand_id);
      let cc=parseInt(newCol.category_id);
      let tt=parseInt(newCol.tag_id);
      newCol.brand_id=brand.id;
      newCol.category_id=cc;
      newCol.tag_id=tt;
      
      console.log('col',newCol)
      axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/collections`,
        newCol,config,
      ).then(response=>{
        var formData = new FormData();
        formData.append('imageFile', collImg);
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/collections/uploadCollectionImage/${response.data.InsertedId}`,
            formData,
            config,
            {},
          )
          .then(res => {
            setColLoader(false)
            setMsg(`Collection Added Successfully`)
            brandtoggle()
            getCollectionsBySupplierId(brand.id)
            setNewCollection({
              name:'',
              category_id:null,
              brand_id:null,
              tag_id:null
            })
            
          })
      .catch(error => {
        setColLoader(false)
        setDBError(`Error adding the collection Image`)
        dbtoggle()
        console.log(error);
      });
    }).catch(err=>{
      console.log(err)
       setColLoader(false)
      setDBError(`Error adding the product collection `)
      dbtoggle()
    })
        
    }

  };

  const handleCollectionStatusChange = (e, coll) => {
    console.log('e', e.target.value)
    console.log('coll', coll)

    setState({
      ...state,
      ['collection_id']: coll.id
    })
    collections.map(cl => {
      if (cl.id === coll.id) {
        cl.status = !cl.status
      }
      else {
        console.log('status', cl.status)
        cl.status = false
      }

    })

  }

  const handleNewCollectionChange= name => e =>{
    console.log('ee',e.target.name, " ",e.target.value)
    setNewCollection({
      ...newCol,
      [name]:e.target.value
    })
  }
  const handleNewCollectionImageChange= name => e =>{
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];
      setCollImg(imgg);
    }
  }

  const PostProduct = () => (
    <div className="addpromain">
      {loader && <div className="Loader" />}
      <div
        className="order"
        style={
          loader === true ? { backgroundColor: 'black', opacity: '0.2' } : {}
        }
      >
        <h1 className="newaddproTitle">New Product</h1>

        <div className="newaddpro">
          <form >
            <div className="newaddproItem">
              <label for="exampleInputName">Name</label>
              <input
                type="text"
                className="newaddproSelect"
                id="name"
                placeholder="Your Product Label"
                required
                name="name"
                value={state.name}
                onChange={handleChange(name)}
              />
            </div>
            <div className="newaddproflexItem">
              <div className="flexdiv">
                <div className="newaddpro1Select">
                  <label for="exampleInputName">Product Sku</label>
                  <input
                    type="text"
                    className="newaddproSelect"
                    id="name"
                    placeholder="Stock Keeping Unit"
                    required
                    name="sku"
                    style={{
                      width: '285px',
                      border: ' 1px solid gray',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                    value={state.sku}
                    onChange={handleChange(name)}
                  />
                </div>
              </div>

              <div className="flexdiv">
                <div className="newaddpro1Select" style={{ marginLeft: '30px' }}>
                  <label for="exampleFormControlSelect1"  >Category</label>
                  <select
                    className="qtySelect"
                    id="parent"
                    required
                    name="category_id"
                    style={{
                      width: '285px',
                      border: ' 1px solid gray',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                    value={state.category_id}
                    onChange={handleChange(name)}
                  >
                   
                    <option value="">Select Category</option>
                    {parnt_cat.map(p => {
                      if (!p.parent) return <option value={p.id}>{p.name}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Category Module */}
            {mydiv && (
              <div className="newaddproItem">
                <label for="exampleFormControlSelect1">Sub Category</label>
                <select
                  className="newaddproSelect"
                  id="sub"
                  required
                  name="category"
                  value={sub}
                  onChange={handleSubChange(name)}
                >
                  {console.log('cat is', state.category_id)}
                  <option value={state.category_id}>Select Category</option>
                  {parnt_cat.map(p => {
                    if (p.parent == state.category_id)
                      return <option value={p.id}>{p.name}</option>;
                  })}
                </select>
              </div>
            )}


            <div className="newaddproflexItem">
              <div className="flexdiv">
                <div className="newaddpro1Select">
                  <label for="exampleFormControlSelect1">Price</label>
                  <input
                    required
                    type="number"
                    name="price"
                    placeholder="  Price in Rs..."
                    style={{
                      width: '285px',
                      border: ' 1px solid gray',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                    value={state.price}
                    onChange={handleChange(name)}
                  />
                </div>
              </div>
              <div className="flexdiv">
                <div className="newaddpro1Select" style={{ marginLeft: '30px' }}>
                  <label for="exampleFormControlSelect1">Quantity</label>
                  <input
                    style={{
                      width: '285px',
                      border: ' 1px solid gray',
                      borderRadius: '5px',
                      height: '35px',
                    }}
                    required
                    placeholder="  Quantity"
                    name="quantity"
                    type="number"
                    value={state.quantity}
                    onChange={handleChange(name)}
                  />
                </div>
              </div>
            </div>

            {user.role_id == 1 &&
              <div className="newaddproItem">
                <label for="exampleFormControlSelect1">Supplier</label>
                <select
                  className="newaddproSelect"
                  id="supplier"
                  required
                  name="supplier_id"
                  value={state.supplier_id}
                  onChange={handleBrandChange(name)}
                >
                  {supplier.map(p => (
                    <option value={p.id}>{p.name}</option>
                  ))}
                  <option value="null">Select Supplier</option>
                </select>
              </div>
            }

            <div className="newaddproItem">
              <label for="exampleFormControlSelect1">Description</label>

              <textarea
                name="product_description"
                style={{ width: '600px', height: '80px' }}
                required
                onChange={handleChange('product_description')} />

            </div>

          </form>

        </div>
        {brand &&
        <div className="newaddpro2">
          <button
            onClick={brandtoggle}
            style={{ marginLeft: '20px' }}
            className="ordshipbtn"
          >
            Add Collection
          </button>
          </div>
        }
       
        <div className="newaddpro1">
          <h3>Collections</h3>
          {brand ?
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '8px' }}>
            {collections.map(coll => (
              <div style={{ display: 'flex', padding: '20px' }}>
                <input
                  type="checkbox"
                  checked={coll.status}
                  onChange={e => handleCollectionStatusChange(e, coll)}
                  name="status"
                  value={coll.id}
                />
                <label style={{ color: 'black' }}>{coll.name}</label>
              </div>
            ))
            }
          </div>:
          <p>Please Select Supplier To see its collections</p>
          }
          
        </div>
        <div className="newaddpro1">
          <label className="imgdiv">Images 
            <small>
              (image name must be less than equal to 10 characters)
            </small>
          </label>

          <DropZone parentCall={handleChild} />
        </div>

        <span>
          <Variants variantCall={handleVariant} />
        </span>
        <button type="submit" onClick={submitHandler} className="newaddproButton">
          Save
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Product Status</ModalHeader>
        <ModalBody>
          <>{msg}</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={dbmodal} toggle={dbtoggle}>
        <ModalHeader toggle={dbtoggle}>Alert</ModalHeader>
        <ModalBody>
          <>{dberror}</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={dbtoggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={Imgmodal} toggle={Imgtoggle}>
        <ModalHeader toggle={Imgtoggle}>Product Status</ModalHeader>
        <ModalBody>
          <>Please Select an Image</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={Imgtoggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={succmodal} toggle={succtoggle}>
        <ModalHeader toggle={succtoggle}>Product Status</ModalHeader>
        <ModalBody>
          <>Product Added Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>





      {/* <Modal isOpen={brandmodal} toggle={brandtoggle}>
          <ModalHeader toggle={AddCollection}>Collections</ModalHeader>
          <ModalBody>
            <form>
              <label for="exampleFormControlSelect1">Brand Name</label>
              <input
                type="text"
                name="search"
                id="header-search"
                autoComplete="off"
                // options={searchList}
                value={protext}
                // openMenuOnClick={false}
                placeholder="Search Brand"
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

              {collectiondiv && (
                <>
                   <label for="exampleFormControlSelect1" style={{marginTop:'10px'}}>Brand Collections</label>
                   <select 
                    className="form-control" 
                    style={{marginTop:'10px'}}
                    id="collection"
                    required
                    name="collection_id"
                    onChange={handleCollChange("collection_id")}
                   >
                  {collections.map((com, i) => {
                    return (
                      <option value={com.id}>{com.name}</option>
                     
                    );
                  })}
                   </select>
                </>  
              )}

            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={AddCollection}>
              Okay
            </Button>
          </ModalFooter>
        </Modal> */}

      <Modal isOpen={brandmodal} toggle={brandtoggle}>
        <ModalHeader toggle={AddCollection}>Add Collection For Brand {brand?brand.name:''}</ModalHeader>
        <ModalBody>
          <div>
            <center>
            <h6 for="exampleFormControlSelect1">{brand?brand.name:''}</h6>
            </center>

            <label>Collection Name</label>
            <input
              type="text"
              style={{ marginLeft: '0px', width: '300px' }}
              placeholder="name"
              className="form-control"
              name="name"
              value={newCol.name}
              onChange={handleNewCollectionChange('name')}
            />

            <label style={{ marginLeft: '0px' }}>Tag</label>
            <select
              className="form-control"
              id="tag_id"
              required
              name="tag_id"
              value={newCol.tag_id}
              style={{ marginBottom: '10px', width: '300px', marginLeft: '0px' }}
              onChange={handleNewCollectionChange('tag_id')}
            >
              {tags.map(it => (
                <option value={it.id}>{it.name}</option>
              ))

              }
              <option value={-1}>Other</option>
            </select>

            <label style={{ marginLeft: '0px' }}>Category</label>
            <select
              className="form-control"
              id="category_id"
              required
              value={newCol.category_id}
              name="category_id"
              style={{ marginBottom: '10px', width: '300px', marginLeft: '0px' }}
              onChange={handleNewCollectionChange('category_id')}
            >
              {parnt_cat.map(it => (
                <option value={it.id}>{it.name}</option>
              ))

              }
            </select>
            <label style={{ marginLeft: '0px' }}>Image</label>
            <input
              type="file"
              id="imageFile"
              required
              name="imageFile"
              accept='image/*'
              onChange={handleNewCollectionImageChange('imageFile')}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" style={{display:'flex'}} onClick={()=>AddCollection()}>
             {colloader ?
              <RevolvingDot
               height="80"
               width="80"
               radius="9"
               color="black"
               ariaLabel="loading"
               wrapperStyle
               wrapperClass
              />
             : <span>Add</span>
            }
          
          </Button>
        </ModalFooter>
      </Modal>



    </div>
  );

  return <>{PostProduct()}</>;
});
export default AddProductPage;
