import React, { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const AppBarHeight = 64;

const RootStyle = {
    height: '100vh',
    overflow: 'hidden'
} as CSSProperties;

const AppBarStyle = {
    height: AppBarHeight,
    padding: 8,
    borderBottom: '1px solid black',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
} as CSSProperties;

const OutletContainerStyle = {
    height: `calc(100vh - ${AppBarHeight}px)`,
    borderBottom: '1px solid black',
    overflow: 'auto'
} as CSSProperties;

export const AppBar = React.memo(({ children }) => {

    return (
        <div style={RootStyle}>
            <div style={AppBarStyle}>
                <Link to="">
                    AppBar
                </Link>
                <Link to="/">
                    Home
                </Link>
            </div>
            <div style={OutletContainerStyle}>
                <Outlet />
            </div>
        </div>
    );

});
