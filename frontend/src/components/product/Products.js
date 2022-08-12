import React, {Fragment, useEffect} from 'react'
import Loader from '../layout/Loader/loader'
import {useDispatch, useSelector} from 'react-redux';
import { getProducts} from '../../ReduxStorage/actions/ProductAction';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();

    const {products, loading} = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

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