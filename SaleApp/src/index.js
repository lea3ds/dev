
// imports ------------------------------------------------
import React from 'react'
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import App from './components/appWrapper';
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



// const TEST = () => {
//     return <div>DEMO</div>
// }



// index render -------------------------------------------
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            {/* <TEST /> */}
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

