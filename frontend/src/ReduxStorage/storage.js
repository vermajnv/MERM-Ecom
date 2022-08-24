import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import {productReducer} from './reducers/ProductReducer';
import { productDetailsReducer } from './reducers/ProductDetailsReducer';
import { userReducer } from './reducers/UserReducer';

const reducer = combineReducers({
    products : productReducer,
    productDetail : productDetailsReducer,
    user : userReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;