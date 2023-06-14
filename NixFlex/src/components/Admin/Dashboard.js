import {React, useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import mova from'../../assets/images/mova.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
// import 'modernizr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBars, FaDoorOpen, FaSignal, FaUser } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ACTIONS from'../store/action'

function AdminDashboard(props)
{
   
    return(
       
            <main className="p-5">
                <h4>1. Member management: </h4>
                <p>MOD is responsible for managing member registrations and handling accounts that violate the website's rules. MOD can also block a member's account if any violations are found.</p>
                <h4>2. Content management: </h4>
                <p>MOD is responsible for reviewing comments and messages from members to ensure that there is no illegal, obscene, violent, provocative, or offensive content. MOD can also delete comments or information that violates the website's rules.</p>
                <h4>3. Dispute resolution: </h4>
                <p>MOD is responsible for resolving disputes between members on the website and ensuring that the forum is always a respectful and civilized environment.</p>
                <h4>4. Rule management: </h4>
                <p>MOD is responsible for maintaining and enforcing the rules of the website, including rules regarding registration, login, security, and prohibitions against illegal activities or violations of the website's rules.</p>
                <h4>5. Creating interaction: </h4>
                <p>MOD is responsible for creating activities, events, contests, and discussions to create interaction between members on the website and keep the forum lively and attractive to many people.</p>
                <h4>6. Technical management: </h4>
                <p>MOD is responsible for helping members use the website, answering technical questions, and reporting errors or technical issues to the administrator for correction.</p>
                <h4>7. Activity monitoring: </h4>
                <p>MOD is responsible for monitoring the activities of members on the website and reporting violations of regulations or laws to the administrator.</p>
                <h4>8. Protecting privacy: </h4>
                <p>MOD is responsible for protecting the privacy of members on the website and not disclosing personal information of members to anyone other than the administrator or authorized law enforcement agencies.</p>
                <h4>9. Ensuring website safety: </h4>
                <p>MOD is responsible for ensuring the safety of the website and preventing attacks, hacks, or destruction of the website.</p>
                <h5>MOD must comply with these regulations and play an important role in maintaining a civilized, polite, and safe website environment for all members.</h5>

                </main>
    )
}
export default AdminDashboard;
