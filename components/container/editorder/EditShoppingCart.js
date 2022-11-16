//import { useDispatch } from 'react-redux';
//import { removeProduct } from './../../redux/action';
//import { setCount } from './../../redux/action';
import { Add, Remove, DeleteOutline, TouchAppOutlined, SettingsOverscanOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useState, useEffect } from 'react';


//import { mobile } from "../../../pages/responsive";
const EditShoppingCart = ( props) => {
    const [count,setCount]=useState(0)
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
   
    let x=props.img;
    if(x.includes("//95.111.240.143/ecom-api"))
          {
          
            x="http:"+props.img
            console.log("new img",x)
          }
          
          else
          {
          x="http://95.111.240.143/ecom-api/"+props.img
          console.log("new img",x)
          }
    // props.img.includes("http://95.111.240.143/ecom-api/")
    // if(x.includes("http://95.111.240.143/ecom-api/"))
    // {
    //   x=props.img
      
    // }
    // else{
    //   x="http://95.111.240.143/ecom-api/"+props.img
    // }
    console.log("xxxxxxxxxxxxx",x)
      setTotal(props.total)
      setCount(props.qty)
      
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
  const ProductCount = (val) => {
      
      var list=[...products]
      let line=[...comVal]
      var x=val;
      x=x+1
      console.log('value is',x)
      setCount(x)
      var tt=total
      var ss=sum
      tt=tt+props.price
      ss=ss+1;
      setSum(ss)
      setTotal(tt)
      list[props.index]['quantity']=x
      line[props.index]['quantity']=x
      console.log('comVal',comVal)
      setProducts(list)
      props.parentCall(tt)
      props.parentProduct(list,line)
      props.TotalItem(ss)
  }

  return (
    // https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A
    
    <Product>
       
      <ProductDetail>
        <Image src={path} />
        <Details>
          <ProductName>
            <b>Product:</b> {props.name}
          </ProductName>
          <ProductId>
            <b>ID:</b> {props.id}
          </ProductId>
          <ProductColor color="black" /> 
         { props.variantname.length==0 || props.variantname==undefined?<ProductSize>
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
          {/* <AmountBtnDel> <DeleteOutline onClick={() => removeFromCart()} /></AmountBtnDel> */}

        </ProductAmountContainer>
        <ProductPrice>${props.price*count }</ProductPrice>
      </PriceDetail>


    </Product>

  )
};


export default EditShoppingCart




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
margin-left: 170px;  
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