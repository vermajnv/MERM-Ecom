import {
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    CLEAR_ERROR
} from '../constants/UserConstants';

export const userReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                loading : true,
                isAuthenticated : false
            };
        case LOGIN_SUCCESS : 
        case REGISTER_SUCCESS :
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload
            };
        case LOGIN_FAILURE : 
        case REGISTER_FAILURE :
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user : null,
                error : action.payload
            };
        case CLEAR_ERROR : 
            return {
                ...state,
                loading : false,
                error : null
            }
        default:
            return state;
    }
};