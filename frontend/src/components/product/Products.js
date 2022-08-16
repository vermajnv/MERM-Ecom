import React, {Fragment, useEffect, useState} from 'react'
import Loader from '../layout/Loader/loader'
import {useDispatch, useSelector} from 'react-redux';
import { getProducts, clearErrors} from '../../ReduxStorage/actions/ProductAction';
import ProductCard from './ProductCard';
import './Products.css';
import { useAlert } from '@blaumaus/react-alert';
import { useParams } from 'react-router-dom';
import {Pagination, Stack, Slider, Typography} from '@mui/material';
// import Stack from '@mui/material/Stack';
// import Slider from '@mui/material/Slider';

const Products = () => {
    const [page, setPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const dispatch = useDispatch();
    const alert = useAlert();
    const {keyword} = useParams();
    const {products, loading, error, totalPages} = useSelector((state) => state.products);
    const handleChange = (e, value) => {
        setPage(value);
        window.scroll(0, 0);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, page, price));
    }, [dispatch, error, alert, keyword, page, price]);
    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <h2 className='productHeading'>Products</h2>
                    <div className="productContainer">
                        {products && products.map((product) => (
                            <ProductCard product={product}></ProductCard>
                        )) }
                    </div>
                    <div className="filterBox">
                        <Typography>
                            Price
                        </Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            min={0}
                            max={25000}
                            size="small"
                        />
                    </div>
                    {totalPages > 1 && (
                    <div className='paginationBox'>
                        <Stack spacing={2}>
                            <Pagination count={totalPages} page={page} onChange={handleChange} />
                        </Stack>
                    </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products