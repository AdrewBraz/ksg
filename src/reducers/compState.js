import { createSlice, createSelector } from '@reduxjs/toolkit';
import { LOCATION_CHANGE } from 'connected-react-router';

const componentSlice = createSlice({
  name: 'component',
  initialState: { list: [], filters: {}, age: 50 },
  reducers: {
    addState(state, { payload }) {
      state.list = payload;
    },
    addFilter(state, { payload }) {
      state.filters = payload;
    },
    addAge(state, { payload }) {
      state.age = payload;
    },
    clearDataList(state) {
      state.list = [];
      return state;
    },
  },
  extraReducers: {
    [LOCATION_CHANGE](state) {
      state.list = [];
    },
  },
});

export const getList = ({ compState }) => compState.list;
const getValue = ({ appState }) => appState.value;

export const CompSelector = createSelector([getList, getValue], (list, value) => {
  const regex = new RegExp(`^${value}$`, 'gi');
  return list.filter((item) => item.MKB_1.search(regex) !== -1);
});

export const {
  addFilter, addAge, addState, clearDataList,
} = componentSlice.actions;

export default componentSlice.reducer;
