import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import {FaShare} from 'react-icons/fa'
import { Rating } from 'react-simple-star-rating'
import MoviesRow from "../Contents/MoviesRow";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import axiosAuth from "../../utils/axiosAuth";
import Comment from "../Comment/Comment";
function WatchMovie(props)
{
  
    const {movieRecommend, movieWatch}=props;
   
    const videoUrl = `http://127.0.0.1:8000${movieWatch.source_link}`
    useEffect(()=>{
        // axiosAuth.get(`http://127.0.0.1:8000/api/evaluate/rating/user/${movieWatch.id}`)
        // .then(response => {
        //     console.log(response)
        //     if(response.status === 200 && response.data.length>0)
        //         props.setRating(response.data[0].rating)
        //     }   
        // )

    },[])
    const handleRating = (value) => {
        axiosAuth.post('http://127.0.0.1:8000/api/evaluate/rating/add/',
        {
            movie:movieWatch.id,
            rating: value
        }).then(response => {
            console.log(response)
            if(response.status === 200)
                props.setRating(response.data.rating)
            }   


        )
    }


    return(
        <Watch>       
            <div className="watchVideo">
            <ReactPlayer className="videoWatch"
                playing={true}
                width="100%"
                height="55%"
                volume={1}
                loop={true}
                controls={true}
                url= {videoUrl} 
                stopOnUnmount={true}
                config={{
                    file: {
                    attributes: {
                        crossOrigin: "true",
                    }
                    }
                }}
            
            ></ReactPlayer>
            </div>
            <div className="videoContainer">
                <div className="videoDes">
                    <div className="videoInfo">
                        <h4>{movieWatch.title}</h4>
                        <h3>Johnny English Reborn</h3>
                        <div className="videoTime">
                            
                            <div className="videoTime_Year">{movieWatch.date_release}</div>
                            <div className="videoTime_Age">{movieWatch.age_recommend}+</div>
                            <div className="videoTime_During">{movieWatch.movie_length}</div>

                        </div>
                        <p>{movieWatch.description}</p>
                    </div>
                    <div className="videoMiddle"></div>
                    <div className="videoReaction"> 
                    <div className="videoRating">
                        <Rating 
                        onClick={(value) => {handleRating(value)}}
                        initialValue={props.rating}
                        size={20}
                        label
                        transition
                        fillColor='orange'
                        emptyColor='gray'
                        className='foo' // Will remove the inline style if applied
                                />
                     </div>
                     <div className="videoShare">
                        <div className="videoShareAll">
                        <FaShare/>
                        <div className="videoShareTitle">Share</div>
                        
                        </div>
                     </div>
                      </div>
                    
                </div>
            </div>
            <div className="videoRelated">
                <div className="videoRelated_Title">
                <MoviesRow movies={movieRecommend} title="Related Movies" idSection='trending'/>
                </div>
                <div className="videoRelated_Row"></div>
            </div>
         </Watch>
         

        
    )
}
export default WatchMovie;

const Watch=styled.div`
background-color: var(--color-background);
position:relative;
color:var(--color-white);
padding-top:80px;
width:100%;


.watchVideo{
    
    width: 100%;
    max-width:100%;
    height:600px;
    
    @media screen and (max-width:1184px)
    {
        height:550px;
       
    }
    @media screen and (max-width:800px)
    {
        height:450px;
       
    }
    @media screen and (max-width:600px)
    {
        height:400px;

        
    }

.videoWatch{
    position: absolute;
    top: 0;
    left: 0;
    margin-top:80px;
    margin-bottom:48px;
    
    

    @media screen and (max-width:800px)
    {
        margin-top:0px;
       
    }
    @media screen and (max-width:600px)
    {
        margin-top:-20px;
        
    }

}
}

.videoContainer{
    position:relative;
    margin-top:150px;
    margin-right:30px;
    margin-left:30px;

    @media screen and (max-width:1184px)
    {
        margin-top:100px;
       
    }
    @media screen and (max-width:800px)
    {
        margin-top:50px;
       
    }
    @media screen and (max-width:600px)
    {
        margin-top:0px;
        
    }


.videoDes{
    display: flex;
    
    @media screen and (max-width:1184px)
    {
        flex-wrap: nowrap;
    }
    @media screen and (max-width:600px)
    {
        
        flex-wrap: wrap;
    }
    
    .videoInfo{
        flex: 0 0 58.33333333%;
     max-width: 58.33333333%;

     h4{
        font-size: 1.5rem ;
       line-height: 2rem;
       font-weight:500;
       margin-bottom:0.25rem;
       }
     h3{
        font-size:16px;
        line-height:19px;
        margin-bottom:12px;
      }

     .videoTime
     {
        display:flex;
        margin-bottom:1rem;

        .videoTime_Year{
        font-weight: 400;
         font-size: 14px;
        line-height: 17px;
        margin-right:6px;
        }
        .videoTime_Age{
            font-weight: 400;
         font-size: 14px;
        line-height: 17px;
        margin:0 6px 0 6px;
        }
        .videoTime_During{
            font-weight: 400;
            font-size: 14px;
           line-height: 17px;
           margin:0 6px 0 6px;
        }
        .videoTime_Country{
            font-weight: 400;
            font-size: 14px;
           line-height: 17px;
           margin:0 6px 0 6px;
        }
     }
     p{
        text-align: justify;
        overflow-wrap: break-word;
        font-size: 14px ;
       line-height: 17px ;
       font-weight: 400 ;
       margin-bottom:10px;
     }
    }
    .videoMiddle{
        flex: 0 0 8.33333333%;
        max-width: 8.33333333%;
    }
    .videoReaction{
        flex: 0 0 33.33333333%;
         max-width: 33.33333333%;
         display:flex;
         
         
         .videoRating{
            margin-right:10px;
            .foo{
           
            border-radius:20px;
            background:#272726;
            padding:4px;

            }
         }
        .videoShare{
            cursor:pointer;
            .videoShareAll{
            display:flex;
           
            border-radius:20px;
            background:#272726;
            padding:7px;
            font-size:20px;
            .videoShareTitle{
                font-size:16px;
                margin:0 6px 0 6px;
            }
        }
            
        } 
    }
    }
 }
.videoRelated{
    
}
`