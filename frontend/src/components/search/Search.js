import React, { useState } from 'react'
import './Search.css';
import {useNavigate} from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {
    const [keyword, setKeyword] = useState({});
    let navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        (keyword.trim()) ? navigate(`/products/${keyword}`) : navigate('/products'); 
    }
    return (
        <>
            <MetaData title="Search a product"></MetaData>
            <form action="" onSubmit={searchSubmitHandler} className='searchBox'>
                <input 
                    type="text" 
                    placeholder='Search a Product' 
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="search" />
            </form>
        </>
    )
}

export default Search