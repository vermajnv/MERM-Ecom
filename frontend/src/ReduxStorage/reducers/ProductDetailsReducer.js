import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, CLEAR_ERROR} from '../constants/ProductConstants';

export const productDetailsReducer = (state = {product : {}}, action) => {
    switch(action.type) 
    {
        case PRODUCT_DETAILS_REQUEST : 
        return {
            loading : true,
            ...state
        };
        case PRODUCT_DETAILS_SUCCESS : 
        return {
            loading : false,
            product : action.payload
        };
        case PRODUCT_DETAILS_FAIL :
        return {
            loading : false,
            error : action.payload
        };
        case CLEAR_ERROR :
        return {
            ...state,
            error : null
        };
        default :
        return state;
    }
}