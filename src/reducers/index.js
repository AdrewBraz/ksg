import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import appState from './appState';
import compState from './compState';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  appState,
  compState,
});

export default createRootReducer;
