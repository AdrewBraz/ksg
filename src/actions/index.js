import {
  fetchDataByDS, fetchDataByUsl, addDsValue, addUslValue, changeStatus, changeType, addUrl
} from '../reducers/appState';
import {
  addState, clearDataList, addFilter, addAge, addSeverity
} from '../reducers/compState';
import { addKSG } from '../reducers/ksgState';

export default {
  fetchDataByDS,
  fetchDataByUsl,
  addDsValue,
  addUslValue,
  clearDataList,
  changeStatus,
  addState,
  addFilter,
  changeType,
  addAge,
  addKSG,
  addSeverity,
  addUrl
};
