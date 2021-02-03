import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';
import actions from '../actions';
import Select from './Select';
import SearchInput from './SearchInput';
import Formula from './Formula';

const getAges = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

const Search = () => {
  const {
    fetchDataByDS, fetchDataByUsl, addDsValue, addUslValue, addFilter,
  } = actions;
  const { status, diagnos, usl } = useSelector(({ appState }) => appState);
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const handleAge = () => {
    dispatch(actions.addAge(selectRef.current.value));
  };
  return (
    <>
      <Form>
        <Form.Row className="align-items-baseline mb-5">
          <Col xs={4}>
            {diagnos.type === 'input' ? (
              <SearchInput
                stringLength={2}
                status={status}
                id="diagnos"
                value={diagnos.value}
                addTextValue={addDsValue}
                fetchData={fetchDataByDS}
                placeholder="Код Диагноза"
              />
            ) : <Select addFilter={addFilter} id="diagnos" />}
          </Col>
          <Col xs={4}>
            {usl.type === 'input' ? (
              <SearchInput
                status={status}
                stringLength={3}
                id="usl"
                value={usl.value}
                addTextValue={addUslValue}
                fetchData={fetchDataByUsl}
                placeholder="Код Услуги"
              />
            ) : <Select addFilter={addFilter} id="usl" />}
          </Col>
          <Col xs={4}>
            <div className="form-group col-6">
              <select ref={selectRef} onChange={() => handleAge()} className="form-control" name="age" id="age">
                <option value="">Возраст</option>
                {getAges(18, 99).map((item) => (
                  <option key={`${item}`} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </Col>
        </Form.Row>
      </Form>
      <Formula />
    </>
  );
};

export default Search;
