import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { EagerModule } from '../../modules/eager-module/components/root/EagerModule';
import { AppBar } from '../app-bar/AppBar';
import { AppComponent1 } from '../app-component-1/AppComponent1';
import { AppComponent2 } from '../app-component-2/AppComponent2';
import { AppComponent3 } from '../app-component-3/AppComponent3';
import { AppLinks } from '../app-links/AppLinks';
import { Home } from '../home/Home';


const LazyModule = React.lazy(() => import('../../modules/lazy-module/components/root/LazyModule'));

const Routes = React.memo((props) => {

    return useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'app',
            element: <AppBar />,
            children: [
                {
                    path: '',
                    element: <AppLinks />
                },
                {
                    path: 'component1',
                    element: <AppComponent1 />
                },
                {
                    path: 'component2',
                    element: <AppComponent2 />
                },
                {
                    path: 'component3',
                    element: <AppComponent3 />
                },
                {
                    path: 'eager/*',
                    element: <EagerModule />
                },
                {
                    path: 'lazy/*',
                    element: <LazyModule />
                }
            ]
        }
    ]);
});

export const Root = React.memo(() => {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes />
            </Suspense>
        </BrowserRouter>
    );

});
