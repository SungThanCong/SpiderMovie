import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useViewport } from "../hooks";
import { getExploreMovieInPage, setMovieDetail } from "../store/action";
import ReactPaginate from "react-paginate";


function ExploreMovie(props)
{
    const [windowWidth] =useViewport();
    const dispatch =useDispatch();

    const [movies, setMovies] = useState(null);
    const [next, setNext] = useState(null);
    const [previous, setPerious] = useState(null);
    const [count, setCount] = useState(null);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
      if (props.movies !== null) {
        setMovies(props.movies);
        setNext(props.next);
        setPerious(props.previous);
        setCount(props.count);
        setCurrent(props.current);

        console.log(props.movies)
      }
    }, [props.movies]);
     
   
    return(

        <SearchPane>
        {
            movies && movies.length >0 ?(

            <div 
                className="searchContent"
                style={{
                    gridTemplateColumns:`repeat(${
                        windowWidth >1200 ? 5 :
                        windowWidth >992 ?  4 :
                        windowWidth >768 ? 3:
                        windowWidth > 600 ? 2 :1
                    },minmax(0, 1fr))`
                }}
            >

            {
                movies.map((movie,index) => {
                   
                    const imageUrl=`http://127.0.0.1:8000${movie.banner}`
                    return(
                    <div 
                        onClick={()=>dispatch(setMovieDetail(movie))}
                        className="movieItem" key={index}>
                    <img src={imageUrl} alt="{movie.title || movie.name}"/>
                    <span>{movie.title || movie.name}</span>
                    </div>)
                    

                })
            }
           
         </div>
          ):(
            <NotFound>
                <h1>We don't have any film to show you</h1>
            </NotFound>
          )
    
        }
        
        </SearchPane>
       
    )
}

const SearchPane= styled.div`
width:100%;
min-height:92vh;
padding-top:80px;
background:var(--color-background);
transition: all 0.3s linear;

 .searchContent{
    padding:40px 60px;
    display:grid;
    gap:8px;

    &:hover .movieItem{
        opacity:0.7
    }

    .movieItem{
        position:relative;
        max-width: 400px;
        width:100%;
        height:200px;
        border-radius:12px;
        margin:20px 0 ;
        overflow : hidden;
        transform: scale(1);
        transition: all 0.3s linear;

        &:hover{
            transform:scale(1.2);
            z-index:10;
            opacity:1;

        }
        img{

            width:100%;
            height:100%;
            object-fit:cover;
        }
        span{
            position:absolute;
            left:0;
            right:0;
            bottom:0;
            text-align:center;
            padding:4px;
            background:rgba(0,0,0,0.5);
            color:var(--color-white);
            font-weight:bold;
        }
    }
 }

`;
const NotFound =styled.div`
padding:5rem 8rem;
color: var(--color-white);

`;

export default ExploreMovie;