
// imports ------------------------------------------------
import React from 'react'
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

import './assets/css/style.css';

import App from './components/app';
import BaseConfigure from './components/app/BaseConfigure';

// createStore --------------------------------------------
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

// reducers -----------------------------------------------
import reducers from "./reducers"

// createStore --------------------------------------------
const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger, ));


// index render -------------------------------------------
ReactDOM.render(
    <Provider store={store}>
        <BaseConfigure>
            <BrowserRouter>
                    <App />
            </BrowserRouter>
        </BaseConfigure>
    </Provider>,
    document.getElementById('root')
);


