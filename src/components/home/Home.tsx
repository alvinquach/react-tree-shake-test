import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


export const Home = React.memo((props) => {

    return (
        <div className="Home">
            <div className="Home-header">
                <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} className="Home-logo" alt="logo" />
                <p>
                    Edit <code>src/Home.tsx</code> and save to reload.
                </p>
                <Link className="Home-link" to="app">
                    Learn React
                </Link>
            </div>
        </div>
    );
});
