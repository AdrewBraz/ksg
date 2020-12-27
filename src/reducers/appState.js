import { createSlice, createSelector } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'ksg',
  initialState: {
    list: [], value: '', status: 'empty', ds: '',
  },
  reducers: {
    fetchData(state, { payload }) {
      state.list = payload;
    },
    addTextValue(state, { payload }) {
      state.value = payload;
    },
    addDsValue(state, { payload }) {
      state.ds = payload;
    },
    clearDataList(state) {
      state.list = [];
      return state.list;
    },
    mkbSelected(state) {
      state.status = 'selected';
    },
    mkbDeleted(state) {
      state.status = 'empty';
    },
  },
});

const getValue = ({ appState }) => appState.value;
const getList = ({ appState }) => appState.list;
const getDs = ({ appState }) => appState.ds;

export const FilterSelector = createSelector([getValue, getList, getDs],
  (value, list, ds) => {
    const regex = ds === '' ? new RegExp(`^${value}`, 'gi') : new RegExp(`^${ds}$`, 'gi');
    const result = list.length === 0 ? list : list.filter((item) => item.MKB_1.search(regex) !== -1);
    return result;
  });

export const {
  fetchData, addTextValue, clearDataList, mkbDeleted, mkbSelected, addDsValue,
} = storeSlice.actions;

export default storeSlice.reducer;
