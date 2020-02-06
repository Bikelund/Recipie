import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Icon made by Freepik - https://www.flaticon.com/authors/freepik
// from https://www.flaticon.com/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
