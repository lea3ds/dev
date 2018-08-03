
// imports ------------------------------------------------
import React from 'react'
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import App from './components/appWrapper';
import BaseConfigure from './BaseConfigure';
import { BrowserRouter } from "react-router-dom";

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


