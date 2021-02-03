import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';

Array.prototype.hasMin = function (attrib) {
  return (this.length && this.reduce((prev, curr) => (prev[attrib] < curr[attrib] ? prev : curr))) || null;
};

const filteredLists = {
  diagnos: (list) => list.map((item) => ({ cod: item.MKB_1, name: `${item.MKB_1}-${item.MAIN_DS}` })),
  usl: (list) => list.map((item) => ({ cod: item.COD_USL, name: `${item.COD_USL}-${item.USL_NAME}` })),
};
const Select = (props) => {
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const { id, addFilter } = props;
  const { filters, list, age } = useSelector(({ compState }) => compState);
  const data = Object.keys(filters).length > 0
      ? _.filter(list, filters)
      : list;
  
  useEffect(() => {
      const kz = data.hasMin('RATIO').RATIO;
      const ks = kz >= 2 ? 1.4 : 0.8;
      const kslp = age > 75 ? 1.1 : 1;
      dispatch(actions.addKSG({ kz, ks, kslp }));
  }, [data]);

  const handleChange = () => {
    id === 'diagnos'
      ? dispatch(addFilter({ MKB_1: selectRef.current.value }))
      : dispatch(addFilter({ COD_USL: selectRef.current.value }));
  };

  const listFiltered = filteredLists[id](list).filter((item) => item.cod !== '');
  return (
    <div className="input-group">
      <div className="form-group w-100">
        <select ref={selectRef} onChange={() => handleChange()} className="form-control" name="year" id="year">
          <option value="">-</option>
          {listFiltered.map((item, i) => (
            <option key={item.name + i} value={item.cod}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
