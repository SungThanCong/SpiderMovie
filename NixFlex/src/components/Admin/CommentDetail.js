import React from "react";
import styled from "styled-components";
import axiosAuth from "../../utils/axiosAuth";

export const CommentDetail = (props) => {
    const data = props.data
    const handleOnClick = () => {
        props.setSelectedProduct(null)
    }
    // const onLock = () => {
    //     axiosAuth.post(`http://127.0.0.1:8000/api/manager/active_user/${data.id}`,{
    //         active : "False"
    //     }).then(
    //         response => { if(response.status === 200) {props.setSelectedProduct(null); props.setAnnoucement({status:"success"})}}
    //     ).catch(err => console.log(err)) 
    // }
    // const onActivate = () => {
    //     axiosAuth.post(`http://127.0.0.1:8000/api/manager/active_user/${data.id}`,{
    //         active : "True"
    //     }).then(
    //         response => { if(response.status === 200) {props.setSelectedProduct(null); props.setAnnoucement({status:"success"})}}
    //     ).catch(err => console.log(err))
    // }
    return (
        <Container >
            <div className="backdrop" onClick={handleOnClick}>

            </div>
            <div className="main">
                <div className="container card card-body p-5">
                    {data.content}
                </div>
            </div>
        </Container>
        
     
    )
}

const Container = styled.div`

position: fixed;
top:0;
left: 0;
width: 100vw;
height: 100vh;
z-index: 1000;

*{
    padding: 5px;
}
.backdrop{
    position: absolute;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.6);
}
.main{
    border: #2e323c 1px solid;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    padding: 16px;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

}`