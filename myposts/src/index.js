import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers';

const store = createStore(
        rootReducer,
        applyMiddleware( thunk )
);

ReactDOM.render(
        <Provider store={store}>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
        </Provider>, document.getElementById('root'));
registerServiceWorker();
