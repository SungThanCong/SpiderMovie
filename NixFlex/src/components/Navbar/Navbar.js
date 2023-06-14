import React , {Redirect} from "react";
import mova from'../../assets/images/mova.png';
import {MdSearch,MdOutlineCollections, MdLogout} from 'react-icons/md';
import gif from'../../assets/images/gif-bg.webp';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {BsCalendarCheck,BsGift} from 'react-icons/bs';
import styled from 'styled-components';
import { useScrollY } from '../hooks';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineCaretDown,AiOutlineUser,AiOutlineShoppingCart,AiOutlineClose} from 'react-icons/ai'
import{GiUpgrade} from 'react-icons/gi'
import { useSelector, useDispatch } from "react-redux";
import * as ACTIONS from'../store/action'



function Navbar(props)
{
    const {Information}= useSelector(state=>state.user)
    const dispatch = useDispatch();

    const[scrollY]= useScrollY();
    
    var num=0;

    const[keywords,setKeywords]=useState('')
    const navigate= useNavigate();

    const gifcheck = document.getElementById("gifcheck");
    //const gifimg=document.getElementsByClassName("check-body-day")
    const listNotify=document.getElementById("list-notify")
    
    const imgvou=document.getElementById("check-week-day-vou-img")
    
    const handleChangeInput=(e)=>{
    let keywords=e.target.value;
    setKeywords(keywords);
//   if(keywords.length>0)
//   {
//     navigate(`/search?keywords=${keywords.trim()}`)
//   }
//   else{
    //     navigate(`/`);
    //   }
    (keywords.length>0)
        ? navigate(`/search?keywords=${keywords.trim()}`)
        :navigate(`/`);
    }
    const goHome =()=>{
        navigate('/');
        setKeywords('');
    }
    const handlename=()=>
    {
        navigate('/cart');
    }
    const handleProduct=()=>
    {
        navigate('/product');
    }
    const handlecheck =()=>{
        if(gifcheck.style !== null)    
        gifcheck.style.display = 'flex';
}
const goExplore = () =>{
    navigate('/explore')
}
const handleclose=()=>{

    gifcheck.style.display = 'none';
    }

const handleimg=()=>{
    console.log(num)
    imgvou.src="https://assets.glxplay.io/static/files/day-active_1673957326716.png"


}
const handlenotify =()=>{
    if(listNotify.classList.contains("showsuccess"))
    {
    listNotify.classList.remove("showsuccess")
    listNotify.classList.add("hidesuccess")
    
    }
    else
    {
    listNotify.classList.remove("hidesuccess")
    listNotify.classList.add("showsuccess")
    }
   
}
const handleProfile = () => {
    navigate('/profile')
}

const handlepay=()=>{
    navigate('/checkout');
    listNotify.classList.remove("showsuccess")
    listNotify.classList.add("hidesuccess")
}

const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login')

    await dispatch(ACTIONS.UserLogout());
}
    

    return(
        <Navigation style={scrollY < 50 ?{backgroundColor:'var(--color-background)'}:{backgroundColor:'var(--color-background)'}}>
        <div className='navContainer'>
           
            <div className='logo' onClick={goHome}>
                <img src={mova} alt=""></img>
            </div>
            <div className='middle'>
                <div className='middle-home' onClick={goHome}>Home</div>
                <div className='middle-home' onClick={goExplore} >Explore</div>
                <div className='middle-home' onClick={handleProduct}>My List</div>
                
            </div>
            

            <div className='navSearch'>
            <MdSearch className='iconSearch'></MdSearch>
            <input
            onChange={handleChangeInput}
            value={keywords}
            type="text" placeholder='Input title, genres, people'/>
            </div>
            <div className='iconCart-vs1' onClick={handlename}><AiOutlineShoppingCart /></div>
           


            {/* <div className='namerandom' onClick={handlename}>Bam vao day</div>
            <div className='myProduct' onClick={handleProduct}>My Product</div> */}
            
            <div className='profileUser'>
                
                <div className='imgProfile'>
                {
                    Information != null ?
                    <div className="d-flex">
                        <img src='https://assets.glxplay.io/static/avatars/Avatar%20Profile-06.png' alt=''/>
                        <div><AiOutlineCaretDown className='iconProfile'/> </div>
                    </div>
                    :
                        <div>Login</div>
                    
                }
                    
                 </div>
                <ul className='itemProfile'>
                {
                    Information != null ?
                    <div>
                        <li className='itemProfileUser'> <div onClick={handleProfile}><AiOutlineUser  className='iconUser'/>Profile </div> </li>
                        <li><div className='btnCart' onClick={handlename} ><AiOutlineShoppingCart className='iconCart'/>My Cart</div></li>
                        <li><div className='btnCollection' onClick={handleProduct}><MdOutlineCollections className='iconCollection'/> My List</div></li>
                        <li><div className='btnCart' onClick={handleLogout} ><MdLogout className='iconCart'/>Logout</div></li>

                    </div>
                    :
                        <li className='itemProfileUser'><Link to='/login'><AiOutlineUser className='iconUser'/>Login </Link> </li>
                }
                   
                </ul>
            </div>
           
        </div>
        </Navigation>
    )
}

export default Navbar;


