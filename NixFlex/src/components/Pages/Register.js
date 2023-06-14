import {React, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import background from'../../assets/images/background_2.jpg';
import mova from'../../assets/images/mova.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register(props)
{
   
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    
    useEffect(() => {
        props.onShowNavbar(false);
        props.onShowFooter(false);

      }, ['']);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== password2){
            toast.error('Password does not match', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
                    username,
                    password,
                    password2,
                    first_name,
                    last_name,
                    phone,
                    email
    
                });
                if(response.status === 201){
                    toast.success('Sign up successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
    
                    navigate(`/login`)
    
                }else{
                    
                    toast.error('User is has been exist', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
    
               
            } catch (error) {
                console.log(error);
                var mess = error.response.data;
                for (const key of Object.keys(mess)){
                    
                    for (const mes of mess[key] ){
                        toast.error(mes , {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    }
                   
        
                }
               
            }
        }
        
    };

    return(
        <LoginForm>
             <div className='logo' style={{padding:"20px", cursor:"pointer"}} onClick={() => navigate('/')}>
                <img src={mova} alt="" height={60} width={200}></img>
            </div>
            <form onSubmit={handleSubmit}>
                <h2 className="sr-only">Sign Up</h2>
                <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                <div className="form-group"><input className="form-control" type="text" name="username" placeholder="Username" onChange={(e)=> setUsername(e.target.value)} required/></div>
                <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required/></div>
                <div className="form-group"><input className="form-control" type="password" name="password2" placeholder="Repeat Password" onChange={(e)=> setPassword2(e.target.value)} required/></div>
                <div className="form-group d-flex">
                    <input className="form-control" type="text" name="last_name" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)} required/>
                    <input className="form-control" type="text" name="first_name" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} required/>
                </div>
                <div className="form-group"><input className="form-control" type="text" name="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required/></div>
                <div className="form-group"><input className="form-control" type="text" name="phone" placeholder="Phone number" onChange={(e)=> setPhone(e.target.value)} required/></div>

                <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Sign Up</button></div>
                <div className="forgot" >If you already have a password. Login <a href="/login" className="forgot">here</a></div>
            </form>
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
                {/* Same as */}
            <ToastContainer />
        </LoginForm>
    )    
}

const LoginForm = styled.div`
input::placeholder{
        color: lightgray;
    }
    display: block;
    height:100vh;
    background:#475d62 url(${background});
    background-size:cover;
    position:relative;
        
        form {
        max-width:320px;
        width:90%;
        background-color: rgba(0,0,0,0.8);
        padding:40px;
        border-radius:4px;
        transform:translate(-50%, -50%);
        position:absolute;
        top:50%;
        left:50%;
        color:#fff;
        box-shadow:3px 3px 4px rgba(0,0,0,0.2);
            .form-control {
            background:none;
            border:none;
            border-bottom:1px solid #434a52;
            border-radius:0;
            box-shadow:none;
            outline:none;
            color:inherit;
            }

            .btn-primary {
            background:#214a80;
            border:none;
            border-radius:4px;
            padding:11px;
            box-shadow:none;
            margin-top:26px;
            text-shadow:none;
            outline:none;
            } 

            .btn-primary:hover, .btn-primary:active {
            background:#214a80;
            outline:none;
            }

            .forgot {
            display:block;
            text-align:center;
            font-size:12px;
            color:#6f7a85;
            opacity:0.9;
            ${'' /* text-decoration:none; */}
            }

            .forgot:hover,.forgot:active {
            opacity:1;
            text-decoration:none;
            }

            .btn-primary:active {
            transform:translateY(1px);
            }
        }

        .illustration {
        text-align:center;
        padding:15px 0 20px;
        font-size:100px;
        color:#2980ef;
        }

        
`
export default Register;