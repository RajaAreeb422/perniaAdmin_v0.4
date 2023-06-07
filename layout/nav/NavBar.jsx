import React from 'react';
import { useState,useEffect } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { Avatar, Badge } from '@material-ui/core';
import jwt_decode from "jwt-decode";
import axios from 'axios'
const NavBar = () => {
   const [user,setUser]=useState({
    
   })
   const [brand,setBrand]=useState({
  })

  function deletetoken() {
    localStorage.removeItem('token');

    localStorage.clear();
  }

  useEffect(() => {
   var decoded = jwt_decode(localStorage.getItem('token'));
   
   setUser(decoded.result)
   if(decoded.result.role_id==1)
   {
    
   }
   else{
   axios
   .get(
     `https://api.mazglobal.co.uk/maz-api/suppliers/${decoded.result.supplier_id}`
   )
   .then(res => {
   
     setBrand(res.data.data)
   })
   .catch(err => console.log(err));
  }
},[])

  return (
    <div>
      <Navbar color="dark" dark expand="sm" fixed="top">
      {user.role_id==1 ?
        <NavbarBrand href="/">
          <img src="../../public/images/brand/pernia-logo.png" style={{height:'35px',width:"70px"}} />
          Pernia
        </NavbarBrand>
        :
        <NavbarBrand href="/">
        <img src="https://i.ibb.co/KbgwHtX/Pngtree-accessories-beautiful-scarf-6258565.png" style={{height:'35px',width:"70px"}} />
        {brand.name}
      </NavbarBrand>
      }
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavbarToggler onClick={toggle} color="dark" />
         isOpen={isOpen}
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-sm-block"
                onClick={toggleLeft}
              >
                <i
                  className={`fas fa-caret-square-${
                    isToggled ? 'left' : 'right'
                  }`}
                ></i>
              </NavLink> */}
            {/* </NavItem> */}
            {/* <NavItem>
              <NavLink href="/page/typography">Typography</NavLink>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pages
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="div">
                  <NavLink href="/card/posts" className="text-primary">
                    Cards
                  </NavLink>
                </DropdownItem>
                <DropdownItem tag="div">
                  <NavLink href="/table/tables" className="text-primary">
                    Tables
                  </NavLink>
                </DropdownItem>
                <DropdownItem tag="div">
                  <NavLink href="/form/buttons" className="text-primary">
                    Buttons
                  </NavLink>
                </DropdownItem>
                {/* <DropdownItem divider /> */}
                {/* <DropdownItem tag="div">
                  <NavLink href="/form/forms" className="text-primary">
                    Forms
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */} 
          </Nav>
          <UncontrolledDropdown inNavbar>
            <DropdownToggle caret nav className="text-secondary">
              <NavbarText className="align-self-center text-left font-weight-bold">
                <Avatar
                  src="/images/profile2.jpg"
                  alt={user.first_name}
                  className="border rounded-circle img-42 img-fluid mr-1"
                />
                {/* Account */}
              </NavbarText>
            </DropdownToggle>
            <DropdownMenu style={{marginLeft:"-30px"}}>
              <DropdownItem tag="div">
                <NavLink href="/page/profile" className="text-dark" >
                  <i className="fas fa-user"></i> Profile
                </NavLink>
              </DropdownItem>
              
              <DropdownItem tag="div">
                <NavLink
                  href="/page/login"
                  onClick={deletetoken}
                  className="text-dark"
                >
                  <i className="fas fa-home"></i> Logout
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
