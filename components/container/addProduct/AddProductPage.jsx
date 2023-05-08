import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './addproduct.scss';
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
// import {toast} from 'react-toastify';
import DropZone from './DropZone';
import Variants from './Variants';
import router from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import jwt_decode from "jwt-decode";
//import { AddAPhoto } from '@material-ui/icons'
//import 'react-toastify/dist/ReactToastify.scss';
//import { toast, ToastContainer } from 'react-nextjs-toast'

// toast.configure();

const AddProductPage = memo(props => {
  const [state, setState] = useState({
    name: '',
    category_id:null,
    collection_id:0,
    supplier_id:null,
    price: null,
    quantity: null,
    sku: '',
    product_description: '',
   
    variants: [],
    combinations: [],
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
  const [supplier, setSupplier] = useState([]);
  const [sub, setSub] = useState(state.category_id);
  const [protext, setProText] = useState('');
  const [msg, setMsg] = useState('');
  const [prolist, setProList] = useState(false);
  const [user, setUser] = useState({});
  const [bCollection, setBrandCollection] = useState({});
  const [profilterrow, setProFilterrow] = useState([]);
  const [collectiondiv, setCollectionDiv] = useState(false);
  const [collections, setCollections] = useState([]);
  const [dberror, setDBError] = useState('');
  const [loader, setLoader] = useState();
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
    setState({...state,['supplier_id']:decoded.result.supplier_id})
    // 95.111.240.143
    // axios.get(`http://localhost:8080/ecom-api/products`).then(response => {
      if (mounted) {
        // if(decoded.result.role_id==1)
        // {
      axios
      .get(`https://api.mazglobal.co.uk/maz-api/categories`)
      .then(res => setParent(res.data.data))
      .catch(err => console.log(err));
         // }
    // else{
    //   axios
    //   .get(`https://api.mazglobal.co.uk/maz-api/categories/getCategoriesBySupplierId/${decoded.result.supplier_id}`)
    //   .then(res => setParent(res.data.data))
    //   .catch(err => console.log(err));
    //      }
        axios
          .get('https://api.mazglobal.co.uk/maz-api/suppliers')
          .then(res => setSupplier(res.data.data))
        
          .catch(err => console.log(err));

         
      }
    // });
    // return () => mounted = false;
  }, []);

  const submitHandler = e => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    setLoader(true)
    e.preventDefault();
    let comQty=0;
    let pp=state.price
    let qq=state.quantity
    let col=0;
    if(state.collection_id==0 || state.collection_id=='' || state.collection_id==null)
    col=parseInt(0)
    else
    col=state.collection_id
    col=parseInt(col)
    pp=parseInt(pp)
    qq=parseInt(qq)
   
    state.price = pp;
    state.quantity = qq;
    if(variantss.length!=0)
    {
    state.variants = variantss[0];
    state.combinations = variantss[1];
    state.combinations.map(com=>{
      comQty=parseInt(comQty)  + parseInt(com.sku)
    })
    
    }
    else{
      state.variants = null;
      state.combinations = null;

    }
   
    

    if(user.role_id==1)
    {

      if(state.name=='' || state.category_id=='' || state.category_id==null||state.sku==''||state.quantity==null||state.price==null||state.product_description==''
      || state.supplier_id==null)
    {

            setLoader(false)
            setMsg('Please Fill All The Fields')
             toggle()
    }
    else if(selected.length==0)
    {
      setLoader(false)
      Imgtoggle()
    }
    else if(state.quantity<comQty)
    {
      setMsg(`Quantity sum for combinations is ${comQty} While actual product qunatity is 
      ${state.quantity} `)
      setLoader(false)
      toggle()
    }
   
    else{
     
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
        
      
     
    }).catch(err=>console.log(err))

  }
    }
    else{
   
    if(state.name=='' || state.category_id=='' || state.category_id==null||state.sku==''||state.quantity==null||state.price==null||state.product_description==''
      )
      {
       setLoader(false)
       setMsg('Please Fill All The Fields')
       toggle()
      }
    else if(selected.length==0)
    {
      setLoader(false)
      Imgtoggle()
    }
    else if(comQty>state.qty)
    {
      setMsg(`Quantity sum for combinations is ${comQty} While actual product qunatity is ${state.quantity} `)
      setLoader(false)
      toggle()
    }
    else{
     
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
        
      
     
    }).catch(err=>
      {
        setLoader(false)
        setDBError("Database Problem")
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
      ['product_description']:e.target.value,
    });
  };
  const handleSuppChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    
    setState({
      ...state,
      ['supplier_id']: value,
    });
  };


  const handleCollChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
    
    axios.get(`https://api.mazglobal.co.uk/maz-api/collections/${value}`)
    .then(col=>{
      setBrandCollection(col)
    }).catch(err=>console.log(err))

  }
  const handleChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
    if (name == 'category_id') {
      setSub(value);
    }
    var arr = [];
    arr = parnt_cat;

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
 

  function requestproSearch(item) {
    setProList(false);
    setProText(item.name)
    axios
    .get(`https://api.mazglobal.co.uk/maz-api/collections`)
      .then(res => {

        let list = [];
        res.data.data.map(cl=>{
          if(cl.brand_id==item.id)
          {
            list.push(cl);
          }
        })
        setCollectionDiv(true);
        setCollections(list);
      })
    //     console.log('single item response', res.data.data);
    //     setProText(item.name);
    //     setProduct(res.data.data);
    //    console.log("price un",item)
    //     let list = [];
    //     if (res.data.data.combinations.length > 0) {
    //       res.data.data.combinations.map(it => {
    //         console.log("img",item.path)
    //         list.push({
    //           ...it,
    //           ['product_id']: item.id,
    //           ['path']:item.path
    //         });
    //       });

    //       setCombination(list);
    //       setCombDiv(true);
    //     } else {
    //       setCombDiv(false);
    //       setProText(item.name);
    //       const list = [...comVal];
    //       const prolist = [...nproduct];
    //       let s = sum;
    //       s = s + 1;
    //       setSum(s);
         
    //       prolist.push({
    //         product_id: item.id,
    //         product_variant_id: null,
    //         product_variant_name: '',
    //         product_name: item.name,
    //         path:item.path,
    //         price: item.price,
    //         quantity: 1,
    //       });
    //       state.products = prolist;
    //       setNewProduct(prolist);
    //       list.push({
    //         product_id: item.id,
    //         product_variant_id: null,
    //         variantname: '',
    //         product_name: item.name,
    //         path:item.path,
    //         regular_price: item.price,
    //         quantity: 1,
    //       });
        
    //       setComVal(list);
    //       var tt = total;
    //       tt = tt + item.price;
    //       setTotal(tt);
    //     }
    //   })
    //   .catch(err => console.log(err));

    //}
    //}
  }

  const AddCollection = () => {
    // setCombination([]);
       setCollectionDiv(false);
    // setProText('');
       brandtoggle();
   
  };



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
            <div className="newaddpro1Select" style={{marginLeft:'30px'}}>
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
              {console.log(parnt_cat)}
              <option value="">Select Category</option>
              {parnt_cat.map(p => {
                if (!p.parent) return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
          </div>
          </div>
          {/* 
          <div className="flexdiv">
          <div className="newaddpro1Select">
            <label for="exampleFormControlSelect1" style={{marginLeft:'30px'}}>Supplier</label>
            <select
              className="qtySelect"
              required
              name="supplier"
              style={{marginLeft:'30px'}}
              
              onChange={handleSuppChange(name)}
            >
              <option value="">Select Product Supplier</option>
              {supplier.map(p => {
                return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
          </div>
          </div>
           */}

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

          {user.role_id==1 &&
          <div className="newaddproItem">
            <label for="exampleFormControlSelect1">Supplier</label>
            <select
              className="newaddproSelect"
              id="supplier"
              required
              name="supplier_id"
              value={state.supplier_id}
              onChange={handleChange(name)}
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
            style={{width:'600px',height:'80px'}}
            required
            onChange={handleChange('product_description')}/>
        
          </div>
          
        </form>
        
      </div>
      <div className="newaddpro2">
      <button
            onClick={brandtoggle}
            style={{ marginLeft: '20px' }}
            className="ordshipbtn"
          >
            Add Collection
          </button>
          <p style={{color:'black'}}>{bCollection.name} </p>
      </div>
      <div className="newaddpro1">
        <label className="imgdiv">Images</label>

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





      <Modal isOpen={brandmodal} toggle={brandtoggle}>
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
                    onChange={handleCollChange('collection_id')}
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
        </Modal>





    </div>
  );

  return <>{PostProduct()}</>;
});
export default AddProductPage;
