import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Link from 'next/link';
import { DeleteOutline, EditOutlined,EmailOutlined } from '@material-ui/icons';
import './coupon.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import { data } from '../../../data';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const CouponPage = memo(props => {
  const [state, setState] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState('');
  const [valu, setValue] = useState('');
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    let mounted = true;

    axios
      .get('http://95.111.240.143:8080/ecom-api/coupons')
      .then(res => {
        let list=[]
        if (mounted) {
          res.data.data.map(ord=>{
            let date=''
          const d = new Date(ord.expiry_date);
          let dd=d.toString()
          for(let i=0; i<15;i++)
              date=date+dd[i]
             ord.expiry_date= date
             list.push(ord)
          })
          
          setState(list);
          setList(response.data.data);
        }
      })
      .catch(err => console.log(err));
    axios
      .get('http://95.111.240.143:8080/ecom-api/users', config)
      .then(response => {
        if (mounted) {
          let emails = [];
          response.data.data.map((item, i) => {
            console.log('it', item.email);
           
        
            emails.push(item.email);
          });
          setUser(emails);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const cnfrmDelete = id => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete(`http://95.111.240.143:8080/ecom-api/coupons/${id}`, config)
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

  const handleCoupon = id => {
    console.log('handlecoupon',user);
    state.map(it => {
      if (it.id == id) {
        axios
          .post(`http://95.111.240.143:8080/ecom-api/coupons/sendtoAll`, {
            users: user,
            coupon: it,
          })
          .then(res => {
            console.log(res.data);
            toggle()
          })
          .catch(err => console.log(err));
      }
    });
  };

  const columns = [
  //  { field: 'id', headerName: 'ID', width: 70 },

    {
      field: 'coupon_code',
      headerName: 'Code',
      width: 160,
    },

    { field: 'coupon_type', headerName: 'Coupon Type', width: 190 },

    { field: 'discount_value', headerName: 'Discount Value', width: 160 },

    {
      field: 'expiry_date',
      headerName: 'Expiry Date',
      width: 180,
    },
    { field: 'discount_type', headerName: 'Discount Type', width: 160 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <>
            <Link href="/editcoupon/[id]" as={`/editcoupon/${params.row.id}`}>
              <EditOutlined className="copEdit">Edit</EditOutlined>
            </Link>

            <EmailOutlined
              className="coupon-user-btn"
              onClick={() => handleCoupon(params.row.id)}
           /> 
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
      <h1>Coupons</h1>

      <Link href="/addCoupon/AddCoupon">
        <a>
          <button className="copAddButton">Add Coupon</button>
        </a>
      </Link>
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
        placeholder="  Search Coupon by code"
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
        <ModalHeader toggle={toggle}>Coupon Status</ModalHeader>
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

export default CouponPage;
