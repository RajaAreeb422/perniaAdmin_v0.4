import React, { memo } from 'react';
//import { render } from 'node-sass';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Link from 'next/link';
import { DeleteOutline, Edit, AddBox, RemoveRedEye } from '@material-ui/icons';
import './clist.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { Audio, RevolvingDot } from 'react-loader-spinner';
import '../Styles/SuperAdmin.scss';
const CategoryPage = memo(props => {
  const switchstate = {};
  const router = useRouter();
  const [loader, setLoader] = React.useState(false);
  const [editNameLoader, setEditNameLoader] = React.useState(false);
  const [editImgLoader, setEditImgLoader] = React.useState(false);
  const [msg, setMsg] = React.useState();
  const [text, setText] = React.useState();
  const [imgtext, setImgText] = React.useState();
  const [sub_category, setSubCategory] = useState({
    name: '',
    parent: null,
    status: 1,
    supplier_id: null,
    path: null,
  });
  const [data, setData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [user, setUser] = useState({});
  const [path, setPath] = useState();
  const [list, setList] = useState([]);
  const [subCList, setSubCList] = useState([]);
  const [Sactive, setSactive] = useState([]);
  const [statusValues, setState] = useState({});
  const [id, setId] = useState(0);
  const [valu, setValue] = useState('');
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [submodal, setSubModal] = React.useState(false);
  const subtoggle = () => setSubModal(!submodal);
  const [msgmodal, setMsgModal] = React.useState(false);
  const msgtoggle = () => setMsgModal(!msgmodal);
  const [subcategoryListmodal, setSubcategoryListmodal] = React.useState(false);
  const subCategoryListToggle = () =>
    setSubcategoryListmodal(!subcategoryListmodal);
  const [addsubcategorymodal, setAddSubCategoryModal] = React.useState(false);
  const addSubCategoryToggle = () =>
    setAddSubCategoryModal(!addsubcategorymodal);
  const [editsubcategorymodal, setEditSubCategoryModal] = React.useState(false);
  const editSubCategoryToggle = () =>
    setEditSubCategoryModal(!editsubcategorymodal);
  const [rows, setRows] = useState(data);
  const [subCatImg, setSubCatImg] = useState();
  const [edit_sub_cat, setEditSubCategory] = useState();
  const [edit_new_sub_cat, setEditNewSubCategory] = useState();
  const [editpath, setEditPath] = useState();
  const [neweditpath, setNewEditPath] = useState();

  useEffect(() => {
    let mounted = true;
    var decoded = jwt_decode(localStorage.getItem('token'));

    setUser(decoded.result);
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .get('https://api.mazglobal.co.uk/maz-api/categories', config)
      .then(response => {
        setAllCategories(response.data.data);
        if (mounted) {
          var i = 1;
          let activelist = [];
          let clist = [];

          response.data.data.map(it => {
            it['_id'] = i++;
            it['expand'] = false;

            if (!it.parent) {
              let pp = 'https://api.mazglobal.co.uk/' + it.path;
              pp = pp.toString();
              it['path'] = pp;
              setPath(pp);
              switchstate['switch-' + it.id] = it.status;
              activelist[it.id] = {
                id: it.id,
                status: it.status,
              };
              clist.push(it);
            }
          }),
            setSactive(activelist);
          setData(clist);
          setList(clist);

          setState(switchstate);
        }
      });
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
      })
      .catch(err => console.log(err));

    axios
      .get(`https://api.mazglobal.co.uk/maz-api/categories`, config)
      .then(response => {
        var i = 1;
        let activelist = [];
        let clist = [];
        setAllCategories(response.data.data);
        response.data.data.map(it => {
          it['_id'] = i++;
          it['expand'] = false;

          if (!it.parent) {
            let pp = 'https://api.mazglobal.co.uk/' + it.path;
            pp = pp.toString();
            it['path'] = pp;
            setPath(pp);
            switchstate['switch-' + it.id] = it.status;
            activelist[it.id] = {
              id: it.id,
              status: it.status,
            };
            clist.push(it);
          }

          setData(clist);
          setList(clist);
          setState(switchstate);
        });
      })
      .catch(error => console.log(error));
  };

  const deleteSubCategory = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete(`https://api.mazglobal.co.uk/maz-api/categories/${id}`)
      .then(response => {
        subtoggle();
      })
      .catch(err => console.log(err));

    let subList = [];
    subCList.map(it => {
      if (it.id === id) {
      } else {
        subList.push(it);
      }
    });

    setSubCList(subList);
  };

  // generates alert box for deleting the category or not?
  const handleDelete = id => {
    setId(id);
    toggle();
  };
  const handleSubDelete = id => {
    setId(id);
    subtoggle();
  };

  const expandRow = id => {
    data.map(ro => {
      if (ro.id === id) ro.expand = !ro.expand;
    });
  };
  //filters the searched value from the list of categories
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

  const handleSwitchChange = id => e => {
    const newlist = Sactive;
    const value = e.target.checked;
    const list = Object.assign({}, statusValues);
    list['switch-' + id] = value;
    setState(list);
    const status = list['switch-' + id];
    newlist.map(it => {
      if (it.id == id) {
        it.status = value;
      }
    });
    setSactive(newlist);
    axios
      .put(`https://api.mazglobal.co.uk/maz-api/categories/${id}`, {
        status: status == false ? 0 : 1,
      })
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };

  const getSubCategoriesById = id => {
    let clist = [];
    let sId;
    allCategories.map(it => {
      if (it.parent === id) {
        let pp = 'https://api.mazglobal.co.uk/' + it.path;
        pp = pp.toString();
        it['path'] = pp;
        clist.push(it);
      }
      if (it.id === id) {
        sId = it.supplier_id;
      }
    });

    setSubCategory({ ...sub_category, ['supplier_id']: sId, ['parent']: id });

    setSubCList(clist);

    subCategoryListToggle();
  };

  const showAddSubCategoryModal = () => {
    subCategoryListToggle();
    addSubCategoryToggle();
  };

  const handleSubCatChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;

    setSubCategory({
      ...sub_category,
      [name]: value,
    });
  };

  const handleEditSubCatChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;

    setEditSubCategory({
      ...edit_sub_cat,
      [name]: value,
    });
    setEditNewSubCategory({
      ...edit_new_sub_cat,
      [name]: value,
    });
  };

  const handleSubCatImgChange = name => e => {
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];
      setSubCatImg(imgg);
    }
  };

  const handleEditSubCatImgChange = name => e => {
    if (e.target.files) {
      setNewEditPath(e.target.files[0]);
    }
  };

  const addSubCategory = e => {
    setLoader(true);
    e.preventDefault();
    console.log('sub cat', sub_category);
    console.log('sub img', subCatImg);

    if (sub_category.name == '' || !subCatImg) {
      setLoader(false);
      setMsg(`please add the required fields`);
      msgtoggle();
    } else {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      console.log('sub cat', sub_category);
      axios
        .post(
          `https://api.mazglobal.co.uk/maz-api/categories`,
          sub_category,
          config,

          { headers: { 'content-type': 'application/json' } },
        )
        .then(response => {
          var formData = new FormData();
          formData.append('imageFile', subCatImg);

          axios
            .post(
              `https://api.mazglobal.co.uk/maz-api/categories/uploadImage/${response.data.InsertedId}`,
              formData,
              config,
              {},
            )
            .then(res => {
              setLoader(false);
              addSubCategoryToggle();
              setMsg('Category Added Successfully');
              msgtoggle();
              // Router.reload()
            })
            .catch(error => {
              setLoader(false);
              setMsg(`Something went wrong while posting the image`);
              msgtoggle();
              console.log(error);
            });
        })
        .catch(error => {
          setLoader(false);
          setMsg(`Something went wrong while adding the sub category`);
          msgtoggle();
        });
    }
  };

  const showEditSubCatModal = id => {
    getEditSubCategoriesDataById(id);
    editSubCategoryToggle();
    subCategoryListToggle();
  };

  const getEditSubCategoriesDataById = id => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .get(`https://api.mazglobal.co.uk/maz-api/categories/${id}`, config)
      .then(response => {
        setEditSubCategory(response.data.data);
        let partition = response.data.data.path.split('/');
        let fileName = partition[1];
        setEditPath(fileName);
      })
      .catch(err => console.log(err));
  };

  const editSubCategoryText = e => {
    console.log('eidt cat', edit_new_sub_cat, edit_sub_cat.id);
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    setEditNameLoader(true);

    if (edit_new_sub_cat.name) {
      axios
        .put(
          `https://api.mazglobal.co.uk/maz-api/categories/${edit_sub_cat.id}`,
          edit_new_sub_cat,
          config,
        )
        .then(response => {
          //subCategoryListToggle()
          //editSubCategoryToggle()
          setMsg('Category Updated Successfully');
          msgtoggle();
          setEditNameLoader(false);
          router.reload();
        })
        .catch(error => {
          setEditNameLoader(false);
          setText('Error Updating Name');
          console.log(err)
        });
    } else {
      setEditNameLoader(false);
      setText('Name Cannot be empty');
    }
  };

  const editSubCategoryImg = e => {
    setEditImgLoader(true);
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if (neweditpath) {
      var formData = new FormData();
      formData.append('imageFile', neweditpath);
      axios
        .post(
          `https://api.mazglobal.co.uk/maz-api/categories/uploadImage/${edit_sub_cat.id}`,
          formData,
          config,
          {},
        )
        .then(res => {
          setEditImgLoader(false);
          setMsg('Category Updated Successfully');
          msgtoggle();
          router.reload();
          //editSubCategoryToggle()
          //subCategoryListToggle()
        })
        .catch(err => {
          setEditImgLoader(false);
          setImgText('Error Uploading Image');
          console.log(err);
        });
    } else {
      setEditImgLoader(false);
      setImgText('Cannot Upload Empty Image');
    }
  };

  //set the columns and to be displayed on the interface.. Built in syntax for DataGrid Component..
  const columns = [
    // { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'path',
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
    // { field: 'parent_name', headerName: 'Parent Category', width: 190 },

    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
            {user.role_id == 1 ? (
              <>
                <RemoveRedEye
                  style={{ width: '20%' }}
                  onClick={() => getSubCategoriesById(params.row.id)}
                />
                <Link href="/editcat/[id]" as={`/editcat/${params.row.id}`}>
                  <Edit style={{ color: 'black' }} className="userEdit"></Edit>
                </Link>

                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(params.row.id)}
                />
                <FormControlLabel
                  control={
                    <Switch
                      // checked={statusValues['switch-' + params.row.id]}
                      checked={
                        Sactive[params.row.id].status == 1 ? true : false
                      }
                      name={'status' + params.row.id}
                      onChange={handleSwitchChange(params.row.id)}
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={
                    Sactive[params.row.id].status == 1 ? 'active' : 'Inactive'
                  }
                  // label={statusValues ? 'active' : 'Inactive'}
                />
              </>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  ];

  const sub_columns = [
    // { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'path',
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
    // { field: 'parent_name', headerName: 'Parent Category', width: 190 },

    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
            {user.role_id == 1 ? (
              <>
                <Edit
                  style={{ color: 'black' }}
                  className="userEdit"
                  onClick={() => showEditSubCatModal(params.row.id)}
                ></Edit>

                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleSubDelete(params.row.id)}
                />
                {/* <FormControlLabel
              control={
                <Switch
                
                  checked={Sactive[params.row.id].status==1?true:false}
                  name={'status' + params.row.id}
                  onChange={handleSwitchChange(params.row.id)}
                  color="primary"
                />
              }
              labelPlacement="start"
              label={Sactive[params.row.id].status==1 ? 'active' : 'Inactive'}
       
            /> */}
              </>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
         <div className='same-box'>
      <h1>Categories</h1>

      {/* Link to Add Category Page */}
      {user.role_id == 1 && (
        <Link href="/addCat/addCat">
          <a>
            <button className="AddButton">Add Category</button>
          </a>
        </Link>
      )}
</div>
      {/* Search Bar */}
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
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

      <Modal isOpen={submodal} toggle={subtoggle}>
        <ModalHeader toggle={subtoggle}>Alert</ModalHeader>
        <ModalBody>
          <>Are You Sure You Want to delete this?</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteSubCategory}>
            Yes
          </Button>
          <Button color="primary" onClick={subtoggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={subcategoryListmodal} toggle={subCategoryListToggle}>
        <ModalHeader toggle={subCategoryListToggle}>Sub Categories</ModalHeader>
        <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            onClick={showAddSubCategoryModal}
            style={{ float: 'right', width: '40%', margin: '10px' }}
          >
            Add Sub Category
          </Button>
          <DataGrid
            rows={subCList}
            disableSelectionOnClick
            columns={sub_columns}
            pageSize={6}
            autoHeight={true}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal isOpen={addsubcategorymodal} toggle={addSubCategoryToggle}>
        <ModalHeader toggle={addSubCategoryToggle}>
          Add Sub Category
        </ModalHeader>
        <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <div>
              <label for="exampleInputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Category Label"
                required
                name="name"
                //value={state.name}
                onChange={handleSubCatChange('name')}
              />
            </div>
            <div>
              <label for="exampleInputName">Upload Image</label>
              <input
                type="file"
                className="form-control"
                id="name"
                required
                name="imageFile"
                accept="image/*"
                onChange={handleSubCatImgChange('imageFile')}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addSubCategory}>
            {loader ? (
              <RevolvingDot
                height="80"
                width="80"
                radius="9"
                color="black"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            ) : (
              <span>Add</span>
            )}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editsubcategorymodal} toggle={editSubCategoryToggle}>
        <ModalHeader toggle={editSubCategoryToggle}>
          Edit Sub Category
        </ModalHeader>
        <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <div>
              <label for="exampleInputName">Name</label>
              <div style={{ display: 'flex', padding: '4px' }}>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Category Label"
                  required
                  name="name"
                  value={edit_sub_cat ? edit_sub_cat.name : ''}
                  onChange={handleEditSubCatChange('name')}
                />
                <Button color="primary" onClick={editSubCategoryText}>
                  {editNameLoader ? (
                    <RevolvingDot
                      height="80"
                      width="80"
                      radius="9"
                      color="black"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />
                  ) : (
                    <span>Update</span>
                  )}
                </Button>
              </div>
              <p style={{ color: 'red' }}>{text}</p>
            </div>
            <div>
              <label for="exampleInputName">Upload Image</label>
              <div style={{ display: 'flex', padding: '4px' }}>
                <input
                  type="file"
                  className="form-control"
                  id="name"
                  required
                  name="imageFile"
                  accept="image/*"
                  onChange={handleEditSubCatImgChange('imageFile')}
                />

                <Button color="primary" onClick={editSubCategoryImg}>
                  {editImgLoader ? (
                    <RevolvingDot
                      height="80"
                      width="80"
                      radius="9"
                      color="black"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />
                  ) : (
                    <span>Update</span>
                  )}
                </Button>
              </div>
              <p style={{ color: 'red' }}>{imgtext}</p>
            </div>
            {editpath ? (
              <div className="userUpdateItem">
                <label for="exampleInputName">Current Image</label>
                <p for="exampleInputName">{editpath}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal isOpen={msgmodal} toggle={msgtoggle}>
        <ModalBody>
          <p>{msg}</p>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
});

export default CategoryPage;
