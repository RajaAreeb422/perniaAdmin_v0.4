export  const setLocalStorage=(val)=>{

    return{
        type:'TOKEN',
        payload:val?val:0
    }
    
    }
    
      