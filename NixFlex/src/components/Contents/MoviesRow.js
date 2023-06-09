import styled from "styled-components";
import {FiChevronLeft,FiChevronRight} from'react-icons/fi';
import { useEffect, useRef, useState } from "react";
import {SmoothHorizontalScrolling} from'../../utils'
import { useViewport } from "../hooks";
import { useDispatch } from "react-redux";
import {setMovieDetail} from'../store/action';
// const movies=[
// "https://m.media-amazon.com/images/I/61Fm+N+NncL._AC_SL1008_.jpg",
//   "https://i.pinimg.com/originals/a9/c7/d3/a9c7d36b3aaee651d8f120257587e27b.jpg",
//   "https://i.pinimg.com/originals/d9/b9/07/d9b9070c855d7c226c9a26a675c93142.jpg",
//   "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1576732289",
//   "http://cdn.shopify.com/s/files/1/0290/5663/0868/products/australianbackpacker999x666_1200x.jpg?v=1618847022",
//   "https://3.bp.blogspot.com/-XU3gtu_wI6g/WpxBFPk1p0I/AAAAAAAACEw/0JoIwjhNmjs-JrTYJddrGaNL2o32M-WEgCLcBGAs/s1600/Screen%2BShot%2B2018-03-04%2Bat%2B18.53.17.png",
//   "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/87108/88101/edge_of_tomorrow_regular_buy_original_movie_posters_at_starstills__48110.1400669257.jpg?c=2",
//   "https://i.pinimg.com/originals/0f/b4/1f/0fb41ff936741bb71415352180b86611.jpg",
//   "https://cdn.shopify.com/s/files/1/0747/3829/products/mL1755_1024x1024.jpg?v=1571445470",
//   "https://i.pinimg.com/originals/6d/6a/6c/6d6a6c1cba5068c1626adedf00db5865.jpg",
//   "https://www.discountdisplays.co.uk/our-blog/wp-content/uploads/tomb-raider-long-neck-691x1024.jpg",
// ];

function MoviesRow(props)

{

const {movies ,title, isNetflix,idSection}=props;
const sliderRef=useRef();
const movieRef=useRef();
const [dragDown, setDragDown]=useState(0);
const [dragMove, setDragMove]=useState(0);
const [isDrag, setIsDrag]=useState(false);
const [windowWidth] = useViewport();

const dispatch= useDispatch()
const handleSetMovie =(movie)=>
{

    
    dispatch(setMovieDetail(movie));
   
    
}

const handleScrollRight=()=>
{
    const maxScrollLeft=sliderRef.current.scrollWidth-sliderRef.current.clientWidth

if(sliderRef.current.scrollLeft<maxScrollLeft)

{
    SmoothHorizontalScrolling(sliderRef.current ,250 ,movieRef.current.clientWidth*2,sliderRef.current.scrollLeft)
}

}
const handleScrollLeft=()=>
{
   
if(sliderRef.current.scrollLeft>0)

{
    SmoothHorizontalScrolling(sliderRef.current ,250 ,-movieRef.current.clientWidth*2,sliderRef.current.scrollLeft)
}

}
useEffect(()=>{
if(isDrag)
{
    if(dragMove<dragDown) handleScrollRight();
    if(dragMove>dragDown) handleScrollLeft();
}
},[dragDown,dragMove,isDrag])

  const onDragStart= e=>{
   setIsDrag(true);
   setDragDown(e.screenX);
  
  }
  const onDragEnd= e=>{
    setIsDrag(false);
}
const onDragEnter= e=>{
    setDragMove(e.screenX);
    
    
}
    return(
        <MoviesRowContainer draggable='false' id={idSection}>
            <h1 className="heading">{title}</h1>
            <MoviesSlider ref={sliderRef} 
            draggable='true' 
            onDragStart={onDragStart}
             onDragEnd={onDragEnd} 
             onDragEnter={onDragEnter} 
             style={
                movies && movies.length> 0 
                ? {
                    gridTemplateColumns:`repeat(${movies.length},
                        ${windowWidth > 1200 ? '360px'  
                          
                           :windowWidth > 992 ?'300px'

                           :windowWidth > 768 ?'250px' : '200px'
                         } 
                        
                        )`
                }
                :{}
             }
             
             >
                {
            
                   movies && movies.length>0 && movies.map((movie,index) => {
                
                    if (movie.banner && movie.banner !== null) {
                        let imageUrl = isNetflix
                          ? `http://127.0.0.1:8000${movie.banner}`
                          : `http://127.0.0.1:8000${movie.banner}`;
                          return(
                               <div key={index} className="movieItem" ref={movieRef} 
                               draggable='false'style={isNetflix ? {} : {height: '200px'}}
                                onClick={()=>handleSetMovie(movie)}>
                               <img src={imageUrl} alt="" draggable='false'/>
                               <div className="movieName">{movie.title || movie.name}</div>
                               </div>
                           )}
                           return null;
                   }
                   )}
               
            </MoviesSlider>
            <div className={`btnLeft ${isNetflix && 'isNetflix'}`} onClick={handleScrollLeft}>
            <FiChevronLeft/>
            </div>
            <div className={`btnRight ${isNetflix && 'isNetflix'}`} onClick={handleScrollRight}>
            <FiChevronRight/>
            </div>
        </MoviesRowContainer>
    )
}
export default MoviesRow;


