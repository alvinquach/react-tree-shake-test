import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components/root/Root';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BookService } from './services/book/BookService';
import { UserService } from './services/user/UserService';
import { MockUserService } from './services/user/MockUserService';
import { WebUserService } from './services/user/WebUserService';
import { DependencyContainer } from './utils/DependencyContainer';


const isMock = process.env.REACT_APP_MOCK === 'true';

console.log("HELLO?")

DependencyContainer.registerDependencies(
    BookService,
    {
        type: UserService,
        value: isMock ? new MockUserService() : new WebUserService()
    }
);

// if (isMock) {
//     DependencyContainer.registerDependencies(
//         {
//             type: UserService,
//             value: new MockUserService()
//         }
//     );
// } else {
//     DependencyContainer.registerDependencies(
//         {
//             type: UserService,
//             value: new WebUserService()
//         }
//     );
// }

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
