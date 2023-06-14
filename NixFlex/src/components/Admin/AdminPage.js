import {React, useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import mova from'../../assets/images/mova.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import 'bootstrap/dist/js/bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBars, FaComment, FaDoorOpen, FaExclamation, FaSignal, FaUser } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";

import * as ACTIONS from'../store/action'
import AdminDashboard from "./Dashboard";
import AdminUsers from "./Users";
import AdminPayments from "./Payments";
import AdminComment from "./Comment";

function AdminPage(props)
{
    const [section, setSection] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        props.onShowNavbar(false);
        props.onShowFooter(false);

      }, []);
    
      const [isSidebarHidden, setIsSidebarHidden] = useState(false);
      const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
      
      const handleDropdownClick = (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        e.currentTarget.nextElementSibling.classList.toggle('show');
      };
    
      const handleProfileClick = () => {
        const dropdownProfile = document.querySelector('nav .profile .profile-link');
        dropdownProfile.classList.toggle('show');
      };
    
      const handleOutsideClick = (e) => {
        const imgProfile = document.querySelector('nav .profile img');
        const allMenu = document.querySelectorAll('main .content-data .head .menu');
        const dropdownProfile = document.querySelector('nav .profile .profile-link');
        const allSideDivider = document.querySelectorAll('#sidebar .divider');
    
        if (e.target !== imgProfile) {
          if (e.target !== dropdownProfile) {
            if (dropdownProfile.classList.contains('show')) {
              dropdownProfile.classList.remove('show');
            }
          }
        }
    
        allMenu.forEach((item) => {
          const icon = item.querySelector('.icon');
          const menuLink = item.querySelector('.menu-link');
    
          if (e.target !== icon) {
            if (e.target !== menuLink) {
              if (menuLink.classList.contains('show')) {
                menuLink.classList.remove('show');
              }
            }
          }
        });
    
        if (isSidebarHidden) {
          allSideDivider.forEach((item) => {
            item.textContent = item.dataset.text;
          });
    
          allDropdown.forEach((item) => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
          });
        } else {
          allSideDivider.forEach((item) => {
            item.textContent = '-';
          });
        }
      };
    
      const handleToggleSidebarClick = () => {
        setIsSidebarHidden(!isSidebarHidden);
    
        const allSideDivider = document.querySelectorAll('#sidebar .divider');
        allSideDivider.forEach((item) => {
          if (isSidebarHidden) {
            item.textContent = item.dataset.text;
          } else {
            item.textContent = '-';
          }
        });
    
        allDropdown.forEach((item) => {
          const a = item.parentElement.querySelector('a:first-child');
          a.classList.remove('active');
          item.classList.remove('show');
        });
      };
    
      const allProgress = document.querySelectorAll('main .card .progress');
      allProgress.forEach((item) => {
        item.style.setProperty('--value', item.dataset.value);
      });
    
      const allMenu = document.querySelectorAll('main .content-data .head .menu');
      allMenu.forEach((item) => {
        const icon = item.querySelector('.icon');
        const menuLink = item.querySelector('.menu-link');
    
        icon.addEventListener('click', () => {
          menuLink.classList.toggle('show');
        });
      });  
      const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/admin/login')
        dispatch(ACTIONS.UserLogout())
      }
    return(
        <AdminPanel>
            <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
                <div href="#" className="brand" style={{color: "#173143",padding: "0px 12px"}}>
                    <img className="me-4" style={{width: 42,}} src={mova}/>
                        ADMIN
                </div>
                  
                <ul className="side-menu">
                    <li><a className={section == 0 ? "active":""} onClick={()=> setSection(0)}><FaExclamation className="icon"/> Regulations</a></li>
                    <li><a className={section == 1 ? "active":""} onClick={()=> setSection(1)}><FaUser className="icon"/>Users</a></li>
                    <li><a className={section == 2 ? "active":""} onClick={()=> setSection(2)}><FaCreditCard className="icon"/>Payments</a></li>
					<li><a className={section == 3 ? "active":""} onClick={()=> setSection(3)}><FaComment className="icon"/>Comments</a></li>
                    <li><a onClick={handleLogout}><FaDoorOpen className="icon"/>Logout</a></li>
                </ul>
            
            </section>
            <section id="content">
            <nav onClick={handleOutsideClick}>
                <FaBars onClick={handleToggleSidebarClick}/>
            </nav>
                {	
					section === 0 ? 
					<AdminDashboard/>
					: (
						section === 1 ?
						<AdminUsers/>
						: (
							section === 2 ?
							<AdminPayments/>
							:  (
								section === 3 ?
								<AdminComment/>
								: <AdminDashboard/>
							)
						)
					)
                }
                
            </section>


        </AdminPanel>
        
    )   

    
     
}


