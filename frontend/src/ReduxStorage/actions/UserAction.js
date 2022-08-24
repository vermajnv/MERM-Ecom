import { 
    LOGIN_REQUEST,
    LOGIN_FAILURE, 
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE, 
    CLEAR_ERROR 
} from "../constants/UserConstants";
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type : LOGIN_REQUEST,
        });
        const config = {header : {"Content-Type" : "application/json"}};
        const {data} = await axios.post('/api/v1/user/login', {email, password}, config);
        dispatch({
            type : LOGIN_SUCCESS,
            payload : data.user
        });

    } catch (error) {
        dispatch({
            type : LOGIN_FAILURE,
            payload : error.response.data.message
        })
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type : REGISTER_REQUEST
        });
        const config = {headers : {"Content-Type" : "multipart/form-data"}};
        const {data} = await axios.post('/api/v1/user/register', userData, config);

        dispatch({
            type : REGISTER_SUCCESS,
            payload : data.user
        })
    }
    catch(error) {
        dispatch({
            type : REGISTER_FAILURE,
            payload : error.response.data.message
        })
    }
}
export const clearError = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERROR
    });
}