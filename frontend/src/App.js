import './App.css';
import React from 'react';
import Header from './components/layout/Header/Header';
import {BrowserRouter as Router} from "react-router-dom"
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
        </Router>
    );
}

export default App;
