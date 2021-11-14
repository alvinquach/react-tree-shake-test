import React from 'react';
import { Link } from 'react-router-dom';

export const AppComponent2 = React.memo(() => (
    <div>
        <div>AppComponent2</div>
        <Link to="../">
            Back to Links
        </Link>
    </div>
));
