import React from "react";
import '../../utils/comment.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import axiosAuth from "../../utils/axiosAuth";

export default Comment = (props) => {
    const {Information} = useSelector(state => state.user)
    const [comment, setComment] = useState([]);
    const [countComment, setCountComment] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState(Information.avatar_url)
    const [userid, setUserId] = useState(Information.id)
    const [content, setContent] = useState("")
    const [username, setUsername] = useState(Information.username)

    const dispatch = useDispatch();

    useEffect(() => {
     
        axios.get(`http://127.0.0.1:8000/api/evaluate/comment/${props.id}`).then(response => {
            if(response.status === 200 && response.data.length > 0){
                
                setComment(response.data)
                setCountComment(response.data.length)
            }
         
        })
      }, []);

    
    const handlePostComment = (e) => {
        e.preventDefault();

        var newMess = {
            user: {
                avatar_url: avatarUrl,
                username: username,
            },
            content: content,
            post_time: new Date().toISOString()
        }
        axiosAuth.post(`http://127.0.0.1:8000/api/evaluate/comment/add/`, {
            user: userid,
            content: content,
            movie: props.id,
        }).then(response => {
            if(response.status === 200){
                setComment([newMess, ...comment])
                setCountComment(countComment+1)
                setContent("")
            }
         
        })


     
    }
    
    return (
        <div className="content-item" id="comments">
            <div className="container">   
                <div className="row">
                    <div className="col-12">   
                        <form onSubmit={(e) => handlePostComment(e)}>
                            <h3 className="pull-left">New Comment</h3>
                            <fieldset>
                                <div className="row">
                                    <div className="col-sm-3 col-lg-2 hidden-xs">
                                        <img className="img-responsive" style={{width:"100%"}} src={Information.avatar_url == null ?  "https://bootdey.com/img/Content/avatar/avatar1.png" : `http://127.0.0.1:8000${Information.avatar_url}` } alt=""/>
                                    </div>
                                    <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                        <textarea className="form-control" id="message" placeholder="Your message" required onChange={(e)=> setContent(e.target.value)}></textarea>
                                        <button type="submit" className="btn btn-normal pull-right">Submit</button>

                                    </div>
                                </div>  	
                            </fieldset>
                           
                        </form>
                        
                        <h3>{countComment} Comments</h3>
                        
                        <div className="container-main">
                        {
                            comment.map((value, index) => (
                                <div className="media">
                                    <div className="pull-left"><img className="media-object" src={value.user.avatar_url == null ?  "https://bootdey.com/img/Content/avatar/avatar1.png" : `http://127.0.0.1:8000${value.user.avatar_url}`} alt=""/></div>
                                    <div className="media-body">
                                        <h4 className="media-heading">{value.user.username}</h4>
                                        <p>{value.content}</p>
                                        <ul className="list-unstyled list-inline media-detail pull-left">
                                            <li><i className="fa fa-calendar"></i>{value.post_time}</li>
                                        </ul>
                                    
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        
                    
                    </div>
                </div>
            </div>
        </div>
    )
}