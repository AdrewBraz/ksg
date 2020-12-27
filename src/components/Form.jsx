// @ts-check
import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useFormik } from 'formik';

import actions from '../actions';
import { CompSelector, CompFiltered } from '../reducers/compState';

const Form = (props) => {
  const { status } = props;
  const dispatch = useDispatch();
  const list = useSelector(CompSelector);
  const ksgList = useSelector(CompFiltered);
  console.log(ksgList);
  const isSelected = status === 'selected';
  const showClass = cn({
    display: isSelected ? 'block' : 'none',
  });
  const keys = ['MKB_2', 'MKB_3', 'AGE', 'SEX', 'DURATION', 'COD_USL', 'DIFF_CRITERIA'];
  const filterList = keys.reduce((acc, key) => {
    const result = _.uniqBy(list, key)
      .map((item) => {
        if (key === 'COD_USL') {
          return `${item[key]} - ${item.USL_NAME}`;
        }
        if (key === 'MKB_2' && item[key]) {
          return `${item[key]} - ${item.ADD_DS}`;
        }
        if (key === 'MKB_3' && item[key]) {
          return `${item[key]} - ${item.COM_DS}`;
        }
        return item[key];
      })
      .filter((i) => i !== null && i !== '' && i !== ' - ');
    if (result.length > 0) {
      acc[key] = result;
    }
    return acc;
  }, {});
  const handleChange = (values) => {
    dispatch(actions.addFilters(values));
  };

  const filterKeys = Object.keys(filterList);
  const form = useFormik({
    onSubmit: () => {},
    initialValues: {
    },
  });

  return (
    <form onChange={handleChange(form.values)} id="filters" className="form-inline mb-3">
      <div className="form-group align-items-end justify-content-around flex-row w-100">
        {filterKeys.map((key) => (
          <div key={key} className={`form-group col-md-${12 / filterKeys.length}`}>
            <label htmlFor={key}>Выберите значение</label>
            <select className="form-control w-100" onChange={form.handleChange} name={`${key}`} id={`${key}`}>
              <option value="">Выберите значение</option>
              {filterList[key].map((item) => <option key={`${item}`} value={item.split(' ')[0]}>{item}</option>)}
            </select>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Form;