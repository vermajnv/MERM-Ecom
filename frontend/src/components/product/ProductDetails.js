import React, { Fragment, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { productReducer } from '../../../ReduxStorage/reducers/ProductReducer';
import { Carousel } from 'react-responsive-carousel';
import './ProductDetails.css';
import {useDispatch, useSelector} from 'react-redux';
import {getProductDetails} from '../../ReduxStorage/actions/ProductDetailsAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ProductDetails = () => {

    const {id} = useParams();
    
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state) => state.productDetail)
    const options = {
        count: 5,
        size : window.innerWidth > 600 ? 25 : 20,
        activeColor : "tomato",
        edit : false,
        value : product.ratings,
        isHalf : true,
        color : "rgba(20, 20, 20, 0.1)"
    };
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id]);
    
  return ( 
    <Fragment>
        <div className="productDetails">
            <div>
                <Carousel width={'40%'} showThumbs={false}>
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
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options}></ReactStars>
                    <span> ({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`\u20B9${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input type="number" value="1"/>
                            <button>+</button>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status :
                        <b className={product.stock >= 1 ? 'greenColor' : 'redColor'}>
                            {product.stock >= 1 ? ' In Stock' : ' Out of Stock'}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                </div>
                <button className="submitReview">
                    Submit Review
                </button>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails