import React from 'react';
import { Link } from 'react-router-dom';

export const AppComponent3 = React.memo(() => (
    <div>
        <div>AppComponent3</div>
        <Link to="../">
            Back to Links
        </Link>
    </div>
));
