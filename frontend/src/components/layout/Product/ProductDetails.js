import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel';
// import { productReducer } from '../../../ReduxStorage/reducers/ProductReducer';
import './ProductDetails.css';
import {useDispatch, useSelector} from 'react-redux';
import { getProductDetails } from '../../../ReduxStorage/actions/ProductDetailsAction';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state) => state.productDetail)
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id]);
    
  return ( 
    <Fragment>
        <div className="productDetails">
            <div>
                <Carousel>
                    {
                        product.images && product.images.map((item, i) => (
                            <img
                                className='CarouselImage'
                                key={item.url} 
                                src={item.url} 
                                alt={`${i} Slide`} 
                            />
                        ))
                    }
                </Carousel>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails