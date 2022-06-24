import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/appstore.jpg';
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app for Android and IOs mobile phone</p>
        <img src={playStore} alt="PlayStore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="middleFooter">
        <h1>ECCOMMERCE.</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2021 &copy; vermajnv</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/vermajnv">Github</a>
        <a href="https://twitter.com/nayanjnv">Twitter</a>
        <a href="https://www.linkedin.com/in/vermajnv/">LinkedIn</a>
      </div>
    </footer>
  )
}

export default Footer