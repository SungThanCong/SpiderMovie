import React from "react";
import { useDispatch } from "react-redux";
//import { useSelector } from "react-redux";
import styled from "styled-components";
import { DeleteMovieCart } from "../store/action";
import Table from 'react-bootstrap/Table';
import {MdDeleteForever} from "react-icons/md"
import {CgTrashEmpty} from "react-icons/cg"
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
// import{CiDiscount1} from "react-icons/ci"



function CollectionMovie(props)
{

    const navigate= useNavigate();
    const dispatch=useDispatch();
    const {movie}=props;  
    var key=0;
    const [sale, setSale] = useState(0)
    useEffect(() => {
        const totalPrice = movie.reduce((acc, cur) => acc + cur.price, 0);
        setSale(totalPrice)
    },[movie])

    const handlebtncollection =()=>{
        dispatch(DeleteMovieCart(key));
        console.log( 'Delete' + key );
    }
    // chưa làm xong phần dispacth total 
    const handlesale =()=>{
        
    }
    const handlecheckout =()=>{
        navigate('/checkout');
    }
    return(
        <CollectionDetail>
         {/* <div className="collectionContent">
         {
             movie && movie.length > 0 ?(
                movie.map((movie,index)=>
            {

               
                const imageUrl=`https://image.tmdb.org/t/p/w500/${
                         movie.backdrop_path }`
                
                            return(
                                <div>
                <div className="collectionItem" key={index}>
            <img src={imageUrl}alt=""></img>
            <h3>{movie &&(movie.title||movie.name)}</h3>
            <h4>1.20$</h4>
            <div className="btnCollection" onClick={()=>handlebtncollection(key=index)}>Delete </div>
           </div>
           </div>
           )
             }))
            :(
                <div className="titleCollection">
                    <h1>Your cart not movie</h1>
                </div>
              )
              
}         <div className="totalPrice">Total Price: {(1.2*movie.length).toFixed(2)}$</div>
          <div className="btnBank">Thanh Toán</div>
        </div>  */}

<Table striped bordered hover variant="dark" className="Table">
            <div className="TitleProduct">
                        <h1 >My Cart</h1>
                        <p>
                Inspirational designs,
            illustrations, and graphic elements from the world’s best designers.<br></br>
            Want more inspiration? Browse our search results...
            </p>
                    </div>
{
    movie && movie.length > 0 ?(
    <div className="titleCollection">
        <div className="movieCollection">Movie</div>
        <div className="movieCollectionName">Movie Name</div>
        <div className="movieCollectionPrice">Movie Price</div>
        <div className="movieCollectionDelete">Operation</div>
    </div>) :(<div>
        
    </div>)
}
 
 {
 
    movie && movie.length > 0 ?(
        movie.map((movie,index)=>
    {
        const imageUrl=`http://127.0.0.1:8000${movie.banner}`
    return(
        <div>
        <div className="rowMovieCollection"  key={index}>
          <div className="imgCollection" style={{background:"none", color: "black"}}><img src={imageUrl}  alt=""></img></div>
          <div className="nameCollection" style={{background:"none", color: "black"}}><h4>{movie &&(movie.title||movie.name)}</h4></div>
          <div className="priceCollection" style={{background:"none", color: "black"}}>{movie.price}$</div>
          <div className="btnDelete" style={{background:"none", color: "black"}} onClick={()=>handlebtncollection(key=index)}> <MdDeleteForever size={40}/>   </div>

        </div>
        


          
        </div>
    )

        

    })):(
        <div className="titleCartCollection">
            <h1>Your cart not movie  </h1>
            <CgTrashEmpty className="titleCartCollectionIcon"/>
        </div>
      )
     
    
    }
    {
        movie && movie.length > 0 ?(
    <div className="totalPrice">
            {/* <div className="promotionPrice">
                <div className="voucherPrice"><CiDiscount1 className="iconVoucher"/> Nixflex Voucher</div>
                <div className="middle"></div>
                <div className="codeVoucherPrice">Nhập mã voucher</div>
            </div> */}
            <div className="MoviePrice">
              <div className="titleMoviePrice" style={{background:"none", color: "black"}}>Oder total :</div>
              <div className="salePrice" style={{background:"none", color: "black"}}>{sale.toFixed(2)}$</div>
              <div className="btnPrice" onClick={()=>{handlecheckout();handlesale(sale)}}> Proceed to checkout</div>
            </div>
    </div>):(<div></div>)
}
</Table>
</CollectionDetail>)
    
    
        
}

export default CollectionMovie


