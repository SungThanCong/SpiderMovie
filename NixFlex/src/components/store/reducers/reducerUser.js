import * as Types from'../type';

const reducerUserInitialState = {
    Information : null,
    MyListMovie : null,
}

const reducerUser=(state = reducerUserInitialState ,action)=>
{
    const {type , payload}=action
    
    switch(type)
    {
        case Types.LOGIN:
            return {...state, Information: payload}
            

        case Types.GET_MY_MOVIES:
            return {...state, MyListMovie: payload}
        case Types.LOGOUT:
            return {...state, Information: null, MyListMovie: null}
        default:
            return state
    }
    
}
export default reducerUser;