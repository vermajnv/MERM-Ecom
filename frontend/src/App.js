import './App.css';
import React from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/layout/Home/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/search/Search';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import WebFont from 'webfontloader';

function App() {
    React.useEffect(() => {
        WebFont.load({
            google : {
                families : ["Roboto", "Droid Sans", "Chilanka"]
            }
        })
    }, []);

    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route exact path="/" element={<Home></Home>}>

                </Route>
                <Route exact path='/product/:id' element={<ProductDetails></ProductDetails>}></Route>
                <Route exact path='/products' element={<Products></Products>}></Route>
                <Route exact path='/search' element={<Search></Search>}></Route>
            </Routes>
            <Footer></Footer>
        </Router>
    );
}

export default App;
