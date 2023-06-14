import React from "react";
import { useEffect } from "react";
import CheckoutMovies from "../Checkout/Checkout";

function Checkout(props)
{
    //const {RecommendMovies} = useSelector(state =>state.infoMovies);
    // const {Cart} = useSelector(state =>state.infoMovies);
    // console.log(Cart); 
    useEffect(() => {
        props.onShowNavbar(false);
        props.onShowFooter(false);

      }, []);
return(

    <div>

    <CheckoutMovies/>
    
    </div>
)
}

export default Checkout;