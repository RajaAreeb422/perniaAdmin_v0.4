import axios from 'axios';
import React, { memo } from 'react';
import { Publish } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Edit } from '@material-ui/icons';
import styled from 'styled-components';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './editorder.scss';
import { useRouter } from 'next/router';
import EditShoppingCart from './EditShoppingCart';
import { toast, ToastContainer } from 'react-nextjs-toast';

const EditOrderPage = memo(props => {
  const [text, setText] = useState('');
  const [nproduct, setNewProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [wholetotal, setWholeTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [sum, setSum] = useState(0);
  const [pay, setPay] = useState('');
  const [dlv, setDelievry] = useState('');
  const [comVal, setComVal] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    payment_method:'',
    delivery_method:'',
    payment_status:'',
    fulfillment_status:''
  });
  const router = useRouter();
  const { id } = router.query;
 
  
  const [o_data, setO_Data] = useState({
        
  userId:null,
  products:[],
  orderInfo:{},
  userInfo:{},
  billing_info:{id:null},
  shipping_info:{id:null}
  
});
  const [user_Id, setUserId] = useState(null);
  const [state, setOrder] = useState({
    o_id: null,
    user_id: null,
    total_amount: null,
    shipping_id: null,
    billing_id: null,
    date: '',
    payment_status: '',
    fulfillment_status: '',
    total_items: null,
    delivery_method: '',
    payment_method: '',
    products: [],
  });
  const {
    o_id,
    user_id,
    total_amount,
    shipping_id,
    billing_id,
    date,
    payment_status,
    fulfillment_status,
    total_items,
    delivery_method,
    payment_method,
    products,
    product_variant_name
  } = state;
  //const [data, setState] = useState([]);
  const [prodata, setProData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [shipId, setShipId] = useState(null);
  const [billId, setBillId] = useState(null);
  const [movemodal, setMoveModal] = React.useState(false);
  const movetoggle = () => setMoveModal(!movemodal);

  useEffect(() => {
 
    let mounted = true;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    //https://api.mazglobal.co.uk/maz-api
    axios.get(`https://api.mazglobal.co.uk/maz-api/orders/${id}`, config)
      .then(response => {
        setNewProduct(response.data.data.products)
        setPay(response.data.data.payment_method)
        setDelievry(response.data.data.delivery_method)
        setBillId(response.data.data.billing_id)
        setShipId(response.data.data.shipping_id)
        console.log("response",response.data.data)
        setOrderDetails({
          payment_method:response.data.data.payment_method,
          delivery_method:response.data.data.delivery_method,
          payment_status:response.data.data.payment_status,
          fulfillment_status:response.data.data.fulfillment_status
        })
        if(response.data.data.delivery_method=='standard')
        {
          setTotal(response.data.data.total_amount-8);
          setPrice(8)
        }
        else{
          
          setTotal(response.data.data.total_amount-10);
          setPrice(10)
        } 
        setUserId(response.data.data.user_id)
        
        axios.get(`https://api.mazglobal.co.uk/maz-api/users/${response.data.data.user_id}`, config)
      .then(res=>{

        setText(res.data.data.first_name)})
      .catch(error=>console.log(error))
      axios.get(`https://api.mazglobal.co.uk/maz-api/products`, config)
      .then(res=>setProData(res.data.data))
      .catch(error=>console.log(error))
        setOrder(response.data.data);
        setWholeTotal(response.data.data.total_amount)
        
        setSum(response.data.data.total_items);
        
        SplitProduct(response.data.data.products)
      }).catch(err => console.log(err));        

    return () => (mounted = false);
  }, []);

  const SplitProduct=(products)=>{
    
    const list = [...nproduct];
      products.map(com => {
    
     var variantsArr = [];
      if(com.product_variant_id)
       {
   
    variantsArr=com.variants;
     
      list.push({...com,
        product_id:com.product_id,
        product_variant_id:com.product_variant_id
       } );
      list[list.length - 1]['variantname'] = variantsArr;
    //   if (arr.length == 3) {
    //     var st1 = arr[0];
    //     var st2 = arr[1];
    //     var st3 = arr[2];
    //     list[list.length - 1]['variantname'] = variantsArr;
    //   }
    //   if (arr.length == 2) {
    //     var st1 = arr[0];
    //     var st2 = arr[1];
    //     list[list.length - 1]['variantname'] = variantsArr;
    //   }
    //   if (arr.length == 1) {
    //     var st1 = arr[0];
    //     list[list.length - 1]['variantname'] = variantsArr;
    //   }
  
    }
    else{
      list.push({...com,
        product_id:com.product_id,
        product_variant_id:com.product_variant_id
       } );
       list[list.length-1]['variantname']=variantsArr
       
    }
  })

  setComVal(list);
}

const handleChild = childData => {
  setTotal(childData);
  setWholeTotal(childData+price)

};
const handletotal = data => {
  setSum(data);
};
const handleProduct = (child,com) => {
  state.products = child;

  setComVal(com)
};


  const handlePMethodChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    setPay(value)
    setOrder({ ...state, ['payment_method']: value });
    setOrderDetails({ ...orderDetails, ['payment_method']: value });
  };

  const handlePaymentStatusChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderDetails({ ...orderDetails, ['payment_status']: value });
  };
  const handleDMethodChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;
    setDelievry(value)
    if(value=='standard')
    {
      setWholeTotal(total+8)
      setPrice(8)
    }
    else{
      setWholeTotal(total+10)
      setPrice(10)
    }
 
    setOrder({ ...state, ['delivery_method']: value });
    setOrderDetails({ ...orderDetails, ['delivery_method']: value });
  };



  const submitOrder = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    setLoader(true);
    let products_o=[]
    let totalItem=0;
    
    o_data.billing_info={
      id:billId
    }
    o_data.shipping_info={
      id:shipId
    }
    o_data.userInfo = {
      email: state.ship_details.email,
      first_name: state.ship_details.first_name,
      last_name: state.ship_details.last_name,
      password: 'agag'
    }
    products_o=state.products
      products_o.map(it=>{
      products_o.push({
      product_variant_id:it.product_variant_id,
      product_id:it.product_id,
      product_variant_name:it.product_variant_name,
      product_name:it.product_name,
      price:it.price,
      supplier_id:it.supplier_id,
      path:it.path,
      quantity:it.quantity
    })
    totalItem=totalItem+it.count
  
  })
  setSum(totalItem)
  o_data.products=products_o
  o_data.orderInfo = {
    total_amount: wholetotal,
    total_items: sum,
    payment_method: pay,
    delivery_method: dlv,
    payment_status:orderDetails.payment_status,
    fulfillment_status:orderDetails.fulfillment_status
  };
    o_data.userId=user_Id
    console.log(o_data)
    let orderStatusDetails={
      payment_method: pay,
      delivery_method: dlv,
      payment_status:orderDetails.payment_status,
    }
    //https://api.mazglobal.co.uk/maz-api/orders
    axios.put(`https://api.mazglobal.co.uk/maz-api/orders/updateOrderStatus/${id}`,
        orderStatusDetails,
      )
      .then(res => {console.log(res.data)
        setLoader(false);
        movetoggle();
        toast.notify("order updated Successfully",{type:"success"})
      }).catch(err => {
        console.log(err)
        toast.notify(`Sorry! There is some problem..`, {
          type: 'error',
        });
      });
    
  };
  const move=()=>{
    router.push('/order/order')
  }

  return (
    <div className="product">
      {/* <div className="productTitleContainer"> */}
      {loader && <div className="editLoader" />}
      <div
        className="productTitleContainer"
        style={
          loader === true ? { backgroundColor: 'black', opacity: '0.2' } : {}
        }
      >
        <h1 className="productTitle">Edit Order</h1>
        {/* <Link href="/newproduct">
              <button className="productAddButton">Create</button>
            </Link> */}
      </div>
      <div className="productTop">
        <div className="productTopLeft">
        <ToastContainer align={'right'} position={'middle'} />
        
          <div className='imgpart'>
          <img 
              src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
              alt=""
              className="userShowImg"
            />
           
              <span className='userText'>{text}</span>
          </div>
           
          <label style={{ marginTop: '10px' }}>Payment Method</label>
          <select
            className="form-control"
            id="payment_method"
            required
            name="payment_method"
            style={{ marginBottom: '10px' }}
            value={orderDetails.payment_method}
            onChange={handlePMethodChange('payment_method')}
          >
            <option value="CD">Credit Card</option>
            {/* <option value="bank transfer">Bank Transfer</option> */}
            <option value="COD">Cash On Delivery</option>
          </select>

          <label>Delivery Method</label>
          <select
            className="form-control"
            id="delivery_method"
            required
            name="delivery_method"
            style={{ marginBottom: '10px' }}
            value={orderDetails.delivery_method}
            onChange={handleDMethodChange('delivery_method')}
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>

          <label className="lbel" for="exampleFormControlSelect1">
            Payment Status
          </label>
          <select
            className="form-control"
            id="payment_status"
            required
            name="payment_status"
            value={orderDetails.payment_status}
            onChange={handlePaymentStatusChange('payment_status')}

          >
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
          <SummaryItemButton onClick={() => submitOrder()}>
                    Update Order
          </SummaryItemButton>
        </div>
        <div className="productTopRight">
        <Summary>
                <SummaryNav>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                </SummaryNav>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>{total} PKR</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Total Items</SummaryItemText>
                  <SummaryItemPrice>{sum}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>{price} PKR</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>0.0 PKR</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    <strong>{wholetotal} PKR</strong>
                  </SummaryItemPrice>
                </SummaryItem>
               
                 
                
              </Summary>
        </div>
      </div>


     <div className="productBottom">
        <div className="orderprocess">
          
          <div className="orderSummary">
                        
          {
              comVal.map((item, i) => (
                
                // item.variantname==undefined?'':
                <EditShoppingCart
                  id={item.product_id}
                  index={i}
                  qty={parseInt(item.quantity)}
                  product_variant_name={item.product_variant_name}
                  variantname={item.variantname}
                  name={nproduct[i].product_name}
                  price={parseInt(item.price)}
                  img={item.path}
                  product={nproduct}
                  total={total}
                  comVal={comVal}
                  sum={sum}
                  parentCall={handleChild}
                  parentProduct={handleProduct}
                  TotalItem={handletotal}
                />
              ))
              }
            
              
            
          </div>
        </div>
      </div> 
      <Modal isOpen={movemodal} toggle={movetoggle}>
          <ModalHeader toggle={movetoggle}>Order Status</ModalHeader>
          <ModalBody>
            <>Order Updated Successfully</>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={move}>
              Okay
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  );
});
export default EditOrderPage;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;

  color: white;
  
`;
const SummaryNav = styled.div`
  font-weight: 200;
  background-color: black;
  color: white;
  text-align:center;
  border-radius: 10px;
  
`;
const SummaryButton = styled.div`
  font-weight: 200;
  type: button;
  background-color: black;
  color: white;
  text-align:center;
  border-radius: 10px;
  margin-top: -19px;
  width: auto;
  margin-left: -18px;
  height: 30px;
  cursor: pointer;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === 'total' && '500'};
  font-size: ${props => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;
const SummaryItemButton = styled.button`
 font-weight: 200;
  type: button;
  background-color: black;
  color: white;
  text-align:center;
  border-radius: 10px;
  margin-top: 20px;
  width: auto;
  margin-left: 5px;
  height: 30px;
  cursor: pointer;
`;

const SummaryItemPrice = styled.span``;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const AmountBtn = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
`;

// const Button = styled.button`
// width: 100%;
// padding: 10px;
// background-color: black;
// color: white;
// font-weight: 600;
// `;
