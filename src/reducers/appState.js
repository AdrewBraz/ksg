import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk(
  'ksg/fetchData',
  async (value) => {
    const result = await axios(`/search?ds=${value}`)
      .then(({ data }) => data)
      .catch(() => console.log('fail'));
    return result;
  },
);

const storeSlice = createSlice({
  name: 'ksg',
  initialState: {
    list: [], value: '', status: 'empty',
  },
  reducers: {
    addTextValue(state, { payload }) {
      state.value = payload;
      return state;
    },
    clearDataList(state) {
      state.list = [];
      return state;
    },
    mkbSelected(state) {
      state.status = 'selected';
      return state;
    },
    mkbDeleted(state) {
      state.status = 'empty';
      return state;
    },
  },
  extraReducers: {
    [fetchData.fulfilled](state, { payload }) {
      state.list = payload;
      return state;
    },
  },
});

const getValue = ({ appState }) => appState.value;
const getList = ({ appState }) => appState.list;
const getStatus = ({ appState }) => appState.status;

export const FilterSelector = createSelector([getList, getValue],
  (list, value) => {
    const regex = new RegExp(`^${value}`, 'i');
    const result = list.filter((item) => item.MKB_1.search(regex) !== -1);
    console.log(result, list);
    return result
  });

export const {
  addTextValue, clearDataList, mkbDeleted, mkbSelected,
} = storeSlice.actions;
export { fetchData };

export default storeSlice.reducer;
