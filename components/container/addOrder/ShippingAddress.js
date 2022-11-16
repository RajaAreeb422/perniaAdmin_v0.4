
import React from 'react';
import {useState,useEffect} from 'react'
const ShippingAddress=({item})=>{

    const [active,setStatus]=useState({
        status:item.status
      })

    const handleradioChange = (name) => (e) => {
        const val=e.target.checked;
        console.log(active.status)
        var value='';
        if(val==true)
        value='active'
        else
        value='inactive'
       setStatus({
           ...active,
           ['status']:value
       })
       console.log(active.status)
    }

return(
    
        
          <li>
              
          <label>
          <input
              type="radio"
              value={active.status}
              checked={active.status=== 'active'?true:false}
              onChange={handleradioChange()}
          />
          {item.address}
          </label>
       </li>
)
}
export default ShippingAddress