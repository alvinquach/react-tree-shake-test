import React from 'react';
import { Link } from 'react-router-dom';

export const AppLinks = React.memo(() => (
    <div>
        <div>AppLinks</div>
        <div>
            <Link to="../component1">
                Component 1
            </Link>
        </div>
        <div>
            <Link to="../component2">
                Component 2
            </Link>
        </div>
        <div>
            <Link to="../component3">
                Component 3
            </Link>
        </div>
        <div>
            <Link to="../eager">
                Eager Module
            </Link>
        </div>
        <div>
            <Link to="../lazy">
                Lazy Module
            </Link>
        </div>
    </div>
));
