import {React, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import WatchMovie from "../WatchMovies/WatchMovies";
import MoviesDetail from "../MoviesDetail/MoviesDetail";
import axiosAuth from "../../utils/axiosAuth";
import { useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment";

function Watch(props)
{
    const {RecommendMovies, MovieWatch, MovieDetail } = useSelector(state =>state.infoMovies);
    const [rating, setRating] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()
    const [isShowMovieDetail ,setIsShowMovieDetail]= useState(false)
    
    
    useEffect(()=>{
        setIsShowMovieDetail(MovieDetail ? true :false)
    },[MovieDetail])
    // const {Cart} = useSelector(state =>state.infoMovies);
    // console.log(Cart); 
    useEffect(() =>{
        props.onShowNavbar(true);
        props.onShowFooter(true);
        const result = axiosAuth.post(`http://127.0.0.1:8000/api/payment/check/${MovieWatch.id}`)
        result.then(response => {
            if(response.status === 200) {
                
            axiosAuth.get(`http://127.0.0.1:8000/api/evaluate/rating/user/${MovieWatch.id}`)
            .then(response => {
                
                if(response.status === 200 && response.data.length>0)
                    var value = response.data[0].rating;
                    setRating(value)
               
                }   
               

            )
            }
            else{
                navigate('/')
            }
        })
        .catch(error => {
            console.log(error);


        });
        setIsLoading(false)
    },[])


return(
    
    <div>
    {
        (!isLoading) && (
            <div>
                <WatchMovie movieRecommend={RecommendMovies} movieWatch={MovieWatch}/>
                <Comment id = {MovieWatch.id} rating = {rating} setRating={setRating}/>
                <MoviesDetail movie={MovieDetail} showModal={isShowMovieDetail} />
            </div>
       
        )
    }
 
    
    </div>
)
}

export default Watch;