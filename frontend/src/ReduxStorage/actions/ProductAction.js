import axios from 'axios';

import {ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR} from '../constants/ProductConstants';

export const getProducts = (keyword = "", page = 1, price = [0, 25000], category = "", ratings = 0 ) => async (dispatch) => {
     try {
        dispatch({
            type : ALL_PRODUCT_REQUEST
        });
        let link = `/api/v1/product?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category)
        {
            link = `/api/v1/product?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
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