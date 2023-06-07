import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import '../Styles/SuperAdmin.scss';

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';
import Link from 'next/link';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import './clist.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Table,
  Media,
  Row,
  Col,
  Badge,
} from 'reactstrap';

const UsersPage = memo(props => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [valu, setValue] = useState('');
  const [searched, setSearched] = useState('');
  const [id, setId] = useState(0);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [rows, setRows] = useState(data);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    let mounted = true;

    //get list of registered users from database
    //https://api.mazglobal.co.uk/maz-api
    axios
      .get(`https://api.mazglobal.co.uk/maz-api/users`)
      .then(response => {
    
        
          var i = 1;
          response.data.data.map(exam => {
            let date = '';
            //converts the date to Tuesday Jan 12 like format
            const d = new Date(exam.date_of_birth);
            let dd = d.toString();
            for (let i = 0; i < 15; i++) date = date + dd[i];
            exam.date_of_birth = date;
            exam['date_of_birth'] = date;
            exam['_id'] = i++;
            exam['name'] = exam.first_name + ' ' + exam.last_name;
          }),
            setData(response.data.data);
          setList(response.data.data);
      //  }
      })
      .catch(err => console.log(err));

  //  return () => (mounted = false);
  }, []);

  // Deletes the selected user from the database and creates new user list.
  const move = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete(`https://api.mazglobal.co.uk/maz-api/users/${id}`, config)
      .then(response => {
    
        toggle();
        axios
          .get(`https://api.mazglobal.co.uk/maz-api/users`, config)
          .then(response => {
            var i = 1;
            response.data.data.map(exam => {
              let date = '';
              //converts the date to Tuesday Jan 12 like format
              const d = new Date(exam.date_of_birth);
              let dd = d.toString();
              for (let i = 0; i < 15; i++) date = date + dd[i];
              exam.date_of_birth = date;
              exam['date_of_birth'] = date;
              exam['_id'] = i++;
              exam['name'] = exam.first_name + ' ' + exam.last_name;
            }),
              setData(response.data.data);
            setList(response.data.data);
          
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
  };

  // Generates aler box to delete user or not.
  const handleDelete = id => {
 
    setId(id);

    toggle();
  };

  // filteres the searched user from the list of users
  const requestSearch = name => e => {
    var x = e.target.value;
    setValue(x);
    if (x == '') {
      const filteredRows = list;
      setData(filteredRows);
    } else {
      const filteredRows = data.filter(row => {
        return row.first_name.toLowerCase().includes(x.toLowerCase());
      });
      setData(filteredRows);
    }
  };

  // Sets Column Names for the User list and the syntax used is built in for DataGrid Component.
  const columns = [
  

    { field: 'name', headerName: 'Name', width: 190 },

    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },

    { field: 'phone', headerName: 'Phone No', width: 210 },
    { field: 'date_of_birth', headerName: 'Date Of Birth', width: 210 },
    { field: 'last_login', headerName: 'Last Login', width: 150 },

    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
            <Link href="/edituser/[id]" as={`/edituser/${params.row.user_id}`}>
              <EditOutlined className="userEdit">Edit</EditOutlined>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.user_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className='same-box'>
      <h1>Users</h1>

{/* Link to Add User Page */}
<Link href="/addUser/addUser">
  <a>
    <button className="AddButton">Create User</button>
  </a>
</Link>
      </div>
    

      {/* Search Bar */}
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
        placeholder="  Search User"
        className="form-control"
        onChange={requestSearch('search')}
      />

      {/* DataGrid Component to display user list */}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        // pageSize={8}
        autoHeight={true}
       // checkboxSelection
      />

      <div className="btnclass"></div>
      {/* Alert Box Code */}
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

export default UsersPage;
