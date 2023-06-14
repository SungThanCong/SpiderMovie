
import React from "react";
import { useDispatch } from "react-redux";
import {getRecommendMovies, getMovieWatch} from "../store/action";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import {FaPlay} from'react-icons/fa';
import {CgTrashEmpty} from "react-icons/cg"
function MyProduct(props)
{
    const{movie}=props
    const dispatch= useDispatch()
    const navigate= useNavigate();
    const handleWatchMovie=async ()=>{
        dispatch(getRecommendMovies(movieid,moviename));
        await dispatch(getMovieWatch(movieid));

        navigate(`/watch?${movieid+moviename}`)
    }
    //navigate(`/search?keywords=${keywords.trim()}`)
    let movieid=0;
    let moviename='';
return(

     
    <ProductList >
          
        <div className="TitleProduct">
            <h1 >My Collection</h1>
            <p>
                Inspirational designs,
            illustrations, and graphic elements from the world’s best designers.<br></br>
            Want more inspiration? Browse our search results...
            </p>
          </div>
            {
                movie && movie.length > 0 ?(
                    movie.map((item,index)=>
                {
                
                
                 const imageUrl=`http://127.0.0.1:8000${item.movie.banner}`
                
return(
                                
    <Card className="ProductItem" style={{ width: '18rem' }}  key={movie.id}>
      <Card.Img className="ProductImg" variant="top" src={imageUrl} />
      <Card.Body>
        <h6 className="ProductItemTitle" >{movie &&(item.movie.title)}</h6>
        
        <Button className="btnPlay" variant="primary" onClick={()=>{handleWatchMovie(movieid=item.movie.id, moviename=item.movie.title)}}> <FaPlay/> Play</Button>
      </Card.Body>
    </Card>
    
    
            //      <div className="collectionItem" key={movie.id}>
            //  <img src={imageUrl}alt=""></img>
            //  <h3>{movie &&(movie.title||movie.name)}</h3>
            //  <div className="btnWatchMovie" onClick={()=>{handleWatchMovie(movieid=movie.id, moviename=movie.title||movie.name)}}>Play</div>
            // </div>)
               ) }))
             :(
                <div className="titleCartCollection">
                <h1>Your Collection not movie  </h1>
                <CgTrashEmpty className="titleCartCollectionIcon"/>
            </div>
               )}
         
         </ProductList>      
    
    
            )}



export default MyProduct;

const ProductList= styled.div`
display:flex;
width:100%;
min-height:92vh;
padding-top:80px;
background:var(--color-background);
transition: all 0.3s linear;
flex-wrap: wrap;

justify-content:center;
.titleCartCollection{
    display:flex;
    color:var(--color-white);
    align-items:center;
    justify-content:center;
    .titleCartCollectionIcon{
        font-size:32px;
        margin-left:10px;
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
.ProductItem.card
{
    background-color: rgb(17,17,17);
    display: block;
    position:relative;
    max-width: 400px;
    width:100%;
    height:420px;
    color:white;
    border-color:white;
    border-radius:6px;
    border:4px;
    border-style: solid;
    text-align:center;
    margin:20px;
        

.ProductImg{
 width: 80%;
  height: 80%;
  object-fit: cover;
  
border-radius:6px;


}
.btnPlay{
    position: absolute;
    left: 100px;
    border:2px;
    border-radius:8px;
    border-color:var(--color-white);
    background-color: var(--color-white);
    cursor:pointer;
    transition:all 0.3s ease;
    text-align:center;
    bottom:-25px;
    &:hover{
        opacity:0.7;
        
    }
}
.ProductItemTitle{
    margin-top:6px;
}

}

`
