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
  },
});

export const getList = ({ compState }) => compState.list;
const getFilters = ({ compState }) => compState.filters;

export const CompSelector = createSelector(getList, (list) => list);
export const CompFiltered = createSelector([CompSelector, getFilters],
  (list, filters) => {
    const keys = Object.keys(filters);
    return keys.length === 0 ? list : keys.reduce((acc, key) => {
      const value = filters[key];
      return acc.filter((item) => item[key] === value);
    }, list);
  });

export const { addFilters, addState } = componentSlice.actions;

export default componentSlice.reducer;
