import React from 'react';
import { Link, useRoutes } from 'react-router-dom';


const ModuleRoutes = React.memo(() => {
    return useRoutes([
        {
            path: '/',
            element: (
                <div>
                    <div>
                        <Link to="test">Test</Link>
                    </div>
                    <div>
                        <Link to="/app">Links</Link>
                    </div>
                </div>
            )
        },
        {
            path: 'test',
            element: (
                <div>
                    <Link to="../">Back</Link>
                </div>
            )
        }
    ]);
});

const LazyModule = React.memo(() => {

    return (
        <div>
            <div>LazyModule</div>
            <ModuleRoutes />
        </div>
    );

});

export default LazyModule;

