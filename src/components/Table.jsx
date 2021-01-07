// @ts-check
import React from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { CompSelector } from '../reducers/compState';

const TableKsg = (props) => {
  const list = useSelector(CompSelector);
  const ruNames = {
    MKB_1: 'Код МКБ',
    MAIN_DS: 'Основной диагноз',
    MKB_2: 'Код МКБ(2)',
    ADD_DS: 'Дополнительный диагноз',
    MKB_3: 'Код МКБ(3)',
    COM_DS: 'Диагноз осложнения',
    COD_USL: 'Код услуги',
    USL_NAME: 'Название услуги',
    DIFF_CRITERIA: 'Иной классификационный критерий',
    KSG: 'КСГ',
    KSG_NAME: 'Расшифровка КСГ',
    AGE: 'ВОЗРАСТ',
    SEX: 'ПОЛ',
    DURATION: 'Длительность',
  };
  const { status } = props;
  const keys = Object.keys(list[0]);
  const filteredKeys = keys.reduce((acc, key) => {
    const result = _.uniqBy(list, key)
      .map((item) => item[key])
      .filter((i) => i !== null && i !== '' && i !== ' - ');
    if (result.length > 0) {
      acc[key] = result;
    }
    return acc;
  }, {});
  const columnNames = Object.keys(filteredKeys);
  const renderItems = (rowList) => (
    rowList.map((item, i) => (
      <tr key={item.MKB_1 + i}>
        {columnNames.map((name, j) => <td key={`${name + j}`}>{item[name]}</td>)}
      </tr>
    ))
  );
  const renderTable = (ksgList) => (
    <Table size="sm" striped bordered hover responsive>
      <thead>
        <tr style={{ position: 'sticky', top: '0', background: 'white' }}>
          {columnNames.map((name) => <th style={{ position: 'sticky', top: '0', background: 'white' }} key={name}>{ruNames[name]}</th>)}
        </tr>
      </thead>
      <tbody>
        {renderItems(ksgList)}
      </tbody>
    </Table>
  );
  return (
    <div>{list.length > 0 && status === 'selected' ? renderTable(list) : null}</div>
  );
};
export default TableKsg;
