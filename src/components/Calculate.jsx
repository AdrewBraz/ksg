import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';
import _, { isEqual } from 'lodash';
import { useLocation } from 'react-router-dom';
import actions from '../actions';
import Select from './Select';
import SearchInput from './SearchInput';
import Formula from './Formula';

const getAges = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Search = () => {
  const {
    fetchDataByDS, fetchDataByUsl, addDsValue, addUslValue, addFilter,
  } = actions;
  const { status, diagnos, usl } = useSelector(({ appState }) => appState);
  const { age, filters, list } = useSelector(({ compState }) => compState);
  const {
    kz, ks, item, nfs, kbs,
  } = useSelector(({ ksgState }) => ksgState);
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const { pathname } = useLocation();

  const data = Object.keys(filters).length > 0
    ? _.filter(list, filters)
    : list;
  const previousState = usePrevious(data);

  useEffect(() => {
    console.log(pathname)
    const kslp = 1;
    if (pathname === '/ds') {
      const nfs = 25617.3;
      const kbs = 0.52;
      dispatch(actions.addKSG({
        kz, ks, kslp, nfs, kbs, item,
      }));
    } else {
      const nfs = 56680.9;
      const kbs = 0.41;
    dispatch(actions.addKSG({
      kz, ks, kslp, nfs, kbs, item,
    }));
  }
  }, [pathname]);

  useEffect(() => {
    const kslp = age > 75 ? 1.1 : 1;
    dispatch(actions.addKSG({
      kz, ks, kslp, nfs, kbs, item,
    }));
  }, [age]);

  useEffect(() => {
    if (previousState && !isEqual(previousState, data)) {
      const kz = data.length > 0 ? data.hasMin('RATIO').RATIO : 1;
      const item = data.length > 0 ? data.hasMin('RATIO') : {};
      const ks = kz >= 2 ? 1.4 : 0.8;
      const kslp = age > 75 ? 1.1 : 1;
      dispatch(actions.addKSG({
        item, kz, ks, kslp, nfs, kbs
      }));
    }
  }, [data]);

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
                pathname={pathname}
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
                pathname={pathname}
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
