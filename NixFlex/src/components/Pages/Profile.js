import React, { useState } from "react";
import { useEffect } from "react";
import '../../utils/profile.css'
import { useDispatch, useSelector } from "react-redux";
import axiosAuth from "../../utils/axiosAuth";
import * as ACTIONS from'../store/action'

const Profile = (props) => {
    const {Information} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const [email, setEmail] = useState(Information.email)
    const [description, setDescription] = useState(Information.description)
    const [firstname, setFirstName] = useState(Information.first_name)
    const [lastname, setLastName] = useState(Information.last_name)
    const [phone, setPhone] = useState(Information.phone)
    const [address, setAddress] = useState(Information.address)
    const [avatarUrl, setAvatarUrl]  = useState(Information.avatar_url)
    const [avatar, setAvatar]  = useState(null)

    useEffect(() => {
        props.onShowNavbar(true);
        props.onShowFooter(true);
        if(avatarUrl != null)
            setAvatarUrl(`http://127.0.0.1:8000${Information.avatar_url}`)
      }, []);
    const UpdateProfile = async (event)=> {
        event.preventDefault();
        try{
            const result = axiosAuth.post('http://127.0.0.1:8000/api/auth/getInfo/', {
                email: email,
                description : description,
                first_name: firstname,
                last_name: lastname,
                phone: phone,
                address: address,
                avatar: avatar
            }).then(response => {
                console.log(response)
                if(response.status === 200)
                    dispatch(ACTIONS.GetInfoUserLogin())

            });
            
            console.log({
                email: email,
                description : description,
                first_name: firstname,
                last_name: lastname,
                phone: phone,
                address: address,
                avatar: avatar
            });
        }catch(err){
            console.log(err)
        }
      
    }
    return(
        <div className="main">
        <div className="container">
            <form className="row gutters" onSubmit={UpdateProfile}>
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12" >
                    <div className="card h-100" style={{backgroundColor:"rgb(17,17,17)"}}> 
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img src={avatarUrl == null ? "https://bootdey.com/img/Content/avatar/avatar7.png": avatarUrl} alt="Maxwell Admin"/>
                                        <br/>
                                        <input id='avatar' name="avatar" type="file" style={{display:"none"}} onChange={(e)=>{setAvatarUrl(URL.createObjectURL(e.target.files[0]), setAvatar(e.target.files[0]))}}/>
                                        <label for="avatar" className="btn btn-danger mt-3">Upload File</label>

                                    </div>
                                    <h5 className="user-name text-white">{Information.username}</h5>
                                    <h6 className="user-email text-white">{Information.email}</h6>
                                </div>
                                <div className="about">
                                    <h5 className="text-white">About</h5>
                                    <textarea className="form-control" rows="4" cols="50">{Information.description}</textarea>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100" style={{backgroundColor:"rgb(17,17,17)"}}>
                        <div className="card-body">
                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mb-2 text-danger">Personal Details</h6>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="fullName" className="text-white">First Name</label>
                                        <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Enter first name" value={firstname} 
                                         onChange={(e)=> setFirstName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="fullName" className="text-white">Last Name</label>
                                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Enter last name" value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="eMail" className="text-white">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter email ID" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label for="phone" className="text-white">Phone</label>
                                        <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter phone number" value={phone}  onChange={(e) => setPhone(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label for="phone" className="text-white">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" value={address}  onChange={(e) => setAddress(e.target.value)}/>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                        <button type="submit" id="submit" name="submit" className="btn btn-danger">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Profile