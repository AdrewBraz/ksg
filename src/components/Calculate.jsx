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
const KslpDs = ['E10 - Инсулинзависимый сахарный диабет', 'E11 - Инсулиннезависимый сахарный диабет', 'E12 - Сахарный диабет, связанный с недостаточностью питания', 'E13 - Другие уточненные формы сахарного диабета', 'E14 - Сахарный диабет неуточненный', 'D59.3 - Гемолитико-уремический синдром', 'D59.5 - Пароксизмальная ночная гемоглобинурия (Маркиафавы-Микели)', 'D61.9 - Апластическая анемия неуточненная', 'D66 - Наследственный дефицит фактора VIII', 'D67 - Наследственный дефицит фактора IX', 'D68 - Другие нарушения свертываемости', 'D68.2 -	Наследственный дефицит факторов II (фибриногена), VII (лабильного), X (Стюарта-Прауэра) ', 'D69 - Другие нарушения свертываемости', 'E84 - Муковисцидоз', 'E23 - Гипофизарный нанизм', 'G35 - Рассеянный склероз', 'Е75.5 -	Болезнь Гоше ', '(С92.1; С88.0; С90.0; С82; С83.0; С83.1; С83.3; С83.4; С83.8; С83.9; С84.5; С85; С91.1) - Злокачественные новообразования лимфоидной, кроветворной и родственных им тканей', 'Z94.0 - Z94.8', 'D69.3 - Идиопатическая тромбоцитопеническая пурпура (синдром Эванса)', 'D84.1 - Дефект в системе комплемента', 'Е22.8 - Преждевременная половая зрелость центрального происхождения', 'Е70.0; Е70.1 - Нарушения обмена ароматических аминокислот (классическая фенилкетонурия, другие виды гиперфенилаланинемии)', 'Е70.2 - Тирозинемия', 'Е71.0 - Болезнь «кленового сиропа»', 'E71.1 - 	Другие виды нарушений обмена аминокислот с разветвленной цепью (изовалериановая ацидемия, метилмалоновая ацидемия, пропионовая ацидемия)', 'Е71.3 - Нарушения обмена жирных кислот', 'Е72.1 - Гомоцистинурия', 'Е72.3 - Глютарикацидурия', 'Е74.2 - Галактоземия', 'Е75.2 - Другие сфинголипидозы: болезнь Фабри (Фабри-Андерсона), Нимана-Пика', 'Е76.0 - Мукополисахаридоз, тип I', 'Е76.1 - Мукополисахаридоз, тип II', 'Е76.2 - Мукополисахаридоз, тип VI', 'Е80.2 - Острая перемежающая (печеночная)', 'Е83.0 - Нарушения обмена меди (болезнь Вильсона)', 'Q78.0 - Незавершенный остеогенез', 'I27.0 - Легочная (артериальная) гипертензия (идиопатическая) (первичная)', 'М08.2 - Юношеский артрит с системным началом', 'G80 - Детский церебральный паралич', 'B20 – B24 - ВИЧ/СПИД, стадии 4Б и 4В, взрослые'];

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
  const {
    age, filters, list, severity,
  } = useSelector(({ compState }) => compState);
  console.log(severity);
  const {
    kz, ks, item, nfs, kbs, kslp,
  } = useSelector(({ ksgState }) => ksgState);
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const severityRef = useRef(null);
  const { pathname } = useLocation();

  const data = Object.keys(filters).length > 0
    ? _.filter(list, filters)
    : list;
  const previousState = usePrevious(data);

  useEffect(() => {
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
    const newKslp = age > 75 ? (kslp > 1.1 ? kslp : 1.1) : 1;
    console.log(kslp, newKslp);
    dispatch(actions.addKSG({
      kz, ks, kslp: newKslp, nfs, kbs, item,
    }));
  }, [age]);

  useEffect(() => {
    const newKslp = severity !== '' ? 1.8 : 1;
    dispatch(actions.addKSG({
      kz, ks, kslp: newKslp, nfs, kbs, item,
    }));
  }, [severity]);

  useEffect(() => {
    if (previousState && !isEqual(previousState, data)) {
      const kz = data.length > 0 ? data.hasMin('RATIO').RATIO : 1;
      const item = data.length > 0 ? data.hasMin('RATIO') : {};
      const ks = kz >= 2 ? 1.4 : 0.8;
      const kslp = age > 75 ? 1.1 : 1;
      dispatch(actions.addKSG({
        item, kz, ks, kslp, nfs, kbs,
      }));
    }
  }, [data]);

  const handleAge = () => {
    dispatch(actions.addAge(selectRef.current.value));
  };

  const handleSeverity = () => {
    dispatch(actions.addSeverity(severityRef.current.value));
  };
  return (
    <>
      <Form>
        <Form.Row className="align-items-baseline mb-5">
          <Col xs={3}>
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
          <Col xs={3}>
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
          <Col xs={6} className="flex-row justify-content-around d-flex">
            <div className="form-group w-25">
              <select ref={selectRef} onChange={() => handleAge()} className="form-control" name="age" id="age">
                <option value="">Возраст</option>
                {getAges(18, 99).map((item) => (
                  <option key={`${item}`} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="form-group w-25">
              <select ref={severityRef} onChange={() => handleSeverity()} className="form-control" name="severity" id="severity">
                <option value="">Сопутствующая патология</option>
                {KslpDs.map((item) => (
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
