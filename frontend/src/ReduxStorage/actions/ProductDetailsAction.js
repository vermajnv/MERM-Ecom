import axios from 'axios';
import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, CLEAR_ERROR} from '../constants/ProductConstants';

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type : PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch(
            {
                type : PRODUCT_DETAILS_SUCCESS,
                payload : data.product
            }
        );
    } catch (error) {
        console.log(error);
        dispatch(
            {
                type : PRODUCT_DETAILS_FAIL,
                payload : error.response.data.message
            }
        );
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERROR
    })
}