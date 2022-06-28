import React from 'react'
// import { MdShoppingCart, MdSearch, MdPersonOutline } from "react-icons/md";
// import logo  from '../../../images/logo.png';
import NavBar from '../Navbar/Navbar';
import './Header.css';

export const Header = () => {
  return (
      <div className='headerMaster'>
        <NavBar></NavBar>
        {/* <div className='HeaderIcons'>
          <MdPersonOutline></MdPersonOutline>
          <MdSearch></MdSearch>
          <MdShoppingCart></MdShoppingCart>
        </div> */}
      </div>
  )
}

export default Header;
