import { createSlice, createSelector } from '@reduxjs/toolkit';
import { LOCATION_CHANGE } from 'connected-react-router';
import { addAge } from './compState';

const initialState = {kz: 1, ks: 0.8, kslp: 1, nfs: 56680.9, kd: 1.672, kbs: 0.41,}

const ksgSlice = createSlice({
  name: 'ksg',
  initialState,
  reducers: {
    addKSG(state, { payload }) {
      const { kz, ks, kslp } = payload;
      state = {
        ...state, kz, ks, kslp,
      };
      return state;
    },
    extraReducers: {
      [LOCATION_CHANGE](state) {
        state = initialState;
        return state;
      },
    },
  },
});

export const { addKSG } = ksgSlice.actions;

export default ksgSlice.reducer;
