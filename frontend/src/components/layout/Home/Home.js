import {CgMouse} from 'react-icons/all';
import './Home.css';
import Product from '../../product/Product.js';
import MetaData from '../MetaData';
import { getProducts } from '../../../ReduxStorage/actions/ProductAction';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import Loader from '../Loader/loader';

const Home = () => {
  const dispatch = useDispatch();
  const {loading, products, productsCount, error} = useSelector(state => state.products)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  return (
    <>
    {loading ? (<Loader></Loader>) : (
      <>
      <MetaData title="Home Page"></MetaData>
      <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
          <a href="#featuredProduct">
              <button>Scroll <CgMouse></CgMouse></button>
          </a>
      </div>
      <h2 className='homeHeading' id="featuredProduct">Featured Products</h2>
      <div className="container" id="container">
        {
          products && products.map(product => (
            <Product product={product} key={product._id}></Product>
          ))
        }
      </div>
    </>
    )}
    </>
  )
}

export default Home