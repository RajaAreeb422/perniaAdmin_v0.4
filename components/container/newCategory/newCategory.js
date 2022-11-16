import "./newUser.css";
import axios from 'axios';
//import { response } from "express";
import { useState,useEffect } from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function NewCategory() {


  const [state, setState] = useState({
    name: "",
    parent: "",
    description: "",
   
});
const[parnt_cat,setParent]=useState([]);

const {
name,
parent,
description,
}=state;

useEffect(() => {
    let mounted = true;
     console.log("in useeffec")
    axios.get('http://localhost:8080/categories')
    .then(response =>{
      if(mounted) {
        setParent(response.data)
      }
      console.log(response.data)
      
    }
  
      );
      return () => mounted = false;
  }, []);

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(state);
    axios.post(`http://localhost:8080/categories`,state,
  
  {headers: { 'content-type': 'application/json' }}
  )
  .then(response=>{toast('Added') }
  )
  .catch(error=>{
    toast(' Category Added')
  })
}

const handleChange = (name) => (e) => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    setState({
        ...state,
        [name]: value
    })
}








  const PostCategory=()=>(

    <div className="main">
    <div className="newUser">
      <h1 className="newUserTitle">New Category</h1>
      <form className="newUserForm" onSubmit={submitHandler}>
        <div className="newUserItem">
        <label for="exampleInputName">Name</label>
        <input
            type="text"
            className="form-control"
            id="name"
            placeholder="your Category Label"
            required
            name="name"
            value={state.name}
            onChange={handleChange('label')}
        />
        </div>
        <div className="newUserItem">
        <label for="exampleFormControlSelect1">Parent</label>
        <select
            className="newUserSelect"
            id="parent"
            required
            name="parent"
            value={state.parent}
            onChange={handleChange(name)}
        >
            {console.log(parnt_cat)}
            {parnt_cat.map(p=>(
            <option value={p._id}>{p.name}</option>
    ))}
        </select>
        </div>
        <div className="newUserItem">
        <label for="exampleInputName">Description</label>
        <input
            type="text"
            className="descp-box"
            id="descp"
            placeholder="Enter your text"
            required
            name="description"
            value={state.description}
            onChange={handleChange(name)}
        />
        </div>
        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
    </div>
  );
 
  return (
    <>
     
        
        {PostCategory()}
       

      </>
       
)




}