const AdminPanel = styled.div`
    

:root {
	--grey: #F1F0F6;
	--dark-grey: #8D8D8D;
	--light: #fff;
	--dark: #000;
	--green: #81D43A;
	--light-green: #E3FFCB;
	--blue: #1775F1;
	--light-blue: #D0E4FF;
	--dark-blue: #0C5FCD;
	--red: #FC3B56;
}

html {
	overflow-x: hidden;
}

body {
	background: var(--grey);
	overflow-x: hidden;
}

a {
	text-decoration: none;
}

li {
	list-style: none;
}
/* sidebar */
#sidebar {
	position: fixed;
	max-width: 260px;
	width: 100%;
	background: var(--light);
	top: 0;
	left: 0;
	height: 100%;
	overflow-y: auto;
	scrollbar-width: none;
	transition: all  .3s ease;
	z-index: 200;
	
}
#sidebar.hide {
	max-width: 60px;
}
#sidebar.hide:hover {
	max-width: 260px;
}
#sidebar::-webkit-scrollbar {
	display: none;
}
#sidebar .brand {
	font-size: 20px;
	display: flex;
	align-items: center;
	height: 64px;
	font-weight: 700;
	color: var(--blue);
	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;
	background: var(--light);
	transition: all .3s ease;
	}
#sidebar .icon {
	min-width: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 6px;
}
#sidebar .icon-right {
	margin-left: auto;
	transition: all .3s ease;
}
#sidebar .side-menu {
	margin: 36px 0;
	padding: 0 20px;
	transition: all .3s ease;
	
}
#sidebar.hide .side-menu {
	padding: 0 6px;
}
#sidebar.hide:hover .side-menu {
	padding: 0 20px;
}
#sidebar .side-menu a {
	display: flex;
	align-items: center;
	font-size: 14px;
	color: var(--dark);
	padding: 12px 16px 12px 0;
	transition: all .3s ease;
	border-radius: 10px;
	margin: 4px 0;
	white-space: nowrap;
    cursor: pointer;
}
#sidebar .side-menu > li > a:hover {
	background: var(--grey);
}
#sidebar .side-menu > li > a.active .icon-right {
	transform: rotateZ(90deg);
}
#sidebar .side-menu > li > a.active,
#sidebar .side-menu > li > a.active:hover {
	background:  var(--red);
	color: var(--light);
}
#sidebar .divider {
	margin-top: 24px;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 700;
	color: var(--dark-grey);
	transition: all .3s ease;
	white-space: nowrap;
}
#sidebar.hide:hover .divider {
	text-align: left;
}
#sidebar.hide .divider {
	text-align: center;
}
#sidebar .side-dropdown {
	padding-left: 54px;
	max-height: 0;
	overflow-y: hidden;
	transition: all .4s ease;
}
#sidebar .side-dropdown.show {
	max-height: 1000px;
}
#sidebar .side-dropdown a:hover {
	color: var(--red);
}
#sidebar .ads {
	width: 100%;
	padding: 20px;
}
#sidebar.hide .ads {
	display: none;
}
#sidebar.hide:hover .ads {
	display: block;
}
#sidebar .ads .wrapper {
	background: var(--grey);
	padding: 20px;
	border-radius: 10px;
}

/* SIDEBAR */





/* CONTENT */
#content {
	position: relative;
	width: calc(100% - 260px);
	left: 260px;
	transition: all .3s ease;
}
#sidebar.hide + #content {
	width: calc(100% - 60px);
	left: 60px;
}
/* NAVBAR */
nav {
	background: var(--light);
	height: 64px;
	padding: 0 20px;
	display: flex;
	align-items: center;
	grid-gap: 28px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;
}
nav .toggle-sidebar {
	font-size: 18px;
	cursor: pointer;
}
nav form {
	max-width: 400px;
	width: 100%;
	margin-right: auto;
}
nav .form-group {
	position: relative;
}
nav .form-group input {
	width: 100%;
	background: var(--grey);
	border-radius: 5px;
	border: none;
	outline: none;
	padding: 10px 36px 10px 16px;
	transition: all .3s ease;
}
nav .form-group input:focus {
	box-shadow: 0 0 0 1px var(--blue), 0 0 0 4px var(--light-blue);
}
nav .form-group .icon {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 16px;
	color: var(--dark-grey);
}
nav .nav-link {
	position: relative;
}
nav .nav-link .icon {
	font-size: 18px;
	color: var(--dark);
}
nav .nav-link .badge {
	position: absolute;
	top: -12px;
	right: -12px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--light);
	background: var(--red);
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--light);
	font-size: 10px;
	font-weight: 700;
}
nav .divider {
	width: 1px;
	background: var(--grey);
	height: 12px;
	display: block;
}
nav .profile {
	position: relative;
}
nav .profile img {
	width: 36px;
	height: 36px;
	border-radius: 50%;
	object-fit: cover;
	cursor: pointer;
}
nav .profile .profile-link {
	position: absolute;
	top: calc(100% + 10px);
	right: 0;
	background: var(--light);
	padding: 10px 0;
	box-shadow: 4px 4px 16px rgba(0, 0, 0, .1);
	border-radius: 10px;
	width: 160px;
	opacity: 0;
	pointer-events: none;
	transition: all .3s ease;
}
nav .profile .profile-link.show {
	opacity: 1;
	pointer-events: visible;
	top: 100%;
}
nav .profile .profile-link a {
	padding: 10px 16px;
	display: flex;
	grid-gap: 10px;
	font-size: 14px;
	color: var(--dark);
	align-items: center;
	transition: all .3s ease;
}
nav .profile .profile-link a:hover {
	background: var(--grey);
}
/* navbar */



/* main */
main {
	width: 100%;
	padding: 24px 20px 20px 20px;
}
main .title {
	font-size: 28px;
	font-weight: 600;
	margin-bottom: 10px;
}
main .breadcrumbs {
	display: flex;
	grid-gap: 6px;
}
main .breadcrumbs li,
main .breadcrumbs li a {
	font-size: 14px;
}
main .breadcrumbs li a {
	color: var(--blue);
}
main .breadcrumbs li a.active,
main .breadcrumbs li.divider {
	color: var(--dark-grey);
	pointer-events: none;
}
main .info-data {
	margin-top: 36px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	grid-gap: 20px;
}
main .info-data .card {
	padding: 20px;
	border-radius: 10px;
	background: var(--light);
	box-shadow: 4px 4px 16px rgba(0, 0, 0, .05);
}
main .card .head {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
main .card .head h2 {
	font-size: 24px;
	font-weight: 600;
}
main .card .head p {
	font-size: 14px;
}
main .card .head .icon {
	font-size: 40px;
	color: var(--red);
}
main .card .head .icon.down {
	color: var(--red);
}
main .card .progress {
	display: block;
	margin-top: 24px;
	height: 10px;
	width: 100%;
	border-radius: 10px;
	background: var(--grey);
	overflow-y: hidden;
	position: relative;
	margin-bottom: 4px;
}
main .card .progress::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background: var(--blue);
	width: var(--value);
}
main .card .label {
	font-size: 14px;
	font-weight: 700;
}
main .data {
	display: flex;
	grid-gap: 20px;
	margin-top: 20px;
	flex-wrap: wrap;
}
main .data .content-data {
	flex-grow: 1;
	flex-basis: 400px;
	padding: 20px;
	background: var(--light);
	border-radius: 10px;
	box-shadow: 4px 4px 16px rgba(0, 0, 0, .1);
}
main .content-data .head {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
}
main .content-data .head h3 {
	font-size: 20px;
	font-weight: 600;
}
main .content-data .head .menu {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
main .content-data .head .menu .icon {
	cursor: pointer;
}
main .content-data .head .menu-link {
	position: absolute;
	top: calc(100% + 10px);
	right: 0;
	width: 140px;
	background: var(--light);
	border-radius: 10px;
	box-shadow: 4px 4px 16px rgba(0, 0, 0, .1);
	padding: 10px 0;
	z-index: 100;
	opacity: 0;
	pointer-events: none;
	transition: all .3s ease;
}
main .content-data .head .menu-link.show {
	top: 100%;
	opacity: 1;
	pointer-events: visible;
}
main .content-data .head .menu-link a {
	display: block;
	padding: 6px 16px;
	font-size: 14px;
	color: var(--dark);
	transition: all .3s ease;
}
main .content-data .head .menu-link a:hover {
	background: var(--grey);
}
main .content-data .chart {
	width: 100%;
	max-width: 100%;
	overflow-x: auto;
	scrollbar-width: none;
}
main .content-data .chart::-webkit-scrollbar {
	display: none;
}

main .chat-box {
	width: 100%;
	max-height: 360px;
	overflow-y: auto;
	scrollbar-width: none;
}
main .chat-box::-webkit-scrollbar {
	display: none;
}
main .chat-box .day {
	text-align: center;
	margin-bottom: 10px;
}
main .chat-box .day span {
	display: inline-block;
	padding: 6px 12px;
	border-radius: 20px;
	background: var(--light-blue);
	color: var(--blue);
	font-size: 12px;
	font-weight: 600;
}
main .chat-box .msg img {
	width: 28px;
	height: 28px;
	border-radius: 50%;
	object-fit: cover;
}
main .chat-box .msg {
	display: flex;
	grid-gap: 6px;
	align-items: flex-start;
}
main .chat-box .profile .username {
	font-size: 14px;
	font-weight: 600;
	display: inline-block;
	margin-right: 6px;
}
main .chat-box .profile .time {
	font-size: 12px;
	color: var(--dark-grey);
}
main .chat-box .chat p {
	font-size: 14px;
	padding: 6px 10px;
	display: inline-block;
	max-width: 400px;
	line-height: 150%;
}
main .chat-box .msg:not(.me) .chat p {
	border-radius: 0 5px 5px 5px;
	background: var(--blue);
	color: var(--light);
}
main .chat-box .msg.me {
	justify-content: flex-end;
}
main .chat-box .msg.me .profile {
	text-align: right;
}
main .chat-box .msg.me p {
	background: var(--grey);
	border-radius: 5px 0 5px 5px;
}
main form {
	margin-top: 6px;
}
main .form-group {
	width: 100%;
	display: flex;
	grid-gap: 10px;
}
main .form-group input {
	flex-grow: 1;
	padding: 10px 16px;
	border-radius: 5px;
	outline: none;
	background: var(--grey);
	border: none;
	transition: all .3s ease;
	width: 100%;
}
main .form-group input:focus {
	box-shadow: 0 0 0 1px var(--blue), 0 0 0 4px var(--light-blue);
}
main .btn-send {
	padding: 0 16px;
	background: var(--blue);
	border-radius: 5px;
	color: var(--light);
	cursor: pointer;
	border: none;
	transition: all .3s ease;
}
main .btn-send:hover {
	background: var(--dark-blue);
}







@media screen and (max-width: 768px) {
	#content {
		position: relative;
		width: calc(100% - 60px);
		transition: all .3s ease;
	}
	nav .nav-link,
	nav .divider {
		display: none;
	}
}

.imglogo
{
	display: block;
	margin-left: -20px;
	margin-right: -8px;
	width: 104px;
	
	
	
	
}

        
`
export default AdminPage;