
import * as Types from'../type';
const reducerMoviesInitialState={

        NetflixOriginals:null,
        TrendingMovies:null,
        TopRatedMovies:null,
        ActionMovies:null,
        ComedyMovies:null,
        HorrorMovies:null,
        RomanceMovies:null,
        Documentaries:null,
        MovieDetail:null,
        SearchMovies:null,
        setMovieCard:null,
        Cart:[],
        ikey:null,
        RecommendMovies:null,
        MovieWatch:null,
        ExploreMovie:null,

}

const reducerMovies=(state = reducerMoviesInitialState ,action)=>
{
     const {type ,payload}=action
    
    switch(type)
    {
        case Types.GET_EXPLORE_MOVIE_PAGE:
            return {...state, ExploreMovie: payload}
            
        case Types.GET_NETFLIX_ORIGINALS:

            return{...state,NetflixOriginals:payload}   
         
        case Types.GET_TRENDING_MOVIES:

            return{...state,TrendingMovies:payload}    
        
        case Types.GET_TOP_RATED_MOVIES:

            return{...state,TopRatedMovies:payload}
        case Types.GET_ACTION_MOVIES:

            return{...state,ActionMovies:payload}
        case Types.GET_COMEDY_MOVIES:

            return{...state,ComedyMovies:payload}
        case Types.GET_HORROR_MOVIES:

            return{...state,HorrorMovies:payload}   
        case Types.GET_ROMANCE_MOVIES:

                return{...state,RomanceMovies:payload}      
        case Types.GET_DOCUMENTARIES_MOVIES:

                    return{...state,Documentaries:payload}     
        case Types.GET_MOVIE_WATCH:
            return {...state, MovieWatch: payload}
        case Types.SET_MOVIE_DETAIL:
                   
                return{...state,MovieDetail:payload} 
        case Types.GET_SEARCH_MOVIES:
                   
                return{...state,SearchMovies:payload}    
        case Types.SET_MOVIE_CARD:
                const exist = state.Cart.find(movie => movie.id === payload.id);
                if(exist == null)
                    state.Cart.push(payload)
                return{...state,setMovieCard:payload}    
        case Types.DELETE_ALL_MOVIE_CART:
            return {...state,Cart: []}
        case Types.DELETE_MOVIE_CART:
            
             return{...state,Cart:state.Cart.filter(item=>{
                    
                return item.id!==state.Cart[payload].id
                   
            })}  
        case Types.GET_RECOMMEND_MOVIES:
                   
                return{...state,RecommendMovies:payload}  
                
        case Types.RESET_STATE:
            return (reducerMoviesInitialState)

        default:
            return state
            
    }
    
}
export default reducerMovies;