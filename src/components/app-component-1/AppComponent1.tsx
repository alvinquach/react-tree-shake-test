import React from 'react';
import { Link } from 'react-router-dom';

export const AppComponent1 = React.memo(() => (
    <div>
        <div>AppComponent1</div>
        <Link to="../">
            Back to Links
        </Link>
    </div>
));
