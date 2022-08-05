import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './Product.css';


const Product = ({product}) => {
  const options = {
      count: 5,
      size : window.innerWidth > 600 ? 25 : 20,
      activeColor : "tomato",
      edit : false,
      value : product.ratings,
      isHalf : true,
      color : "rgba(20, 20, 20, 0.1)"
  };
  return (
    <Link className="productCard" to={`product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options}></ReactStars>
          <span> ({product.numOfReviews} Reviews)</span>
        </div>
        
        <span>{`\u20B9${product.price}`}</span>
    </Link>
  )
}

export default Product