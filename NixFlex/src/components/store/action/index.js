//import { type } from "@testing-library/user-event/dist/type";
import axios from "axios"; 
import * as Types from '../type';
import axiosAuth from "../../../utils/axiosAuth";


// const API_KEY='5bdccc5981534661a014ffd5e0b8b32c'

const BASE_URL='http://127.0.0.1:8000/api';

export const getNetflixOriginals=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/`
        );
        dispatch({type: Types.GET_NETFLIX_ORIGINALS ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Netflix API:' ,error);
    }
}
export const getTrendingMovies=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/trending/`
        );
        dispatch({type: Types.GET_TRENDING_MOVIES ,payload :result.data})

    }
    catch(error)
    {
        console.log('Get Trending API:' ,error);
    }
}
export const getTopRatedMovies=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/toprate/`
        );
        dispatch({type: Types.GET_TOP_RATED_MOVIES ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Top Rated API:' ,error);
    }
}
export const getActionMovies=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/category/1`
        );
        dispatch({type: Types.GET_ACTION_MOVIES ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Action API:' ,error);
    }
}
export const getComedyMovies=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/category/3`
        );
        dispatch({type: Types.GET_COMEDY_MOVIES ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Comedy API:' ,error);
    }
}
export const getHorrorMovies=() => async dispatch =>{

    try{
        const result= await axios.get(
            `${BASE_URL}/movies/category/2`
        );
        dispatch({type: Types.GET_HORROR_MOVIES ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Horror API:' ,error);
    }
}
export const getRomanceMovies=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/category/4`
        );
        dispatch({type: Types.GET_ROMANCE_MOVIES ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Romance API:' ,error);
    }
}
export const getDocumentaries=() => async dispatch =>{

    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/category/5`
        );
        dispatch({type: Types.GET_DOCUMENTARIES_MOVIES ,payload :result.data})
    }
    catch(error)
    {
        console.log('Get Documentaries API:' ,error);
    }
}
export const getMovieWatch= (id) => async dispatch =>{
    try{
     
        const result= await axios.get(
            `${BASE_URL}/movies/${id}`
        );
        dispatch({type:Types.GET_MOVIE_WATCH, payload:result.data})
    }
    catch(error)
    {
        console.log('Get movie API:' ,error);
    }
}
export const setMovieDetail= (movie) => dispatch =>{
    dispatch({type:Types.SET_MOVIE_DETAIL, payload:movie})

}
export const getSearchMovies=(keyword) => async (dispatch) =>{

    try {
        const result = await axios.get(
            `
            ${BASE_URL}/movies/search/${keyword}/`
        )
        dispatch({type:Types.GET_SEARCH_MOVIES, payload : result.data})
    } catch (error) {
        console.log('Get Search API:' ,error);
    }
}
export const getRecommendMovies=(id,name) => async (dispatch) =>{
    try {
        const result = await axios.get( 
            `
            ${BASE_URL}/movies/`
        )
        dispatch({type:Types.GET_RECOMMEND_MOVIES, payload : result.data})
    } catch (error) {
        console.log('Get Recommend API:' ,error);
    }
}

export const getExploreMovieInPage = (page) => async (dispatch) => {
    try{
        const result = await axios.get(`${BASE_URL}/movies/list?page=${page}`)
        dispatch({type:Types.GET_EXPLORE_MOVIE_PAGE, payload :  {...result.data, current:{page}}})
    }catch(error){
        console.log("Explore movie API" + error);
    }
}

export const setMovieCard= (movie) => dispatch =>{
     
    dispatch({type:Types.SET_MOVIE_CARD, payload:movie})
    
}

export const DeleteAllMovieCart= () => dispatch =>{
     
    dispatch({type:Types.DELETE_ALL_MOVIE_CART, payload:null})
    
}

export const DeleteMovieCart= (key) => dispatch =>{
     
    dispatch({type:Types.DELETE_MOVIE_CART, payload:key})
    
}


export const GetInfoUserLogin= () => async dispatch => {
    try{
        const result= await axiosAuth.get(
            `${BASE_URL}/auth/getInfo/`
        );
        if (result.status === 200) {
            const data = result.data
            dispatch({ type: Types.LOGIN, payload: data})

            dispatch(GetMyMovies())
          } else {
          
          }
    }catch(error){
        console.log("Error: "+error);
    }
   
}

export const SetInfoUser= () => async dispatch => {
    try{
        const result= await axiosAuth.get(
            `${BASE_URL}/auth/getInfo/`
        );
        if (result.status === 200) {
            const data = result.data
            dispatch({ type: Types.LOGIN, payload: data})

          } else {
          
          }
    }catch(error){
        console.log("Error: "+error);
    }
   
}


export const GetMyMovies = () => async dispatch => {
    const my_movies = await axiosAuth.get(
        `${BASE_URL}/payment/user/`
    );
    if(my_movies != null)
        dispatch({ type: Types.GET_MY_MOVIES, payload: my_movies.data})
    else
        dispatch({ type: Types.GET_MY_MOVIES, payload: null})
}

export const UserLogout= () => async dispatch => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("role")

    dispatch({type: Types.LOGOUT})
}

