import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import '../assets/application.scss';
import '../assets/add.css';
import App from './components/App';
import reducers from './reducers/index';

const store = configureStore({
  reducer: reducers,
});
const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
render(<Root store={store} />, document.getElementById('main'));
