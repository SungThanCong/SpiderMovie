import {React, useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import background from'../../assets/images/admin_background.jpg';
import mova from'../../assets/images/mova.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import * as ACTIONS from'../store/action'

function AdminLogin(props)
{
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        props.onShowNavbar(false);
        props.onShowFooter(false);

      }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/admin/token/", {
                username,
                password,
            });
            if(response.status === 200){
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                localStorage.setItem("role", response.data.role);

                window.location=  `/admin/index`

            }else{
                
                toast.error('Username or password is not correct!', {
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
             
            toast.error('Username or password is not correct!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        }
    };

    return(
        <LoginForm>
            
            <form onSubmit={handleSubmit}>
                <h2 className="sr-only">ADMIN</h2>
                <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                <div className="form-group"><input className="form-control" type="text" name="username" placeholder="Username" onChange={(e)=> setUsername(e.target.value)} required/></div>
                <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required/></div>
                <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Log In</button></div>
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
    display: block;
    height:100vh;
    background:#475d62 url(${background});
    background-size:cover;
    position:relative;
        
        form {
        max-width:320px;
        width:90%;
        background-color: rgba(0,0,0,0.3);
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
export default AdminLogin;