import React, { useEffect, useState } from "react";
import Intro from "../Intro/Intro";
import Contents from "../Contents/Contains";
import Menus from "../Menus/Menus";
import MoviesDetail from "../MoviesDetail/MoviesDetail";
import { useSelector } from 'react-redux';

function Home(props)
{
    const {MovieDetail}= useSelector(state =>state.infoMovies)
   
    const [isShowMovieDetail ,setIsShowMovieDetail]= useState(false)
    
    useEffect(()=>{
        props.onShowNavbar(true);
        props.onShowFooter(true);
        setIsShowMovieDetail(MovieDetail ? true :false)
    },[MovieDetail])
    return(
    <div>
      <Intro/>
      <Contents/>
      <Menus/>
      <MoviesDetail movie={MovieDetail} showModal={isShowMovieDetail} />
    </div>
    )
}

export default Home;
