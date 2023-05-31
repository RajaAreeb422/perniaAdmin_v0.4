import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'next/link';
import {
  DeleteOutline,
  EditOutlined,
  SettingsSystemDaydreamRounded,
} from '@material-ui/icons';
import './product.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const ProductPage = memo(props => {
  const switchstate = {};
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [path, setPath] = useState([]);
  const [state, setStates] = useState([]);
  const [statusValues, setState] = useState({});
  const [valu, setValue] = useState('');
  const [searched, setSearched] = useState('');
  var i;
  const [rows, setRows] = useState(data);

  useEffect(() => {
    let mounted = true;
    var decoded = jwt_decode(localStorage.getItem('token'));
 
   setUser(decoded.result)
    axios.get('https://api.mazglobal.co.uk/maz-api/products').then(response => {
        var i = 1;
        const list = [...path];
        let productList=[]
        response.data.data.map(exam => {
          exam['_id'] = i++;

          //get the category name from category id
          if(exam.collection_id!=0 )
          {
            axios
            .get(
              `https://api.mazglobal.co.uk/maz-api/categories/getCategoryByCollectionId/${exam.id}`,
            )
            .then(res => {
            
              exam['Category'] = res.data.data.name;
            })
            .catch(err => console.log(err));
          }
         else{
          axios
          .get(
            `https://api.mazglobal.co.uk/maz-api/categories/${exam.category_id}`,
          )
          .then(res => {
          
            exam['Category'] = res.data.data.name;
          })
          .catch(err => console.log(err));
         }

          if (exam.path != null) {
            //because the image path coming from backend is like "../http://95.111.240.143" and so on. so to cut out the first two dots
            // path.substring(2) fucntion is used
           
            let s = 'https://api.mazglobal.co.uk/' + exam.path;
            list.push(s);
            exam.path = s;
          } else {
            list.push(null);
          }
    
          if(decoded.result.role_id==1)
          {
            
            productList.push(exam)
          }
             
          else
          {
            
            if(decoded.result.role_id==2 && decoded.result.supplier_id==exam.supplier_id)
            {
             
             productList.push(exam)
             console.log(productList)
            }
             else ''
          }

        }),
    
        setPath(list);
        setData(productList);
        setStates(productList);
      
    });
   
   
    //return () => mounted = false;
  }, []);

  const onCheckBoxSelect=()=>{
    console.log("in check boxxxxxxxx")
  }
  //Deletes the selcted product from database and generates new product list..
  const cnfrmDelete = id => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete(`https://api.mazglobal.co.uk/maz-api/products/${id}`, config)
      .then(res => {
  
        setData(data.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  };

  //generates alert box for deleting the product
  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this??????')) {
      // Save it!
      cnfrmDelete(id);
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  };

  //filters the searched product from the product list..
  const requestSearch = name => e => {
    //console.log('In search' + e.target.value);
    var x = e.target.value;
    setValue(x);
    if (x === '') {
      const filteredRows = state;
     
      setData(filteredRows);
    } else {
      const filteredRows = data.filter(row => {
        return row.name.toLowerCase().includes(x.toLowerCase());
      });
      setData(filteredRows);
    }
  };

  //Set Columns Name to display on interface..Build in syntax for DataGrid Component..
  const columns = [
    { field: 'sku', headerName: 'SKU', width: 100 },
    // {field:"id",headerName:"UID",with:190},
    {
      field: 'image',
      headerName: 'Image',
      width: 240,

      renderCell: params => {
        //let i=0;
        //console.log(params)
        return (
          <img
            style={{ height: '70px', width: '100px' }}
            src={params.row.path}
          />
        );
      },
    },

    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'Category', headerName: 'Category', width: 190 },
    { field: 'regular_price', headerName: 'Price', width: 170 },

    {
      field: 'action',
      headerName: 'Action',
      width: 270,

      renderCell: params => {
        return (
          <>
            {/* <Link href="/editproduct/[id]" as={`/editproduct/${params.row.id}`}>
              <EditOutlined className="proEdit">Edit</EditOutlined>
            </Link> */}

            <DeleteOutline
              className="proListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="proList">
      <h1>Products</h1>

      {/* Link to Add Product Page */}
      <Link href="/addProduct/AddProduct">
        <a>
          <button className="proAddButton">Add Product</button>
        </a>
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
        placeholder="  Search Product"
        className="form-control"
        onChange={requestSearch('search')}
      />

      {/* DataGrid Component to display Product List */}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
        onSelectionModelChange={()=>onCheckBoxSelect()}
      />

      <div className="probtnclass"></div>
    </div>
  );
});

export default ProductPage;
