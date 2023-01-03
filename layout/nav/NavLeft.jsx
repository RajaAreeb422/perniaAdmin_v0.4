import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
} from 'reactstrap';

import { useState,useEffect } from 'react';
import { MENUS, SUBMENUS } from '../../constants/menus';
import jwt_decode from "jwt-decode";
function NavLeft(props) {
  const { activeLink } = props;
  const [user,setUser]=useState({
  })
 useEffect(() => {
  var decoded = jwt_decode(localStorage.getItem('token'));
  
  setUser(decoded.result)
},[])

  return (
    <>
      <h4 className="headline">Components</h4>
      <div className="wrapper-list-group">
        <ListGroup flush className="list-group-nav-left" tag="div">
          {MENUS.map((item, k) => {
            const isActive = activeLink === item.name ? true : false;
            return (
              <>
              {user.role_id==1?
              <ListGroupItem
                key={`l${k}`}
                active={isActive}
                tag={item.as}
                href={item.href}
              >
                {item.icon && <i className={item.icon}></i>} {item.label}
              </ListGroupItem>:
              <>
              {item.label.toLowerCase()=='users' || item.label.toLowerCase()=='suppliers'
               || item.label.toLowerCase()=='coupons' ?
              <div>

              </div>:
              <ListGroupItem
                key={`l${k}`}
                active={isActive}
                tag={item.as}
                href={item.href}
              >
                {item.icon && <i className={item.icon}></i>} {item.label}
              </ListGroupItem>
          }
              </>
              }
              </>
            );
          })}
        </ListGroup>
      </div>
      </>
      
    
  );
}

export default NavLeft;
