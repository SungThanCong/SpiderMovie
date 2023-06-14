import ReactPlayer from "react-player/vimeo";
import{VscMute, VscUnmute} from "react-icons/vsc"
import{MdPlaylistAdd} from "react-icons/md"
import {BsPlayFill} from'react-icons/bs'
import{AiOutlineHeart} from "react-icons/ai"
import styled from "styled-components";
import goblin from '../../assets/images/goblin.webp';
import spidermovie from '../../assets/images/spidermovie.png'
import{useState} from"react";


function Intro(props)
{
    const[isMuted,setIsMuted]=useState(false);
    return(
        <IntroContainer>
            <ReactPlayer className="videoIntro"
            playing={true}
            width="100%"
            height="100%"
            volume={1}
            muted={isMuted}
            loop={true}
            url='https://vimeo.com/185341559'
            ></ReactPlayer>
            <div className="infoIntro">
                <h1 className="headingIntro"><img src={spidermovie} alt=''/></h1>
                <p className="overviewIntro">The site provides the highest quality and fastest movies of all time. Wish you enjoy a great entertainment moment</p>
                <div className="btn-infoIntro">
                    <div className="btn-addtocart"><BsPlayFill className="Cart-icon"/>Play</div>
                    {/* <div className="btn-des"><MdPlaylistAdd/></div>
                    <div className="btn-heart"><AiOutlineHeart/></div> */}
                </div>
            </div>
             {
                isMuted ?(
                   <VscMute className="btnVolume"
                   onClick={()=> setIsMuted(prev=>!prev)}/>
                ):(
                    <VscUnmute className="btnVolume"
                    onClick={()=> setIsMuted(prev=>!prev)}/>
                )
             }
        <div className="fadeBottom"></div>
            
        </IntroContainer>
    )
}
export default Intro;

const IntroContainer=styled.div`

background-color: var(--color-background);
position:relative;
color:var(--color-white);
padding-top:56%;

.videoIntro
{
    position:absolute;
    top:0;
    left:0;
}
.infoIntro
{
    position:absolute;
    top:140px;
    left:48px;

    @media screen and (max-width:800px)
    {
        top:120px;
        left:25px;
    }
    @media screen and (max-width:600px)
    {
        top:100px;
        left:15px;
    }
    .headingIntro img
    {
        font-size:60px;
        transition: all 0.3s ease;
        width:400px;
        margin-top: -100px;
        margin-left: -20px;
    @media screen and (max-width:800px)
    {
        
        width:300px;
    }
    @media screen and (max-width:600px)
    {
        
        width:200px;
    }
    }
    .overviewIntro
    {
        max-width:480px;
        width:100%;
        line-heigh:1.3;
        padding-top:25px;
        font-size:18px;
        margin-top: -120px;

     @media screen and (max-width:800px)
    {
        
        font-size:16px;
    }
    @media screen and (max-width:600px)
    {
        
       display:none
    }
    }
    

}
.btn-infoIntro{
    align-items:center;
    color:#ffffff;
    display:flex;
    padding:18px 0px;

    .btn-addtocart{
    align-items:center;
    background-color:#f3f5f6;
    border-radius:50px;
    color:#1f2325;
    display:flex;
    
    font-weight:700;
    justify-content:center;
    line-height:24px;
    margin:0px 8px 0px 0px;
    padding:8px 24px 8px 28px;
    text-align:center;
    cursor:pointer;
    .Cart-icon{
        font-size:20px;
        margin-right:4px;
    }

    &:hover{
        background-color: #DDE2E5;
    }
    }
    .btn-des{
        align-items:center;
        background-color: #404446;
        border-radius:50%;
        display:flex;
        cursor:pointer;
        font-size:18px;
        justify-content:center;
        margin:0px 8px 0px 0px;
        padding:10px 12px;
        text-align:center;

        &:hover{
            background-color: #9CA1A3;
        }
    }
    .btn-heart{
        align-items:center;
        background-color: #404446;
        border-radius:50%;
        display:flex;
        cursor:pointer;
        font-size:18px;
        justify-content:center;
        margin:0px 8px 0px 0px;
        padding:10px 12px;
        text-align:center;

        &:hover{
            background-color: #9CA1A3;
        }
    }
}
.btnVolume{
    position: absolute;
    height:40px;
    width:40px;
    right:10%;
    top:50%;
    cursor:pointer;
    border-radius:50%;
    padding:6px;
    color:#bbb;
    border:#fff solid 1px;
    transition:all 0.3s ease;
    transform:scale(1);

    &:hover{
        color:#fff;
        transform:scale(1.2);
        background-color:rgba(211, 211, 211, 0.18);
    }
    @media screen and (max-width:800px)
    {

        height:30px;
        width:30px;
        padding:4px;
    }
    @media screen and (max-width:600px)
    {
        
        height:20px;
        width:20px;
        padding:1px;
    }

}
.fadeBottom
{
    position:absolute;
    bottom:0;
    width:100%;
    height:100px;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(15,15,15,0.6) 40%,
        rgb(17,17,17),
        rgb(17,17,17)

    )
}
`