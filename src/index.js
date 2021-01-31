import React from 'react';
import { render } from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import '../assets/application.scss';
import '../assets/add.css';
import App from './components/App';
import createRootReducer from './reducers/index';
import Search from './components/Search';
import Home from './components/Home';

const history = createBrowserHistory();
const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];
const store = configureStore({
  reducer: createRootReducer(history),
  middleware,
});

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
render(<Root store={store} />, document.getElementById('main'));
