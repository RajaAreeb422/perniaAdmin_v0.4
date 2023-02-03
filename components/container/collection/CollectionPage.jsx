import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Link from 'next/link';
import { DeleteOutline, EditOutlined,EmailOutlined } from '@material-ui/icons';
import './coupon.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import { data } from '../../../data';
import jwt_decode from "jwt-decode";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const CollectionPage = memo(props => {
  const [state, setState] = useState([]);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);

  const [valu, setValue] = useState('');
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    
    setUser(decoded.result)
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    let mounted = true;

    if(decoded.result.role_id==1)
    {
      axios
      .get('https://api.mazglobal.co.uk/maz-api/collections')
      .then(res => {
       
        let list=[]
        if (mounted) {
          res.data.data.map(it=>{
            axios.get(`https://api.mazglobal.co.uk/maz-api/tags/${it.tag_id}`).then(respp=>{
              it['tag']=respp.data.data.name;
            }).catch(error=>console.log(error))
            axios.get(`https://api.mazglobal.co.uk/maz-api/categories/${it.category_id}`).then(ress=>{
              it['category']=ress.data.data.name;
            }).catch()
          })
          
          setState(res.data.data);
          setList(res.data.data);
        }
      })
      .catch(err => console.log(err));
    }
    else{
      axios
      .get(`https://api.mazglobal.co.uk/maz-api/collections/byBrand/${decoded.result.supplier_id}`)
      .then(res => {

        let list=[]
        if (mounted) {
          res.data.data.map(it=>{
            axios.get(`https://api.mazglobal.co.uk/maz-api/tags/${it.tag_id}`).then(respp=>{
              it['tag']=respp.data.data.name;
            }).catch(error=>console.log(error))
            axios.get(`https://api.mazglobal.co.uk/maz-api/categories/${it.category_id}`).then(ress=>{
              it['category']=ress.data.data.name;
            }).catch()
          })
          
          setState(res.data.data);
          setList(res.data.data);
        }
      })
      .catch(err => console.log(err));
    }

    
  }, []);

  const cnfrmDelete = id => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete(`https://api.mazglobal.co.uk/maz-api/collections/${id}`, config)
      .then(res => {
        setState(state.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this??????')) {
      // Save it!
      cnfrmDelete(id);
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  };

  const requestSearch = name => e => {
    var x = e.target.value;
    setValue(x);

    if (x == '') {
      const filteredRows = list;
      setState(filteredRows);
    } else {
      const filteredRows = state.filter(row => {
        return row.coupon_code.toLowerCase().includes(x.toLowerCase());
      });
      setState(filteredRows);
    }
  };



  const columns = [
  //  { field: 'id', headerName: 'ID', width: 70 },

    {
      field: 'name',
      headerName: 'Name',
      width: 160,
    },

    

    { field: 'tag', headerName: 'Tag', width: 160 },

    {
      field: 'category',
      headerName: 'Category',
      width: 180,
    },
    
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <>
            {/* <Link href="/editCollection/[id]" as={`/editCollection/${params.row.id}`}>
              <EditOutlined className="copEdit">Edit</EditOutlined>
            </Link> */}

            {/* <EmailOutlined
              className="coupon-user-btn"
              onClick={() => handleCoupon(params.row.id)}
           />  */}
            <DeleteOutline
              style={{ color: 'red', cursor: 'pointer',marginLeft:'50px' }}
              onClick={() => handleDelete(params.row.id)}
            />
            
             
          </>
        );
      },
    },
  ];

  return (
    <div className="copList">
      <h1>Collections</h1>

      <Link href="/addCollection/AddCollection">
        <a>
          <button className="copAddButton">Add New</button>
        </a>
      </Link>
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
        placeholder="  Search Collection"
        className="form-control"
        onChange={requestSearch('search')}
      />

      <DataGrid
        rows={state}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
      />

      <div className="copbtnclass"></div>
       
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Collection Status</ModalHeader>
        <ModalBody>
          <>Successfully Emailed to all the users</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
     






    </div>
  );
});

export default CollectionPage;
