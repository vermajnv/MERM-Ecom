import React, { useState } from 'react'
import './Navbar.css';
import { FaBars } from "react-icons/fa";
import { MdShoppingCart, MdSearch, MdPersonOutline } from "react-icons/md";

const Navbar = () => {
    const [isToggledOverlay, setToggledOverlay] = useState(false);

    function toggleOverlay()
    {
        setToggledOverlay(!isToggledOverlay);
        document.body.classList.toggle('body-overflow');
    }
  return (
    <div className={isToggledOverlay ? 'wrapper wrapper-overlay' : 'wrapper'}>
        <div className='menu-btn' onClick={toggleOverlay}> 
            <FaBars></FaBars>
        </div>
        <div className='navIcon'>
            <MdPersonOutline></MdPersonOutline>
            <MdSearch></MdSearch>
            <MdShoppingCart></MdShoppingCart>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Product</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/search">Search</a></li>
        </ul>
    </div>
  )
}

export default Navbar