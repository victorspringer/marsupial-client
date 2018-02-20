import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers/AppReducer';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

const preloadedState = {
    loadingScreenStatus: {
        active: false
    }
};

const store = createStore(
    appReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
);

render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/:route?' component={AppContainer} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
