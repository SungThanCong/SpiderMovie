import React from "react";
import styled from "styled-components";
import axiosAuth from "../../utils/axiosAuth";

export const UserDetail = (props) => {
    const data = props.data
    const handleOnClick = () => {
        props.setSelectedProduct(null)
    }
    const onLock = () => {
        axiosAuth.post(`http://127.0.0.1:8000/api/manager/active_user/${data.id}`,{
            active : "False"
        }).then(
            response => { if(response.status === 200) {props.setSelectedProduct(null); props.setAnnoucement({status:"success"})}}
        ).catch(err => console.log(err)) 
    }
    const onActivate = () => {
        axiosAuth.post(`http://127.0.0.1:8000/api/manager/active_user/${data.id}`,{
            active : "True"
        }).then(
            response => { if(response.status === 200) {props.setSelectedProduct(null); props.setAnnoucement({status:"success"})}}
        ).catch(err => console.log(err))
    }
    return (
        <Container >
            <div className="backdrop" onClick={handleOnClick}>

            </div>
            <div className="main">
                <div className="container">
                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12" style={{padding:10}} >
                            <div className="card h-100"> 
                                <div className="card-body">
                                    <div className="account-settings">
                                        <div className="user-profile">
                                            <div className="user-avatar">
                                                <img src={data.avatar_url == null ? "https://bootdey.com/img/Content/avatar/avatar7.png": data.avatar_url } alt="Maxwell Admin"/>                                 
                                            </div>
                                            <h5 className="user-name">{data.username}</h5>
                                            <h6 className="user-email">{data.email}</h6>
                                        </div>
                                        <div className="about">
                                            <h5 >About</h5>
                                            <textarea className="form-control" rows="4" cols="50" readOnly={true}>{data.description}</textarea>                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12" style={{padding:10}}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-danger">Personal Details</h6>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" >
                                            <div> 
                                                <label className="h6" for="fullName" >First Name</label>
                                                <input type="text" className="form-control" id="firstname" name="firstname"  value={data.first_name} 
                                                readOnly={true}  />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 pl-sm-2 col-12">
                                            <div>
                                                <label className="h6" for="fullName" >Last Name</label>
                                                <input type="text" className="form-control" id="lastname" name="lastname"  value={data.last_name}
                                                readOnly={true} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" >
                                            <div>
                                                <label className="h6" for="eMail" >Email</label>
                                                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email ID" value={data.email}  readOnly={true}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 pl-sm-2 col-12">
                                            <div >
                                                <label className="h6" for="phone" >Phone</label>
                                                <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter phone number" value={data.phone}  readOnly={true}/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div>
                                                <label className="h6" for="phone" >Address</label>
                                                <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" value={data.address} readOnly={true}/>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            data.is_active === true? 
                            <div>
                                <p>This account is <b>active!</b> If you want locked this account. Click <button className="btn btn-danger" onClick={onLock}>Lock</button></p>
                            </div>
                            :
                            <div>
                                <p>This account is <b>inactive!</b> If you want activate this account. Click <button className="btn btn-success" onClick={onActivate}>Activate</button></p>
                            </div>
                        }
                    </div>
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
.gutters{
    padding: 10px;
}
.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: black;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: red;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid black;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;
    background: #ffffff;
    color: #2e323c;
    padding: 5px;
}
.row .gutters > div{
    margin-bottom: 16px;
}
.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 10px;
}`