import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk(
  'ksg/fetchData',
  async (value, thunkAPI) => {
    const result = await axios(`/search?ds=${value}`)
      .then(({ data }) => data)
      .catch(() => console.log('fail'));
    return result;
  },
);

const storeSlice = createSlice({
  name: 'ksg',
  initialState: {
    list: [], value: '', status: 'empty', ds: '',
  },
  reducers: {
    addTextValue(state, { payload }) {
      void (state.value = payload);
    },
    clearDataList(state) {
      state.list = [];
      return state;
    },
    mkbSelected(state) {
      state.status = 'selected';
    },
    mkbDeleted(state) {
      state.status = 'empty';
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
const getDs = ({ appState }) => appState.ds;

export const FilterSelector = createSelector([getList],
  (list) => list);

export const {
  addTextValue, clearDataList, mkbDeleted, mkbSelected, addDsValue,
} = storeSlice.actions;
export { fetchData };

export default storeSlice.reducer;
