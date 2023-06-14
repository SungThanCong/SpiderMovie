
import React from "react";
import { useSelector } from "react-redux";
import CollectionMovie from "../CollectionMovie/CollectionMovie";
import { useEffect } from "react";

function Collection(props)
{
    useEffect(() => {
      props.onShowNavbar(true);
      props.onShowFooter(true);

    }, []);
    const {Cart} = useSelector(state =>state.infoMovies);
    // console.log(Cart); 
      return(
    <div>
   <CollectionMovie movie={Cart}/>
    </div>
)
}
export default Collection;