import React, {Fragment, useEffect, useState} from 'react'
import Loader from '../layout/Loader/loader'
import {useDispatch, useSelector} from 'react-redux';
import { getProducts, clearErrors} from '../../ReduxStorage/actions/ProductAction';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import './Products.css';
import { useAlert } from '@blaumaus/react-alert';
import { useParams } from 'react-router-dom';
import {Pagination, Stack, Slider, Typography} from '@mui/material';

const categories = ['Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones', 'PC'];

const Products = () => {
    const [page, setPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
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
        dispatch(getProducts(keyword, page, price, category, ratings));
    }, [dispatch, error, alert, keyword, page, price, category, ratings]);
    return (
        <Fragment>
            <MetaData title="Products"></MetaData>
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

                        <Typography>
                            Categories
                        </Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li onClick={() => setCategory(category)} className='category-link' key={category}>{category}</li> 
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">
                                Ratings Above
                            </Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => { setRatings(newRating)}}
                                area-labelledby="Default"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                                size='small'
                            >

                            </Slider>
                        </fieldset>
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