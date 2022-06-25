import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './Product.css';

const options = {
    count: 5,
    size : window.innerWidth > 600 ? 25 : 20,
    activeColor : "tomato",
    edit : false,
    value : 2.5,
    isHalf : true,
    color : "rgba(20, 20, 20, 0.1)"
};

const Product = ({product}) => {
  return (
    <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options}></ReactStars>
          <span> (200 Reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product