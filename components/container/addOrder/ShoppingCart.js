//import { useDispatch } from 'react-redux';
//import { removeProduct } from './../../redux/action';
//import { setCount } from './../../redux/action';
import { Add, Remove, DeleteOutline, TouchAppOutlined, SettingsOverscanOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useState, useEffect } from 'react';


//import { mobile } from "../../../pages/responsive";
const ShoppingCart = ( props) => {
    const [count,setCount]=useState(1)
    const[total,setTotal]=useState(0)
    const[sum,setSum]=useState(0)
    const[path,setPath]=useState()
    const[products,setProducts]=useState([])
    const[comVal,setComVal]=useState([])
 // const dispatch = useDispatch();

  // const removeFromCart = () => {
  //   // dispatch(removeProduct(
  //   //   {
  //   //     id: id,

  //   //   }
  //   ))
  // }

  useEffect(()=>{
      let x="http://95.111.240.143/ecom-api/"+props.img
      setTotal(props.total)
      setProducts(props.product)
      setComVal(props.comVal)
      setSum(props.sum)
      setPath(x)
  })

  const setProductCount = (val) => {
    if (val <= 1) {
      return false;
    }
    else
    {
       // console.log(x)
       var list=[...products]
        var x=count;
        x=x-1
    setCount(x)
    var ss=sum
    var tt=total
    tt=tt-props.price
    ss=ss-1;
    setSum(ss)
    setTotal(tt)
    list[props.index]['quantity']=x
    comVal[props.index]['quantity']=x
    console.log('listt',list)
    setProducts(list)
    props.parentCall(tt)
    props.parentProduct(list,comVal)
    props.TotalItem(ss)

    }
   

    // dispatch(setCount(
    //   {
    //     id: id,

    //     count: count,
    //   }
    // ))
  }
  const removeProduct = (index) => {
    let arr=[]
    let arr2=[]
    let tt=total
    let ss=sum
    ss=ss-products[index].quantity
    tt=tt-(products[index].quantity*products[index].price)
    console.log('sss',ss)
    console.log('ttt',tt)
    setTotal(tt)
    setSum(ss)
    products.map((item,i)=>{
      if(i==index)
      {
       
      }
      else{
        arr.push(item)
        arr2.push(comVal[i])
      }
      console.log(arr)
      setProducts(arr)
      setComVal(arr2)
      
      props.parentProduct(arr,arr2)
    })
    props.TotalItem(ss)
      props.parentCall(tt)
  }
  const ProductCount = (val) => {
      console.log('helooo')
      var list=[...products]
      var x=val;
      x=x+1
      setCount(x)
      var tt=total
      var ss=sum
      tt=tt+props.price
      ss=ss+1;
      setSum(ss)
      setTotal(tt)
      list[props.index]['quantity']=x
      comVal[props.index]['quantity']=x
      console.log('listtt',list)
      console.log('comVal',comVal)
      setProducts(list)
      props.parentCall(tt)
      props.parentProduct(list,comVal)
      props.TotalItem(ss)
  }

  return (
     
    
    <Product>
       
      <ProductDetail>
        <Image src={path} />
        <Details>
          <ProductName>
            <b>Product:</b> {props.name}
          </ProductName>
          {/* <ProductId>
            <b>ID:</b> {props.id}
          </ProductId>
          <ProductColor color="black" /> */}
          {props.variantname==''?<ProductSize>
          <p>Product has no Variant</p>
        </ProductSize>
          :
          props.variantname.map(item=>(
            <ProductSize>
            <b>{item.name}:</b> {item.value}
          </ProductSize>
          ))
}
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <AmountBtn> <Remove onClick={()=>setProductCount(count)} /></AmountBtn>
          <Amount><strong>{count}</strong></Amount>
          <AmountBtn> <Add onClick={()=>ProductCount(count)} /></AmountBtn>
          <AmountBtnDel> <DeleteOutline onClick={() => removeProduct(props.index)} /></AmountBtnDel>

        </ProductAmountContainer>
        <ProductPrice>${props.price*count }</ProductPrice>
      </PriceDetail>


    </Product>

  )
};


export default ShoppingCart




const Product = styled.div`
  display: flex;
  justify-content: space-between;
/
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
width:130px`;

const PriceDetail = styled.div`
margin-left: 130px;  
flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;
// ${mobile({ margin: "5px 15px" })}
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
 
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

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
const AmountBtnDel = styled.span`
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