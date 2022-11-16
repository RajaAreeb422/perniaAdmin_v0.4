import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Link from 'next/link';
import { DeleteOutline, Edit } from '@material-ui/icons';
import './order.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const OrderPage = memo(props => {

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [valu, setValue] = useState('');
  const [id, setId] = useState(null);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    console.log('local',localStorage.getItem('token'))
    console.log('lres',decoded.result)
    setUser(decoded.result)
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    let mounted = true;
    console.log('in useeffec');
    //get list of orders from the database
    axios
      .get('http://localhost:8080/pernia-api/orders')
      .then(response => {
        console.log(response.data);
       
          var i = 1;
          let row=[]
          response.data.data.map(exam => {
            let date=''
            const d = new Date(exam.date);
            let dd=d.toString()
            for(let i=0; i<15;i++)
                date=date+dd[i]
                exam.date= date
            exam['date']=date    
            exam['_id'] = i++;
            //get the user name and other details from the database using user_id from order detail.
            axios
              .get(
                `http://localhost:8080/pernia-api/users/${exam.user_id}`,
                config,
              )
              .then(res => {
                exam['name'] = res.data.data.first_name;
                row.push(exam)
              })
              .catch(error => console.log(error));
          }),
          setList(row);
          setData(response.data.data);
        
      })
      .catch(err => console.log(err));
  }, []);

  //filters the searched user orders from the order list
  const requestSearch = name => e => {
    var x = e.target.value;
    setValue(x);
    
    if (x == '') {
      const filteredRows = list;
      setData(filteredRows);
    } else {
      const filteredRows = data.filter(row => {
        console.log('hey',row.name)
        if(row.name==undefined)
        ''
        else
        return row.name.toLowerCase().includes(x.toLowerCase());
      });
      setData(filteredRows);
    }
  };
  
//generates alert box to delete order or not.
  const handleDelete = id => {
    console.log(localStorage.getItem('token'));
    setId(id);
    console.log(id);
    toggle();
  };
  
  //deletes the selected order from the database and generates the new order list.
  const move = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('moveeeeeeeeeeeeeeeee', id);
    axios
      .delete(`http://95.111.240.143:8080/ecom-api/orders/${id}`, config)
      .then(response => {
        console.log(response);
        toggle();
        axios
          .get(`http://95.111.240.143:8080/ecom-api/orders`, config)
          .then(res => {
            setData(res.data.data);
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
  };

//sets the columns name for the orer list and the syntax is built in for the DataGrid component 
  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },

    { field: 'payment_status', headerName: ' Payment Status', width: 190 },
    {
      field: 'fulfillment_status',
      headerName: 'FulFilment Status',
      width: 190,
    },
    { field: 'name', headerName: 'User Name', width: 180 },
    { field: 'date', headerName: 'Date', width: 210 },
    { field: 'total_amount', headerName: 'Total_Amount', width: 210 },

    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
            <Link href="/editorder/[id]" as={`/editorder/${params.row.id}`}>
              <Edit className="userEdit"></Edit>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h1>Orders</h1>

       {/* Link to Add Order Page */}
      {/* <Link href="/addOrder/AddOrder">
        <a>
          <button className="AddButton">Create Order</button>
        </a>
      </Link> */}

     {/* Search Bar */}
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
        placeholder="  Search Order by User Name"
        className="form-control"
        onChange={requestSearch('search')}
      />
      
      {/* DataGrid Component for dispalying the list of Orders */}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
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

export default OrderPage;
