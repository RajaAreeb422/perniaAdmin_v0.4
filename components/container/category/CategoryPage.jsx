import React, { memo } from 'react';
//import { render } from 'node-sass';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Link from 'next/link';
import { DeleteOutline, Edit } from '@material-ui/icons';
import './clist.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import jwt_decode from "jwt-decode";



const CategoryPage = memo(props => {

  const switchstate = {};
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
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
    var decoded = jwt_decode(localStorage.getItem('token'));
 
    setUser(decoded.result)
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
   
    // if(decoded.result.role_id==1)
    // {
      axios
      .get('https://api.mazglobal.co.uk/maz-api/categories', config)
      .then(response => {
        
        if (mounted) {
          var i = 1;
         let activelist=[]
          response.data.data.map(exam => {
            exam['_id'] = i++;
          
            let pp = 'https://api.mazglobal.co.uk/' + exam.path;
            pp=pp.toString();
            exam['path']=pp
          
            
            setPath(pp)
            if (exam.parent) {
              
              response.data.data.map(p_v => {
                if (exam.parent == p_v.id) {
                  exam['parent_name'] = p_v.name;
                 
                  
                }
              });
            } else {
              exam['parent_name'] = 'null';
            }

            switchstate['switch-' + exam.id] = exam.status;
            activelist[exam.id]={
              id:exam.id,
              status:exam.status
            }
          }),
          setSactive(activelist) 
          setData(response.data.data);
          setList(response.data.data)
          
          setState(switchstate);
         
        }
    
      });
 //   }
    // else{
    //   axios
    //   .get(`https://api.mazglobal.co.uk/maz-api/categories/getCategoriesBySupplierId/${decoded.result.supplier_id}`, config)
    //   .then(response => {
        
    //     if (mounted) {
    //       var i = 1;
    //      let activelist=[]
    //       response.data.data.map(exam => {
    //         exam['_id'] = i++;
          
    //         let pp = 'https://api.mazglobal.co.uk/' + exam.path;
    //         pp=pp.toString();
    //         exam['path']=pp
         
            
    //         setPath(pp)
    //         if (exam.parent) {
              
    //           response.data.data.map(p_v => {
    //             if (exam.parent == p_v.id) {
    //               exam['parent_name'] = p_v.name;
                 
                  
    //             }
    //           });
    //         } else {
    //           exam['parent_name'] = 'null';
    //         }

    //         switchstate['switch-' + exam.id] = exam.status;
    //         activelist[exam.id]={
    //           id:exam.id,
    //           status:exam.status
    //         }
    //       }),
    //       setSactive(activelist) 
    //       setData(response.data.data);
    //       setList(response.data.data)
          
    //       setState(switchstate);
         
    //     }
    
    //   });
    // }
  

    //return () => mounted = false;
  }, []);


  //deletes the selected category from the database and generates new list..
  const move = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    
    axios
    .delete(`https://api.mazglobal.co.uk/maz-api/categories/${id}`)
      .then(response => {
       
        toggle();
        axios
          .get(`https://api.mazglobal.co.uk/maz-api/categories`, config)
          .then(res => {
            var i=1
            res.data.data.map(exam => {
              if(exam.id==id)
              {

              }
              else{
              exam['_id'] = i++;
              
              let pp = 'https://api.mazglobal.co.uk/' + exam.path;
              pp=pp.toString();
             

              setPath(pp)

              if (exam.parent) {
               
                res.data.data.map(p_v => {
                  if (exam.parent == p_v.id) {
                    exam['parent_name'] = p_v.name;
                
                  }
                });
              } else {
                exam['parent_name'] = 'null';
              }
  
              switchstate['switch-' + exam.id] = exam.status;
            }
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
      .put(`https://api.mazglobal.co.uk/maz-api/categories/${id}`, {
        status: status == false ? 0 : 1,
      })
      .then(response => {
      
      })
      .catch(error => {
        console.log(error);
      });
  };

  //set the columns and to be displayed on the interface.. Built in syntax for DataGrid Component..
  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
      field: 'patn',
      headerName: 'Image',
      width: 240,

      renderCell: params => {
        //let i=0;
        //console.log(params)
        return (
          <img
            style={{ height: '100px', width: '100px' }}
            src={params.row.path}
          />
        );
      },
    },

    { field: 'name', headerName: ' Category Name', width: 190 },
    { field: 'parent_name', headerName: 'Parent Category', width: 190 },



    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
          {user.role_id==1? 
          <>
            <Link href="/editcat/[id]" as={`/editcat/${params.row.id}`}>
              <Edit className="userEdit"></Edit>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
            <FormControlLabel
              control={
                <Switch
                  // checked={statusValues['switch-' + params.row.id]}
                  checked={Sactive[params.row.id].status==1?true:false}
                  name={'status' + params.row.id}
                  onChange={handleSwitchChange(params.row.id)}
                  color="primary"
                />
              }
              labelPlacement="start"
              label={Sactive[params.row.id].status==1 ? 'active' : 'Inactive'}
              // label={statusValues ? 'active' : 'Inactive'}
            />
            </>
            :''
            }
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h1>Categories</h1>

      {/* Link to Add Category Page */}
      {user.role_id==1 &&
      <Link href="/addCat/addCat">
        <a>
          <button className="AddButton">Add Category</button>
        </a>
      </Link>
      }
       
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

export default CategoryPage;
