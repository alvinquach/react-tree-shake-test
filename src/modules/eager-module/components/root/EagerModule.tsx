import React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { GenerateRandom } from '../generate-random/GenerateRandom';


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
                    <GenerateRandom />
                    <Link to="../">Back</Link>
                </div>
            )
        }
    ]);
});

export const EagerModule = React.memo(() => {

    return (
        <div>
            <div>EagerModule</div>
            <ModuleRoutes />
        </div>
    );

});
