import { combineReducers } from '@reduxjs/toolkit';
import appState from './appState';
import compState from './compState';

export default combineReducers({ appState, compState });
