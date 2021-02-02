import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchDataByDS = createAsyncThunk(
  'ksg/fetchDataByDS',
  async (value) => {
    const result = await axios(`/search_ds?ds=${value}`)
      .then(({ data }) => data)
      .catch(() => console.log('fail'));
    return result;
  },
);

const fetchDataByUsl = createAsyncThunk(
  'ksg/fetchDataByDS',
  async (value) => {
    const result = await axios(`/search_usl?usl=${value}`)
      .then(({ data }) => data)
      .catch(() => console.log('fail'));
    return result;
  },
);

const storeSlice = createSlice({
  name: 'ksg',
  initialState: {
    list: [], diagnos: {type: 'input', value: ''}, usl: {type: 'input', value: ''}, status: 'empty',
  },
  reducers: {
    addDsValue(state, { payload }) {
      state.diagnos.value = payload;
      return state;
    },
    addUslValue(state, { payload }) {
      state.usl.value = payload;
      return state;
    },
    changeType(state, { payload }){
      const { id, type } = payload;
      console.log(id)
      state[id].type = type;
      return state;
    },
    changeStatus(state, { payload }) {
      state.status = payload;
      return state;
    },
  },
  extraReducers: {
    [fetchDataByDS.fulfilled](state, { payload }) {
      state.list = payload;
      return state;
    },
    [fetchDataByUsl.fulfilled](state, { payload }) {
      state.list = payload;
      return state;
    },
  },
});

const getFilters = ({ appState }) => ({ diagnos: appState.diagnos.value, usl: appState.usl.value});
const getList = ({ appState }) => appState.list;

export const FilterSelector = createSelector([getList, getFilters],
  (list, filters) => {
    const { diagnos, usl } = filters;
    const regex1 = new RegExp(`^${diagnos}`, 'i');
    const regex2 = new RegExp(`^${usl}`, 'i');
    return list.filter((item) => regex1.test(item.MKB_1) && regex2.test(item.COD_USL));
  });

export const {
  addDsValue, addUslValue, changeStatus, changeType,
} = storeSlice.actions;
export { fetchDataByDS, fetchDataByUsl };

export default storeSlice.reducer;
