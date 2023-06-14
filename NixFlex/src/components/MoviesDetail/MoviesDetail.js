import React from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setMovieCard, setMovieDetail } from "../store/action";
import moment from "moment/moment";
import {BsFillCartCheckFill} from'react-icons/bs'
import {MdOutlineDoneOutline} from'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//const showModal= true;
function MoviesDetail(props)
{
        
    const navigate= useNavigate();
    const goCart=()=>
    {
        navigate('/cart');
        dispatch(setMovieDetail(null));
    }
    const{movie,showModal}=props;
    const dispatch = useDispatch();
    
    const toggleNotify = document.getElementById("toggleNotify");
    const handleCloseModal =()=>
    {
        dispatch(setMovieDetail(null))
    }
    const handleMovieCart =()=>{
          dispatch(setMovieCard(movie))
          toast.success('Add to cart successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        dispatch(setMovieDetail(null))
   
         
    }
    return(
        
        <MoviesDetailModal>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
         <div onClick={handleCloseModal}
          className={`backdrop ${showModal ?'showBackdrop' :'hideBackdrop'} `}>
         

         </div>
         
         <div className={`modall ${showModal ?'showModal' :'hideModal'}`}
         style={
            movie ?{
            backgroundImage:`url(http://127.0.0.1:8000${movie.background})`,
            backgroundSize:'cover',
            width: '100%', 
        }:{}}>
           <div className="main-container">
            <div className="movieInfo">
                <h1 className="movieTitle">{movie &&(movie.title||movie.name)}</h1>
                <p className="statistical">
                    <span className="rating">Rating:{movie && movie.total_rating *10}%</span>
                    <span className="popularity">Popularity: {movie && movie.count_view}</span>
                </p>
                <p className="releaseDate">Release date: {movie && (moment(movie.date_release).format('DD/MM/YYYY'))}</p>
                
                <p className="overview">{movie && movie.movie_intro}</p>
                <h2 className="priceMovieDetail">{movie && movie.price}$</h2>
                <div className="btn-movie">
                <div className="btnMovieDetail" onClick={()=>handleMovieCart(movie)}>
                    
                  <BsFillCartCheckFill className="iconMovieDetail"/>
                  <div className="titleMovieDetail">Add to cart</div>
                  
                </div>
                <div className="btnbuynow" onClick={()=>{handleMovieCart(movie) ;goCart()}}>
                    
                  
                  <div className="titleMovieDetail">Buy now</div>
                  
                </div>
                </div>
            </div>
           </div>

         </div>
        </MoviesDetailModal>
    );  

}
export default MoviesDetail;


const fadeIn = keyframes`
    0% {
        background: rgba(0, 0, 0, 0);
    }
    100% {
        background: rgba(0, 0, 0, 0.6);
    }
`;


const MoviesDetailModal =styled.div`
.showModal{
    top:25%;
    opacity:1;
    left :0;
    visibility:visible;
    transition:0.3s ease-in-out;
}
.hideModal{
    top:0;
    opacity:0;
    visibility:hidden;
    transition:0.3s ease-in-out;
}

.backdrop{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:200;
    background-color:rgba(0,0,0,0.6);
    animation: ${fadeIn} 1s cubic-bezier(0.17,0.85,0.45,1) forwards;
    
    .notify-success{
        color:white;
        display:none;
        width:200px;
        height:50px;
        background-color:green;
        align-items:center;
        justify-content:center;
        right:0px;
        position:absolute;
        top:12px;
        transition:all 0.3s ease;
    }
    .showsuccess{
        display:flex;
    }
    .hidesuccess{
        display:none;
    }
}
.showBackdrop{
    display:block;

}
.hideBackdrop{
    display:none;
    
}
.modall{
    position:fixed;
    top:20%;
    left:0;
    z-index:300;
    height:65%;
    margin: 0 auto;
    color:var(--color-white);
    box-shadow: 0 15px 40px rgba(var(--color-dark),0.2);
    transition:all 0.3s ease;

    @media screen and (max-width:1184px)
    {
        height:70%;
    }
    @media screen and (max-width:600px)
    {
        height:80%;
    }

    .main-container
    {
        position:relative;
        width:70%;
        height:100%;
        background:linear-gradient(90deg , rgba(0,0,0,0.8) 60%, transparent);

        @media screen and (max-width:1184px)
        {
            background: linear-gradient(90deg, 
                rgba(0,0,0,0.95) 40%,
                rgba(0,0,0,0.733) 40%,
                transparent);

                width:88%;
        }
        @media screen and (max-width:980px)
        {
            background: linear-gradient(90deg, 
                rgba(0,0,0,0.95) 50%,
                
                transparent);

                width:100%;
        }
        @media screen and (max-width:600px)
        {
            background: linear-gradient(90deg, 
                rgba(0,0,0,0.88) 60%,
                
                transparent);

                
        }
        .movieInfo{
            width:65%;
            height:100%;
            padding-left:24px;
            color:var(--color-white);
            font-size:20px;
            padding-top:30px;

            @media screen and (max-width:600px)
        {
            font-size:16px;
            width:80%;  

                
        }
        .movieTitle{
            margin-top:30px;

        }
        .statistical{
            margin-top:20px;
            display:flex;

            .rating{
                color:var(--color-green);
            }
            .popularity{
                color:yellow;
                margin-left:12px;
            }
        }
        // .releaseDate, ,runtime
        // {
        //     margin-top:12px;
            

        // }
        .overview {
            margin-top:20px;
            color:rgb(255,255,255,0.6);
            line-height:1.4;
            font-size:18px;

            @media screen and(max-width:600px)
            {
                font-size:14px;
            }
        }
        .btn-movie{
            display:flex;
            margin-top:10px;
            margin-bottom:20px;
            .btnbuynow{
                align-items:center;
                background-color:#E3111F;
                border-radius:20px;
                box-shadow:#000000 0px 1px 1px 0px;
                color:#ffffff;
                display:flex;
                flex-direction:column;
                
                justify-content:center;
                line-height:19.2px;
                margin:0px 15px 0px 0px;
                padding:10px 20px;
                text-align:center;
                text-transform:capitalize;
                cursor:pointer;
            }
        .btnMovieDetail{
            align-items:center;
            background-color:#f3f5f6;
            border-radius:20px;
            box-shadow:#000000 0px 1px 1px 0px;
            color:#E3111F;
            display:flex;
            
            
            line-height:19.2px;
            margin:0px 10px 0px 0px;
            padding:10px 20px;
            text-align:center;
            text-transform:capitalize;
            align-items:center;
            justify-content:center;
            white-space: nowrap;
            position:relative;
            
            cursor:pointer;
            &:hover
            {
                opacity:0.7;
            }

            .iconMovieDetail{
                font-size:24px;
            }
            .titleMovieDetail{
                font-size:20px;
                font-weight:500;
                padding-left:5px;
                
            }
            @media screen and (max-width:980px)
        {
           width:120px;
           font-size:18px;
           .titleMovieDetail{
            font-size:18px;}
        }
        @media screen and (max-width:600px)
        {
            
            width:100px;
            font-size:22px;
            white-space: nowrap;
            .titleMovieDetail{
                font-size:16px;}
            }
        }
        }
    }
        .priceMovieDetail{
            color:#E3111F;
            font-size:30px;
            font-weight:500;
            line-height:36px;
            white-space: nowrap;
            margin-top:8px;
        }
        }
    
}

`;