const MoviesRowContainer=styled.div`
    background-color:var(--color-background);
    color:var(--color-white);
    padding:20px 20px 0;
    position:relative;
    width:100%;
    height:100%;
  .heading{
    font-size:18px;
    user-select:none;
  }

  .btnLeft{
    position:absolute;
    top:50%;
    left:30px;
    z-index:20;
    transform-origin:center;
    cursor:pointer;
    background-color:rgba(0, 0 , 0 ,0.5);
    height:50px;
    width:40px;
    border-radius:4px;
    display:flex;
    align-items:center;
    transform:translateY(-20%);

    &:hover{
        background-color:rgba(0, 0 , 0 ,0.8);
    }
    &:hover svg{
        opacity:1;
        transform:scale(1.2);
    }
    svg{
        opacity:0.7;
        font-size:50px;
        transition: all .3s linear;
    }
    &.isNetflix {
    height: 100px;
    width: max-content;
    }
  }
  .btnRight{
    position:absolute;
    top:50%;
    right:30px;
    z-index:20;
    transform-origin:center;
    cursor:pointer;
    background-color:rgba(0, 0 , 0 ,0.5);
    height:50px;
    width:40px;
    border-radius:4px;
    display:flex;
    align-items:center;
    transform:translateY(-20%);

    &:hover{
        background-color:rgba(0, 0 , 0 ,0.8);
    }
    &:hover svg{
        opacity:1;
        transform:scale(1.2);
    }
    svg{
        opacity:0.7;
        font-size:50px;
        transition: all .3s linear;
    }
    &.isNetflix {
        height: 100px;
        width: max-content;
        }
  }

`;
const MoviesSlider=styled.div`

display :grid;
gap:6px;

transition:all 0.3s linear;
user-select:none;
overflow-y:hidden;
overflow-x:auto;
overflow:hidden;
padding-top:28px;
padding-bottom:28px;
scroll-behavior:smooth;




  &:hover .movieItem
  {
    opacity:0.5;
  }

.movieItem{
    transform:scale(1);
    max-width:400px;
    max-height:500px;
    height:500px;
    transition: all 0.3s linear;
    user-select:none;
    overflow:hidden;
    border-radius:6px;
    transform: center left;
    position:relative;

    @media screen and (max-width:1000px)
    {
        height: 300px;
    }

    &:hover{
        opacity:1;
        transform:scale(1.1);
        z-index:10;
    }
    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }
    .movieName
    {
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        padding:4px;
        text-align:center;
        font-size:14px;
        background-color: rgba(0,0,0,0.65);
    }
}

`;