const CollectionDetail=styled.div`

display:flex;
width:100%;
padding-top:100px;
min-height:92vh;
background:var(--color-background);
transition: all 0.3s linear;
justify-content: center;
        

.Table{
   
    width:90%;
    color:white;
    text-align:center;
    .titleCartCollection{
        display:flex;
        align-items:center;
        justify-content:center;
    .titleCartCollectionIcon{
            font-size:32px;
            margin-left:10px;
        }
    }
    .totalPrice{
    position: sticky;
    bottom:0;
     align-items:center;
     background-color:var(--color-white);
     display: grid;
     grid-template-columns:50% 50%;
     grid-template-rows: 44px  50px ;
     width:100%;
     color:black;  
     .promotionPrice{
        display:flex;
        grid-area: 1 / 2 / 1 / 2;
        align-items:center;
        .middle{
            flex:1;
        }
        .voucherPrice{
            display:flex;
            align-items:center;
            color: #888888;
            font-size: 16px;
            font-weight:500;
            line-height: 16.8px;
            .iconVoucher{
                font-size:20px ;
                margin-right:4px;
                color:#ee4d2d;
            }
        }
        .codeVoucherPrice{
            color: #888888;
            font-size: 16px;
            font-weight:500;
            margin:18px;
            cursor:pointer;
        }
     } 
     .MoviePrice{
        display:flex;
        grid-area: 2 / 2/ 2/ 2;
        align-items:center;

        .titleMoviePrice{
            
            margin-left:12px;
        }
        .salePrice{
            margin: 0px 2px 0px 2px;
            color:#E3111F;
            font-size:22px;
            flex:1;
            @media screen and (max-width:600px)
                {
                    
                    font-size:16px;
                   

                    
                }
        }
        .btnPrice{
            align-items:center;
            display:flex;
            background-color:#E3111F;
            border-radius:2px;
            box-shadow:#000000 0px 1px 1px 0px;
            color:#ffffff;
            
            padding:10px 30px;
         
            text-align:center;
            justify-content:center;
            margin-right:10px;
            margin-left:10px;
            font-size:16px;
            cursor:pointer;
            .iconBtnPrice{
                font-size:16px;
                margin-right:2px;
            }
            &:hover{
                opacity:0.7;
            }
            @media screen and (max-width:800px)
                {
                    flex-wrap: wrap;
                    font-size:14px;
                    padding:6px;
                }
            @media screen and (max-width:600px)
                {
                    flex-wrap: wrap;
                    font-size:12px;
                    padding:2px;

                    
                }
        }
     }

    }
    .TitleProduct{
        width:100%;
        h1{
           
            color:var(--color-white);
            
            font-size:32px;
            font-weight:700;
            line-height:56px;
            margin:0px 0px 10px;
            text-align:center;
        }
        p{
            color:var(--color-white); 
            margin:0px 0px 40px;
            text-align:center;
        }
    }
    .titleCollection{
        
        display:flex;
        flex-directionL:column;
        justify-content: center;
        align-items:center;
        background-color:var(--color-white);
        border-radius:2px;
        box-shadow:#000000 0px 1px 1px 0px;
        color:#000000;
        font-size:16px;
        line-height:16.8px;
        margin:0px 0px 15px 0px;
        width:100%;
        padding:10px 0px 10px 0px;
        .movieCollection{
        width:100px;
        
        margin:0px 15px 0px 10px;
        }
        .movieCollectionName
        {
            width:40%;
            color:ffE3111F;
            font-size:14px;
            line-height: 16.8px;
        }
        .movieCollectionPrice
        {
            width:25%;
            color:ffE3111F;
            line-height: 16.8px;
            font-size:14px;
            line-height: 16.8px;
        }
        .movieCollectionDelete
        {
            color:ffE3111F;
            font-size:14px;
            line-height: 16.8px;
        }

    }
    .rowMovieCollection{
        display:flex;
        flex-directionL:column;
        justify-content: center;
        align-items:center;
        background-color:var(--color-white);
        border-radius:2px;
        box-shadow:#000000 0px 1px 1px 0px;
        color:#000000;
        font-size:16px;
        line-height:16.8px;
        margin:0px 0px 15px 0px;
        width:100%;
        padding:10px 0px 10px 0px;

     .imgCollection{
        position:relative;
        margin:0px 15px 0px 10px;
        img{
        height:100px;
        width:100px;     
        }
        
      }

     .nameCollection{
        width:40%;
     } 
     .priceCollection{
        width:25%
        
     } 
     .btnDelete{
        display:flex;
        cursor:pointer;
        
        font-size:18px;
        justify-content:center;
        align-items:center;
        
        &:hover{
           
                color:#ee4d2d;
            opacity:0.7;
        }
     } 
     }
}
`