const Navigation= styled.div`
width:100%;
height:80px;
position:fixed;
top:0;
transition-timing-function: ease-in;
transition: all 1s;
z-index:10;

@media screen and (max-width:600px)
    {
       
        height:40px;
    }

.navContainer
{
    background-color:transparent;
    display: flex;
    justify-content:space-around;
    align-items: center;
    flex-direction:row;
    position:relative;
    height:100%;
    .iconCart-vs1{
        position:absolute;
        display:flex;
        align-items:center;
        margin-right:2%;
        font-size:22px;
        margin-top:10px;
        right:6%;
        
        cursor: pointer;
        
        color:#bbb;
        
    }
    
    .checkin{
        right:10%;
    }
    .showsuccess{
        display:block;
    }
    .hidesuccess{
        display:none;
    }

      
    }
    @media screen and (max-width:600px)
    {
        flex-direction:column;
        
    }
    .middle{
        flex:1;
        font-size:18px;
        display:flex;
        position:relative;
        margin:16px 0px 12px 50px;
        align-items: center;
        color:var(--color-white);
        @media screen and (max-width:1024px)
        {
          display:none;
        }
        .middle-home{
            display:flex;
            
            justify-content:center;
            text-transform:capitalize;
            align-items: center;
            color:var(--color-white);
            margin:0px 14px;
            cursor:pointer;
            &:hover .icon-home {
                opacity:0.7;
            }
            &:hover {
                opacity:0.7;
            }
            .icon-home{
               color:var(--color-white);
               margin-right:2px;
               
            }
        }
        
    }
    .profileUser{
        position:absolute;
        right:2%;
        color:var(--color-white);
        margin-top:8px;
        margin-right:2%;

        &:hover .itemProfile
            {
                display:block;
            }
        
        .imgProfile{
            float: left;
            align-items:center; 
            width:32px;
            height:32px;
            border-radius:50%;
            border:1px;
            
            cursor:pointer;
            
            
            
            img{
                width:100%;
                height:100%;
                border-radius:50%;
            }
            .iconProfile{
                
                color:#ffffff;
                font-size:14px;
                margin-left:4px;
            }
        }
        .itemProfile{
            position:absolute;
            list-style: none;
            width:100px;
            background-color:#000000;
            color:#ffffff;
            font-size:13px;
            right:-25px;
            margin-top:50px;
            width:140px;    
            opacity:0.7;
            border-radius:4px;
            cursor:pointer;
            display:none;
            transition:all 0.3s ease;
            &:before{
                content:"";
                position:absolute;
                
                right:10px;
                top:-10px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 10px 10px 10px;
                border-color: transparent transparent white transparent;
                
            }
            &:after{
                content:"";
                position:absolute;
                
                right:-20px;
                top:-22px;
                width: 120px;
                height: 30px;
                background-color:red;
                opacity:0;
                
                
                
            }
            .itemProfileUser{
                display:flex;
                align-items:center;
                padding:12px;
                border-bottom: 1px ;
                border-style:solid;
                border-color:white;
                transition:all 0.3s ease;
                .iconUser{
                    font-size:18px;
                    margin-right:4px;
                }
                &:hover{
                    background-color:rgba(0,0,0,0.5);
                    color:var(--color-white);
                    
                }
            }
            .btnCart{
                display:flex;
                align-items:center;
                padding:12px;
                border-bottom: 1px ;
                border-style:solid;
                border-color:white; 
                .iconCart{
                    font-size:18px;
                    margin-right:4px;
                }
                &:hover{
                    background-color:rgba(0,0,0,0.5);
                    color:var(--color-white);
                    
                }
            }
            .btnUpgrade{
                border-top: 1px ;
                border-style:solid;
                border-color:white;
                color:#E3111F;
            }
            .btnCollection{
                display:flex;
                align-items:center;
                padding:12px;
                margin-bottom:10px;
                .iconCollection{
                    font-size:18px;
                    margin-right:4px;
                }
                &:hover{
                    background-color:rgba(0,0,0,0.5);
                    color:var(--color-white);
                    
                }
                
            }

        }
    }
    .namerandom{
        color:var(--color-white);
        cursor:pointer;
    }
    .myProduct{
        color:var(--color-white);
        cursor:pointer;
    }
    .logo
    {
        width:120px;
        cursor:pointer;
        margin-left:12px;
        img
        {
            width:100%;
        }
        
        padding-top:10px;
        
    }
    .navSearch
    {
         color: var(--color-white);
         padding-right:22px;
         position: absolute;
         right:9%;
        
         display:flex;
         justify-content:flex-end;
        
        padding-top:14px;
         &:hover .iconSearch
         {
            color:var(--color-white);
         }
         .iconSearch
         {
            width:22px;
            height:22px;
            cursor: pointer;
            transform: translateX(24px) translateY(10px);
            color:#bbb;
         }
         input
         {
            font-size:14px;
            border:1px solid #fff;
            color: var(--color-white);
            outline:none;
            padding:10px;
            width:0;
            cursor:pointer;
            opacity:0;
            background:var(--color-background);
              transition: width 0.5s;
            &:focus
            {
                padding-left:26px;
                width:300px;
                cursor:text;
                opacity:1;
                border-radius:4px;
            }

         }
    }

`;