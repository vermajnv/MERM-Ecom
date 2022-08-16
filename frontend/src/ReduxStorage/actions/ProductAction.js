import axios from 'axios';

import {ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR} from '../constants/ProductConstants';

export const getProducts = (keyword = "", page = 1 ) => async (dispatch) => {
     try {
        dispatch({
            type : ALL_PRODUCT_REQUEST
        });
        let link = `/api/v1/product?keyword=${keyword}&page=${page}`;
        const {data} = await axios.get(link);
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        });
     } catch (error) {
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message
        });
     }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERROR
    })
}