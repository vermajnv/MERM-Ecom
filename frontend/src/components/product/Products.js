import React, {Fragment, useEffect} from 'react'
import Loader from '../layout/Loader/loader'
import {useDispatch, useSelector} from 'react-redux';
import { getProducts, clearErrors} from '../../ReduxStorage/actions/ProductAction';
import ProductCard from './ProductCard';
import './Products.css';
import { useAlert } from '@blaumaus/react-alert';

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {products, loading, error} = useSelector((state) => state.products);
    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <h2 className='productHeading'>Products</h2>
                    <div className="productContainer">
                        {products && products.map((product) => (
                            <ProductCard product={product}></ProductCard>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products