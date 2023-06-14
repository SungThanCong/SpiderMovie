import {combineReducers} from 'redux';
import reducerMovies from './reducerMovie';
import reducerUser from './reducerUser';
const rootReducer = combineReducers({
    infoMovies:reducerMovies,
    user: reducerUser
})

export default rootReducer;



