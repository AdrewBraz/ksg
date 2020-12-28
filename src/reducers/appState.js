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
const getStatus = ({ appState }) => appState.status;

export const FilterSelector = createSelector([getValue, getList, getStatus],
  (value, list, status) => {
    if (status === 'empty') {
      console.log(status);
      return list.filter((item) => item.MKB_1.search(new RegExp(`^${value}`, 'gi')) !== -1);
    }
    if (status === 'selected') {
      return list.filter((item) => item.MKB_1.search(new RegExp(`^${value}$`, 'gi')) !== -1);
    }
  });

export const {
  fetchData, addTextValue, clearDataList, mkbDeleted, mkbSelected,
} = storeSlice.actions;

export default storeSlice.reducer;
