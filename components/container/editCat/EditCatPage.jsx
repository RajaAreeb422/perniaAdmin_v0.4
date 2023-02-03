import React, { memo } from 'react';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';
import { useState, useEffect } from 'react';
import './edit.scss';
import { toast } from 'react-toastify';
import Link from 'next/link';
import axios from 'axios';
import {  Button,Modal, ModalBody, ModalFooter ,ModalHeader, } from "reactstrap";
//   import { useRouter } from 'next/router'
import { useRouter } from 'next/router';

//import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const EditCatPage = memo(props => {
  const [modal, setModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [img, setImg] = useState(null);
  const [path, setPath] = useState();
  const [catgry, setCatgry] = useState([]);
  const [main, setMain] = useState([]);
  const [hasparent,setHasParent]=useState(false)
  const Name = data.name;
  const Parent = data.parent;

  const Description = data.description;
  const [state, setState] = useState({
    name: Name,
    parent: Parent,
    
  });
  const router = useRouter();
  const { id } = router.query;
  const { name, parent, description } = state;
  //const id=windows.location.href.split('/');
  const toggle = () => setModal(!modal)
  const move=()=>{
    router.push('/category/Category')
  }
  const submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log(state);
    if(img)
    {
      var formData = new FormData();
        formData.append('imageFile', img);
       
        //    // go()
        axios
          .post(
            `https://api.mazglobal.co.uk/maz-api/categories/uploadImage/${id}`,
            formData,
            config,
            {},      
          )
          .then(res => {
            
          }).catch(err=>console.log(err))
          //fs.unlinkSync(imagePath);
          
          // axios
          // .delete(
          //   `https://api.mazglobal.co.uk/images/${path}`,config,   
          // )
          // .then(res => {
          //   console.log("after delte",res.data);
           
          // }).catch(err=>console.log(err))
    }
    if(update==true)
    {
      axios
      .put(`https://api.mazglobal.co.uk/maz-api/categories/${id}`, state,config)
      .then(response => {
        
        toggle()
      })
      .catch(error => {
        toast(' Category Added');
      });
    }
   
  };

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    setUpdate(true)
    const name = e.target.name;
    const value = e.target.value;
   
    setState({
      ...state,
      [name]: e.target.value,
    });
    if(name=='parent')
    {
      catgry.map(it=>{
        if(it.id==e.target.value)
        {
         
        setMain(it)
        }
        else{
          setMain({
            id:null,
            name:'Select Parent Category'
          })
        }
      })
    }

  };
  const handleImgChange = name => e => {
    if (e.target.files && e.target.files[0]) {
      let imgg = e.target.files[0];
      
      setImg(imgg);
    }
  };
  
  useEffect(() => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    if (!id) {
      return;
    }
    const fetchSomethingById = () => {
      axios
        .get(`https://api.mazglobal.co.uk/maz-api/categories/${id}`, config)
        .then(response => {
          console.log(id);
       
          setData(response.data.data);
          setState(response.data.data)
          let partition=response.data.data.path.split('/')
          let fileName=partition[1]
          setPath(fileName)

          if(response.data.data.parent!=null)
          {
            
           
         axios.get(`https://api.mazglobal.co.uk/maz-api/categories/${response.data.data.parent}`, config)
         .then(res=>{
          
           setMain(res.data.data)
           setHasParent(true) 
         }
         ).catch(err=>console.log(err))
        }
        else{
          setMain(response.data.data)
        }
          
        }).catch(error=>console.log(error));
       axios.get(`https://api.mazglobal.co.uk/maz-api/categories`, config)
       .then(res=>{
         let list=[]
         res.data.data.map(it=>{
           if(it.parent==null)
              list.push(it)
         })
         setCatgry(list)
       }).catch(err=>console.log(err))


    };
    fetchSomethingById();
  }, [id]);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Category</h1>
        {/* <Link href="/addCat/addCat">
          <button className="userAddButton">Add</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={submitHandler}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Category Name</label>
                <input
                  type="text"
                  className="catlabel"
                  id="name"
                  placeholder={data.name}
                  required
                  name="name"
                  value={state.name}
                  onChange={handleChange('label')}
                />
              </div>
              {hasparent &&
              <div className="userUpdateItem">
                <label>Category Parent</label>
                <select
                  className="catlabel"
                  id="parent"
                  required
                  name="parent"
                  placeholder={main.name}
                  onChange={handleChange(name)}
                >
                  {console.log('sssss', state.parent)}
                  {main.name ? (
                    <option>{main.name}</option>
                  ):(
                    <option value=''>Select Parent Category</option>
                  )}
                  {catgry.map(p => (
                    <option value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
}

             <div className="userUpdateItem">
              <label
                for="exampleInputName"
              >
                Upload New Image
              </label>
              <input  
                type="file"
                id="name"
                placeholder="Your Category Label"
                name="imageFile"
                accept='image/*'
                onChange={handleImgChange(name)}
              />
            </div>
            {!img?
            <div className="userUpdateItem">
              <label
                for="exampleInputName"
              >
                Current Image</label>
              <p
                for="exampleInputName"
              >
                {path}
              </p>
              
            </div>:<div></div>}
              {/* <div className="descp">
                <label>Category Description</label>
                <input
                  type="text"
                  className="descp-box"
                  id="descp"
                  placeholder={data.description}
                  required
                  name="description"
                  value='dummy data'
               
                />
              </div> */}

              <button type="submit" className="userUpdateButton" >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                    toggle={toggle}>Category Status</ModalHeader>
                <ModalBody>
                  <>
                   Category Updated Successfully
                  </>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={move}>Okay</Button>
                </ModalFooter>
            </Modal>
    </div>
  );
});


export default EditCatPage;
