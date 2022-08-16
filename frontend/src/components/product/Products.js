import React, {Fragment, useEffect, useState} from 'react'
import Loader from '../layout/Loader/loader'
import {useDispatch, useSelector} from 'react-redux';
import { getProducts, clearErrors} from '../../ReduxStorage/actions/ProductAction';
import ProductCard from './ProductCard';
import './Products.css';
import { useAlert } from '@blaumaus/react-alert';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Products = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const alert = useAlert();
    const {keyword} = useParams();
    const {products, loading, error, totalPages} = useSelector((state) => state.products);
    const handleChange = (e, value) => {
        setPage(value);
        window.scroll(0, 0);
    }
    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, page));
    }, [dispatch, error, alert, keyword, page]);

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
                    <div className='paginationBox'>
                        <Stack spacing={2}>
                            <Pagination count={totalPages} page={page} onChange={handleChange} />
                        </Stack>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products