import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Link from 'next/link';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import './shipper.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const Data = memo(props => {
  const [modal, setModal] = React.useState(false);
  const [id, setId] = useState(0);
  const [valu, setValue] = useState('');
  const toggle = () => setModal(!modal);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    setUser(decoded.result)
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
   
    if(decoded.result.role_id==1)
    {
    axios.get('https://api.mazglobal.co.uk/maz-api/shipping').then(response => {
      var i = 1;
      response.data.data.map(item => {
        item['_id'] = i++;
      });
      setData(response.data.data);
      setList(response.data.data);
    });
  }
  else{
    axios.get(`https://api.mazglobal.co.uk/maz-api/shipping/byBrand/${decoded.result.supplier_id}`)
    .then(response => {
      var i = 1;
      response.data.data.map(item => {
        item['_id'] = i++;
      });
      setData(response.data.data);
      setList(response.data.data);
    });
  }
    //return () => mounted = false;
  }, []);

  //filters the searched shipper from the list
  const requestSearch = name => e => {
    var x = e.target.value;
    setValue(x);

    if (x == '') {
      const filteredRows = list;
      setData(filteredRows);
    } else {
      const filteredRows = data.filter(row => {
        return row.name.toLowerCase().includes(x.toLowerCase());
      });
      setData(filteredRows);
    }
  };

  //generates the alert box to delete shipper or not
  const handleDelete = id => {
    setId(id);
    toggle();
  };

  //deletes the selected shipper from the database and creates the new list.
  const move = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('moveeeeeeeeeeeeeeeee', id);
    axios
      .delete(`https://api.mazglobal.co.uk/maz-api/shipping/${id}`, config)
      .then(response => {
        console.log(response);
        toggle();
        axios
          .get(`https://api.mazglobal.co.uk/maz-api/shipping`, config)
          .then(res => {
            setData(res.data.data);
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
  };

  //sets the column name for the supplier list and the syntax is built in for the DataGrid component.
  const columns = [
    { field: 'id', headerName: 'ID', width: 240 },
    // { field: 'id', headerName: 'UID', with: 320 },
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'price', headerName: 'Cost', width: 240 },
    { field: 'category', headerName: 'Category', width: 240 },

    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <>
            <Link
              href="../editShipping/[id]"
              as={`/editShipping/${params.row.id}`}
            >
              <EditOutlined className="proEdit">Edit</EditOutlined>
            </Link>

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
      <h1>Shippers</h1>

      {/* Link to Add Shipper Page */}
      <Link href="../addShipper/index">
        <a>
          <button className="proAddButton">Add Shipper</button>
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
        placeholder="  Search Shipper"
        className="form-control"
        onChange={requestSearch('search')}
      />

      {/* DataGrid Component fot displaying the Shippers List */}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
      />

      {/* Alert box Code */}
      <div className="probtnclass"></div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Are You Sure You Want to delete this?</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            Yes
          </Button>
          <Button color="primary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default Data;
