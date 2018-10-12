import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from './modules';
import App from './App';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

// create redux store
const store = createStore(
    rootReducer,
    compose(
        middleware, 
        window.devToolsExtension ? window.devToolsExtension() : f => f // redux dev tools (not for production use)
    )
);

// initialize sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
