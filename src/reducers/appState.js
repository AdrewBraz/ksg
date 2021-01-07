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
    changeStatus(state, { payload }) {
      state.status = payload;
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

export const FilterSelector = createSelector([getList, getValue],
  (list, value) => {
    const regex = new RegExp(`^${value}`, 'i');
    return list.filter((item) => regex.test(item.MKB_1));
  });

export const {
  addTextValue, changeStatus,
} = storeSlice.actions;
export { fetchData };

export default storeSlice.reducer;
