import React from 'react'
import {CgMouse} from 'react-icons/all';
import './Home.css';
import Product from '../../product/Product.js';
const product = {
  name : "Blue TShirts",
  images : [{ url : "https://i.ibb.co/DRST11n/1.webp"}],
  price : 3000,
  _id : "sdkfhsk098"
};

const Home = () => {
  return (
      <>
    <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#featuredProduct">
            <button>Scroll <CgMouse></CgMouse></button>
        </a>
    </div>
    <h2 className='homeHeading' id="featuredProduct">Featured Products</h2>
    <div className="container" id="container">
      <Product product={product}></Product>
      <Product product={product}></Product>
      <Product product={product}></Product>
      <Product product={product}></Product>
      <Product product={product}></Product>
      <Product product={product}></Product>
      <Product product={product}></Product>
      <Product product={product}></Product>
    </div>
    </>
  )
}

export default Home