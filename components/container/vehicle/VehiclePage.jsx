import React, { memo } from 'react';
//import { render } from 'node-sass';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import ToggleButton from '@material-ui/lab/ToggleButton';
//import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
//import { Link }  from "react-router-dom";
import Link from 'next/link';
//import { BrowserRouter , Switch, Route } from "react-router-dom";
import { DeleteOutline, Edit } from '@material-ui/icons';

import './vlist.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
//import DataGrid from 'react-data-grid';



const VehiclePage = memo(props => {

  const switchstate = {};
  const [data, setData] = useState([]);
  const [path, setPath] = useState();
  const [list, setList] = useState([]);
  const [Sactive, setSactive] = useState([]);
  const [statusValues, setState] = useState({});
  const [id, setId] = useState(0);
  const [valu, setValue] = useState('');
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [rows, setRows] = useState(data);


  useEffect(() => {
    let mounted = true;
    console.log('in useeffec');
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    //getting categories from database..
    axios
      .get('https://api.mazglobal.co.uk/maz-api/vehicles', config)
      .then(response => {
        console.log(response.data);
        if (mounted) {
          var i = 1;
         let activelist=[]
          response.data.data.map(exam => {
            exam['_id'] = i++;
          })
          
         
          setData(response.data.data);
          setList(response.data.data)
          
          
         
        }
    
      });

    //return () => mounted = false;
  }, []);


  //deletes the selected category from the database and generates new list..
  const move = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('moveeeeeeeeeeeeeeeee', id);
    axios
    .delete(`http://95.111.240.143:8080/ecom-api/categories/${id}`)
      .then(response => {
       
        toggle();
        axios
          .get(`http://95.111.240.143:8080/ecom-api/categories`, config)
          .then(res => {
            var i=1
            res.data.data.map(exam => {
              exam['_id'] = i++;
              let pp = 'http://95.111.240.143/ecom-api/' + exam.path;
              pp=pp.toString();
              exam['path']=pp
              console.log("ppp",pp)
              
              setPath(pp)

              if (exam.parent) {
                console.log('exam', exam.parent);
                res.data.data.map(p_v => {
                  if (exam.parent == p_v.id) {
                    exam['parent_name'] = p_v.name;
                    console.log(p_v.name);
                  }
                });
              } else {
                exam['parent_name'] = 'null';
              }
  
              switchstate['switch-' + exam.id] = exam.status;
            }),
              setData(res.data.data);
             
              setState(switchstate);
           
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
  };

  // generates alert box for deleting the category or not? 
  const handleDelete = id => {
  
    setId(id);
    
    toggle();
  };

  //filters the searched value from the list of categories
  const requestSearch =(name)=> (e) => {
    
     var x=e.target.value
      setValue(x)
      if(x=='')
      {
        const filteredRows=list
      
        setData(filteredRows)
      }
      else{
    const filteredRows = data.filter(row => {
      return row.name.toLowerCase().includes(x.toLowerCase());
    });
    setData(filteredRows);
  }
  };

  //for the purpose of active or inactive of category when the toggle button is clicked.
  //Request goes to backend that changes the status to active/inactive..
  const handleSwitchChange = id => e => {
    const newlist=Sactive
    const value = e.target.checked;
    const list = Object.assign({}, statusValues);
    list['switch-' + id] = value;
    setState(list);
    const status = list['switch-' + id];
    newlist.map(it=>{
      if(it.id==id)
      {
        it.status=value
      }
    })
    setSactive(newlist)
    axios
      .put(`http://95.111.240.143:8080/ecom-api/categories/${id}`, {
        status: status == false ? 0 : 1,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //set the columns and to be displayed on the interface.. Built in syntax for DataGrid Component..
  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    // {
    //   field: 'patn',
    //   headerName: 'Image',
    //   width: 240,

    //   renderCell: params => {
    //     //let i=0;
    //     //console.log(params)
    //     return (
    //       <img
    //         style={{ height: '70px', width: '100px' }}
    //         src={params.row.path}
    //       />
    //     );
    //   },
    // },

    { field: 'name', headerName: ' Name', width: 190 },
    { field: 'type', headerName: 'Type', width: 190 },

    { field: 'model', headerName: 'Model', width: 210 },
    { field: 'year', headerName: 'Year', width: 210 },

    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
            <Link href="/editcat/[id]" as={`/editcat/${params.row.id}`}>
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
      <h1>Vehicles</h1>

      {/* Link to Add Category Page */}
      <Link href="/addVehicle/AddVehicle">
        <a>
          <button className="AddButton">Add Vehicle</button>
        </a>
      </Link>
       
        {/* Search Bar */}
           <input
            type="text"
            name="search"
            id="header-search"
            value={valu}
            style={{height:'50px'}}
            autoComplete='off'
            placeholder="  Search Category"
            className="form-control"
            onChange={requestSearch('search')}
          />

       {/* DataGrid Component to display a list of categories */}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
      />

      {/* Alert Box Code */}
      <div className="btnclass"></div>
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

export default VehiclePage;
