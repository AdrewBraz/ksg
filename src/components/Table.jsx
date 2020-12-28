//@ts-check
import React from 'react';
import { Table } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const TableKsg = (props) => {
  const list = useSelector(({ compState }) => compState.list);
  const { status } = props;
  console.log(list);
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
  const renderItems = (list) => (
    list.map((item, i) => (
      <tr key={item.MKB_1 + i}>
        {columnNames.map((name, j) => <td key={`${name + j}`}>{item[name]}</td>)}
      </tr>
    ))
  );
  const renderTable = (list) => {
    const columnNames = Object.keys(list[0]);
    return (
      <Table style={{ position: 'relative' }} size="sm" striped bordered hover responsive>
        <thead>
          <tr>
            {columnNames.map((name) => <th style={{ position: 'sticky', top: '0' }} key={name}>{list[name]}</th>)}
          </tr>
        </thead>
        <tbody>
          {renderItems(list)}
        </tbody>
      </Table>
    );
  };
  return (
    // <>{list.length > 0 && status === 'selected' ? renderTable(list) : null}</>
  );
};
export default TableKsg;
