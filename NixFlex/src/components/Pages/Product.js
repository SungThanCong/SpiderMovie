import React from "react";
import { useSelector } from "react-redux";
import MyProduct from "../MyProduct/MyProduct";
import { useEffect } from "react";

function Product(props)
{
    useEffect(() => {
        props.onShowNavbar(true);
        props.onShowFooter(true);

      }, []);
    
     const {MyListMovie} = useSelector(state =>state.user);
      console.log(MyListMovie); 
return(

    <div>
        <MyProduct movie={MyListMovie}/>
    
    </div>
)
}

export default Product;