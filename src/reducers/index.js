import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import appState from './appState';
import compState from './compState';
import ksgState from './ksgState';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  appState,
  compState,
  ksgState,
});

export default createRootReducer;
