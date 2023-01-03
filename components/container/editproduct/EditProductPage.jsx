import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './editproduct.scss';
import './edproduct.scss';
//import "./addproduct.scss";
import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  DeleteOutline,
  EditOutlined,
  CheckCircle,
  Add,
} from '@material-ui/icons';
import EditDropZone from './EditDropZone';
import { Editor } from '@tinymce/tinymce-react';
import EditVariants from './EditVariants';
import Variants from '../addProduct/Variants';
import { toast, ToastContainer } from 'react-nextjs-toast'
//import 'react-toastify/dist/ReactToastify.css';

const EditProductPage = memo(props => {
  //const [state,setState]= useState([])
  const [disable,setDisable] = useState(true);
  const [vlist, setVList] = useState([]);
  const [vardiv, setVariantDiv] = useState(false);
  const [showcomb, setShowComb] = useState(false);
  const [path, setPath] = useState([]);
  const [error, setErrorDiv] = useState(false);
  const [editerror, setEditErrorDiv] = useState(false);
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
  
  const [variant, setVariant] = useState([]);

  const [data, setData] = useState([]);
  const [suppname, setSuppName] = useState('');

  // const[variants,setVariants]=useState([]);
  const [mydiv, showDiv] = useState(false);
  const [editval, setEditValueDiv] = useState(false);
  const [catname, setCatName] = useState('');
  const [catid, setCatId] = useState('');
  const [all_cat, setAllCategory] = useState([]);
  const [parnt, setParentName] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [Imgmodal, setImgModal] = React.useState(false);
  const [succmodal, setSuccModal] = React.useState(false);

  const Name = data.name;
  const Category_id = data.category_id;
  const Supplier_id = data.supplier_id;
  const Description = data.product_description;
  const Sku = data.sku;
  const Qty = data.quantity;
  const Price=data.price
  
  const [state, setState] = useState({
    name: Name,
    category_id: Category_id,
    supplier_id: Supplier_id,
    price:Price,
    sku:Sku,
    quantity:Qty,
    product_description: Description,
    
    variants: [],
    combinations: [],
  });
  const [combination, setCombination] = useState([]);

  const [variantVal, setVariantVal] = useState([]);
  const [editvariantVal, setEditVariantVal] = useState(['']);
  const [variantname, setVariantName] = useState({
    name: '',
    id: null,
  });
  const [sub, setSub] = useState(state.category_id);
  const router = useRouter();
 
  const { id } = router.query;
  const { name, category_id, supplier_id, product_description,sku,price,quantity } = state;
  const toggle = () => setModal(!modal);
  const Imgtoggle = () => setImgModal(!Imgmodal);
  const succtoggle = () => setSuccModal(!succmodal);

  useEffect(() => {
    
    let mounted=true
    if (!id) {
      return;
    }

    const fetchSomethingById = () => {
      if(mounted===true)
      {
      axios
        .get(`https://perniacouture.pk/pernia-api/products/${id}`)
        .then(response => {
      
          setData(response.data.data);
    
          setState(response.data.data);
          let list=[]
         
            response.data.data.images.map(item=>{
              
              //p=p.substring(p.length-2)
              let x='https://perniacouture.pk/pernia-api/'+item
              // for(let i=0;i<p.length;i++)
              // {
              //   if(p[i]===']')
              //   ''
              //   else
              //   x=x+p[i]
              // }
              list.push(x)
         
            })
         
        //  })
          setPath(list)
          var arr = [];
         if(response.data.data.variants.length==0)
         {
          state.variants = [];
          state.combinations = [];
          setVariant([]);
          setCombination([]);
          setChkbox(false)
         }
         else{
          
          
          arr[0] = response.data.data.variants;
          arr[1] = response.data.data.combinations;
          setVariant(arr[0]);
          setCombination(arr[1]);
          state.variants = variant;
          state.combinations = combination;
          if (arr != []) {
            if(arr[0]!=[])
            {
            setChkbox(true);
            if (arr[0].length == 1) setSndAddBtn(true);
            if (arr[0].length == 2) setThrdAddBtn(true);
            setDisplayDiv(true);
            setShowComb(true);
            }
          }
         }
          

         
          axios
            .get(`https://perniacouture.pk/pernia-api/products/variants`)
            .then(res => setVList(res.data.data));

          axios
            .get('https://perniacouture.pk/pernia-api/suppliers')
            .then(res => {
              setSupplier(res.data.data);
              res.data.data.map(item => {
                if (item.id === response.data.data.supplier_id) {
                  setSuppName(item.name);
                }
              });
            })
            .catch(err => console.log(err));
          axios
            .get('https://perniacouture.pk/pernia-api/categories')
            .then(res => {
              setAllCategory(res.data.data);
              res.data.data.map(cid => {
              
                if (cid.id == response.data.data.category_id) {
                  
                  if (cid.parent == null) {
                    showDiv(false);
                    setParentName(cid);
                   
                  } else {
                    showDiv(true);
                    setCatName(cid.name);
                    setCatId(cid.id);
                    axios
                      .get(
                        `https://perniacouture.pk/pernia-api/categories/${cid.parent}`,
                      )
                      .then(resp => {
                        setParentName(resp.data.data);
                        
                      });
                  }
                }
              });
            })
            .catch(err => console.log(err));
          console.log(response.data);
        });
      }
    };
    fetchSomethingById();
    return () => mounted = false;
  }, [id]);

  const submitHandler = e => {
    e.preventDefault();
    
  

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if (sub) {
      state.category_id = sub;
    }

    state.variants = variant;
    state.combinations = combination;

    
    // if(state.name=='' || state.sku==''||state.quantity==null||state.price==null||state.product_description==''||
    // state.category_id==null||state.supplier_id==null )
    // toggle()
    if(state.name=='')
    {
      toast.notify("please fill the name",{
        type:"error"
      })
    }
    else if(state.sku=='')
    {
      toast.notify("please add the sku",{
        type:"error"
      })
    }
    else if(state.quantity==null)
    {
      toast.notify("please add the auantity",{
        type:"error"
      })
    }
    else if(state.price==null)
    {
      toast.notify("please add the price",{
        type:"error"
      })
    }
    else if(state.description=='')
    {
      toast.notify("please add the description",{
        type:"error"
      })
    }
    else if(state.category_id==null)
    {
      toast.notify("please fill the category",{
        type:"error"
      })
    }
    else if(state.supplier_id==null)
    {
      toast.notify("please add the supplier name",{
        type:"error"
      })
    }
    // else if(selected.length==0)
    // {
    //   Imgtoggle()
    // }
    else{

    axios
      .put(`https://perniacouture.pk/pernia-api/products/${id}`, state, config)
      .then(response => {
      
        //setUpdatedAt(response.data.updatedAt);
        succtoggle()
      })
      .catch(error => {
        
      });
  }
};

  const handleEditorChange = (content, editor) => e => {
    const value = content;
    setDisable(false)
    setState({
      ...state,
      ['product_description']: 'hdhtttttttttt',
    });
  };
  const handleSuppChange = namee => e => {
    setDisable(false)
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    axios.get(`https://perniacouture.pk/pernia-api/suppliers/${e.target.value}`)
    .then(res=>{
     setSuppName(res.data.data.name)
     // console.log('supp',namee,res.data.data.name)
    }).catch(err=>console.log(err))
    
    setState({
      ...state,
      [namee]: value,
    });
  };

  const handleChild = childData => {
    setSelected({ ...childData });
    
  };
  const handleVariant = child => {
    setVariants({ ...child });
    //console.log('parent Variants array', variants);
  };

  const handleChange = name => e => {
    setDisable(false)
    
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });

    var arr = [];
    arr = all_cat;
    
    if (value != '') {
      showDiv(false);
      for (var i = 0; i < all_cat.length; i++) {
        if (all_cat[i].parent == value) {
          
          showDiv(true);
          break;
        }
      }

     
    } else {
      showDiv(false);
    }
  };

  const handleParentChange = name => e => {
 
    const name = e.target.name;
    const val = e.target.value;


    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubChange = name => e => {
    setDisable(false)
   
    const name = e.target.name;
    const val = e.target.value;

    setSub(val);
  };

  function requestSearch(item, index) {
    setText(item.variants);
    setDisable(false)
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
    setDisable(false)

    setText(val);

    setVariantName({
      ['name']: e.target.value,
      ['id']: null,
    });

    if (val === '') {
      setList(false);
    } else {
      setList(true);

      const filteredRows = vlist.filter(row => {
        return row.variants
          .toLowerCase()
          .includes(variantname.name.toLowerCase());
      });

      setFilterrow(filteredRows);
    }

    console.log(filterrow);
  };

  const handleChkbox = e => {
    setDisable(false)
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
    setDisable(false)
    const list = [...variantVal];
    list[index] = value;
    setVariantVal(list);
  };
  const handleSndInputChange = (e, index) => {
    setDisable(false)
    const { name, value } = e.target;
    const list = [...variantVal];
    list[index] = value;
    setVariantVal(list);
  };

  const handleEditInputChange = (e, index) => {
    setDisable(false)
    const { name, value } = e.target;
    const list = [...editvariantVal];
    list[index] = value;
    setEditVariantVal(list);
  };
  const handleAddClick = () => {
    setVariantVal([...variantVal, '']);
  };
  const handleEditAddClick = () => {
    setEditVariantVal([...editvariantVal, '']);
  };
  
  const openDiv = index => {
    setDisable(false)
    setSndDiv(true);
    setVariantVal(['']);
    setSndAddBtn(false);
  };
  const openLastDiv = index => {
    setDisable(false)
    setVariantVal(['']);
    setThrdDiv(true);
    setThrdAddBtn(false);
  };

  const handleAddVariant = index => {
    setDisable(false)
    const list = [...variant];
    if (variantVal[0] === '' || variantname.name === '') {
      setVErrorDiv(true);
    } else {
      list.push({
        id: variantname.id,
        name: variantname.name,
        values: variantVal,
      });
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
    setDisable(false)
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


    for (var i = 0; i < list[0].values.length; i++) {
      if (list.length > 1) {
        for (var j = 0; j < list[1].values.length; j++) {
          if (list.length > 2) {
            for (var k = 0; k < list[2].values.length; k++) {
              var x =
                list[0].values[i] +
                '/' +
                list[1].values[j] +
                '/' +
                list[2].values[k];
             
              const arr = {
                product_variant_name: x,
                sku: '',
                regular_price: null,
              };
              setCombination(prevArr => [...prevArr, arr]);
            }
          } else {
           
            var x = list[0].values[i] + '/' + list[1].values[j];
            
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
      const list = [...variant];
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
  const skuChange = (e, index) => {
    
    
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
    finalarr[0] = variant;
    finalarr[1] = combination;
    setVariantDiv(false);
    setShowComb(true);
    
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
    setDisable(false)
    if (confirm('Are you sure you want to delete this??????')) {
      // Save it!
      deleteComb(i);
    } else {
      // Do nothing!
      
    }
  };
  const saveVarChange = i => {
    setDisable(false)
    if (confirm('Are you sure you want to delete this??????')) {
      // Save it!
      deleteVariant(i);
    } else {
      // Do nothing!

    }
  };

  const deleteVariant = index => {
    var arr = [];
    for (var i = 0; i < variant.length; i++) {
      if (i === index) {
       
        if (index === 0) {
          if (variant.length === 1) {
            setfDiv(true);
            setVariant([]);
            setSndAddBtn(false);
          }
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


    if (arr.length === 0) {
   
      setVariantDiv(false);
     
      setVariantVal(['']);
      setDisplayDiv(false);
      setCombination([]);
      setShowComb(false);
    } else {
     
      setVariant(arr);
      setCombination([]);
      Combinations(arr);
    }
  };

  const deleteValue = (d_item, j) => {
    var arr = [];
    if (variant[j].values.length === 1) deleteVariant(j);
    else {
      setCombination([]);
      for (var i = 0; i < variant[j].values.length; i++) {
        if (variant[j].values[i] === d_item) {
        } else {
          arr.push(variant[j].values[i]);
        }
      }
      variant[j].values = arr;
      Combinations(variant);
    }
  };
  const handleEditValue = j => {
    setDisable(false)
    if (editvariantVal.length === 1 && editvariantVal[0] === '') {
      setEditErrorDiv(true);
    
    } else {
    
      var arr = variant[j].values;
      for (var i = 0; i < editvariantVal.length; i++) {
        arr.push(editvariantVal[i]);
      }
      variant[j].values = arr;
      setVariant(variant);
      setCombination([]);
      Combinations(variant);
      setEditValueDiv(false);
      setErrorDiv(false);
    }
  };
  const EditValue = j => {
   
    variantVal === variant[j].values;
 
    setInt(j);
    setVariantName({
      name: variant[j].name,
      id: variant[j].id,
    });

    setEditValueDiv(true);
  };
  const move = () => {
    router.push('/product/product');
  };

  const PostEditProduct = () => (
    <div className="addpromain">
      <h1 className="newaddproTitle">Edit Product</h1>
      <ToastContainer align={"right"} position={"middle"}/>
      <div className="newaddpro">
        <form>
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
          <div className="newaddproItem">
            <label for="exampleInputName">Product Sku</label>
            <input
              type="text"
              className="newaddproSelect"
              id="name"
              placeholder="Stock Keeping Unit"
              required
              name="sku"
              value={state.sku}
              onChange={handleChange(name)}
            />
          </div>
          <div className="newaddproflexItem">
          <div className="flexdiv">
              <div className="newaddpro1Select">
            <label for="exampleFormControlSelect1">Category</label>
            <select
              className="qtySelect"
              id="parent"
              required
              placeholder={parnt.name}
              name="category_id"
              value={state.category_id}
              onChange={handleChange(name)}
            >
             
              <option value={parnt.id}>{parnt.name}</option>
              <option value="">Select Category</option>
              {all_cat.map(p => {
                if (!p.parent) return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
          </div>
          <div className="flexdiv">
              <div className="newaddpro1Select">
            <label for="exampleFormControlSelect1" style={{marginLeft:'30px'}}>Supplier</label>
            <select
              className="qtySelect"
              required
              style={{marginLeft:'30px'}}
              name="supplier"
              placeholder={suppname}
              value={state.supplier_id}
              onChange={handleSuppChange('supplier_id')}
            >
              <option value="">Select Product Supplier</option>
              {supplier.map(p => {
                return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
          </div>
          </div>

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
                <option value={state.category_id}>{catname}</option>
                <option value="">Select Category</option>
                {all_cat.map(p => {
                  if (p.parent == parnt.id)
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

              


            <div className="newaddproItem">
            <label for="exampleFormControlSelect1">Description</label>
            
            <textarea
            name="product_description"
            value={state.product_description}
            style={{width:'600px',height:'80px'}}
            onChange={handleEditorChange('product_description')}/>
              </div>
         
        
        </form>
        
      </div>
      <div className="newaddpro1">
        <label className="imgdiv">Images</label>
        {path.length===0?'':
        <EditDropZone path={path} parentCall={handleChild} />
          }
        

      </div>


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
                  <div className="hovereffect">
                   
                    <div   style={{display:'flex',flexDirection:'row',alignContent:'space-between'}}>
                      
                     <label className="vname"> {item.name}</label>
                      
                      <div style={{marginLeft:'570px'}}>
                      <EditOutlined
                      //style={{marginLeft:'500px'}}
                       className="EditVar"
                        onClick={() => EditValue(j)}
                      />
                      <DeleteOutline
                         className="DeleteVar"
                        onClick={() => saveVarChange(j)}
                      />
                     
                      </div>
                    </div>
                    <div className="vvalue">
                      <div className="vitem">
                        {item.values.map((data, i) => {
                          return (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'rgb(33, 155, 226)',
                                height: '30px',
                                marginLeft: '20px',
                              }}
                            >
                              <div
                                style={{
                                  marginRight: '10px',
                                  marginLeft: '10px',
                                  marginTop: '4px',
                                }}
                              >
                                {data}
                              </div>
                              <div
                                style={{
                                  cursor: 'pointer',
                                  color: 'red',
                                  fontSize: '20px',
                                  marginTop: '-8px',
                                  float: 'left',
                                  marginRight: '3px',
                                }}
                                onClick={() => deleteValue(data, j)}
                              >
                                x
                              </div>

                              {/* className='dleteSVar' */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <hr style={{width:'100%'}}/>
                  </>
                );
              })}
            </div>
          </div>

          {editval && (
            <div className="variantflex">
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
                  {editvariantVal.map((data, i) => {
                    return (
                      <>
                        {console.log('dataa', data)}
                        <input
                          type="text"
                          name="value"
                          value={data}
                          className="inputfld"
                          onChange={e => handleEditInputChange(e, i)}
                        ></input>
                        {editvariantVal.length - 1 === i && (
                          <Add className="addicn" onClick={handleEditAddClick}>
                            Add
                          </Add>
                        )}
                      </>
                    );
                  })}
                </div>
                <div className="errorbtns">
                  <button
                    onClick={() => {
                      handleEditValue(int);
                    }}
                    className="donebtn"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setEditValueDiv(false);
                    }}
                    className="closebtn"
                  >
                    Close
                  </button>
                </div>
                {editerror && (
                  <div
                    style={{
                      color: 'red',
                      marginBottom: '20px',
                      marginLeft: '110px',
                    }}
                  >
                    Please Add New Value
                  </div>
                )}
              </div>
            </div>
          )}

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
          <div style={{display:'flex',flexDirection:'row'}}>
          <button
            onClick={() => {
              handleAddVariant(0);
            }}
            className="donebtn"
          >
            Done
          </button>
          <button style={{backgroundColor:'red'}}
            onClick={() => {
              setfDiv(false)
            }}
            className="donebtn"
          >
            Close
          </button>
          </div>
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
            {console.log('helooo nd divvvvvvvv', variantVal)}
            <label
              style={{ marginLeft: '110px', width: '500px' }}
              for="exampleInputName"
            >
              Option Value
            </label>
            {variantVal.map((data, i) => {
              return (
                <>
                  {console.log('in snddd dataa', data)}
                  <input
                    type="text"
                    name="value"
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
           <div style={{display:'flex',flexDirection:'row'}}>
          <button onClick={() => handleSndAddVariant(1)} className="donebtn">
            Done
          </button>
          <button style={{backgroundColor:'red'}}
            onClick={() => {
              setSndDiv(false),setSndAddBtn(true)
            }}
            className="donebtn"
          >
            Close
          </button>
          </div>
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
                  {console.log('in snddd dataa', data)}
                  <input
                    type="text"
                    name="value"
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
          <div style={{display:"flex",flexDirection:'row'}}>
          <button onClick={() => handleThrdAddVariant(1)} className="donebtn">
            Done
          </button>
          <button style={{backgroundColor:'red'}}
            onClick={() => {
              setThrdDiv(false),setThrdAddBtn(true)
            }}
            className="donebtn"
          >
            Close
          </button>
          </div>
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
                    placeholder={data.regular_price}
                    //value={data.regular_price}
                    onChange={e => priceChange(e, i)}
                    type="number"
                  />
                  <input
                    type="text"
                    className="varqty"
                    placeholder={data.sku}
                    // value={data.sku}
                    onChange={e => skuChange(e, i)}
                  />
                  <DeleteOutline
                    onClick={() => saveChange(i)}
                    className="varDelete"
                  />
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
   
   {disable==true?
      <button type="button" disabled className="newaddproBtn" >
        Update
      </button>:
      <button type="button" onClick={submitHandler} className="newaddproButton" >
      Update
    </button>
}


<Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Product Status</ModalHeader>
        <ModalBody>
          <>Please Fill all the Fields</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
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
          <>Product Updated Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>






    </div>
  );
  return <>{PostEditProduct()}</>;
});

export default EditProductPage;
