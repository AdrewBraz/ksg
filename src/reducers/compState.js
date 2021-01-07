import { createSlice, createSelector } from '@reduxjs/toolkit';

const componentSlice = createSlice({
  name: 'component',
  initialState: { list: [], filters: {} },
  reducers: {
    addState(state, { payload }) {
      state.list = payload;
    },
    addFilters(state, { payload }) {
      state.filters = payload;
    },
    clearDataList(state) {
      state.list = [];
      return state;
    },
  },
});

export const getList = ({ compState }) => compState.list;
const getValue = ({ appState }) => appState.value;

export const CompSelector = createSelector([getList, getValue], (list, value) => {
  const regex = new RegExp(`^${value}$`, 'gi');
  return list.filter((item) => item.MKB_1.search(regex) !== -1);
});

export const { addFilters, addState, clearDataList } = componentSlice.actions;

export default componentSlice.reducer;
