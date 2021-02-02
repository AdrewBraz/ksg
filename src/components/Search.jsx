import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortBy, uniqBy } from 'lodash';
import Autosuggest from 'react-autosuggest';
import actions from '../actions';
import { FilterSelector } from '../reducers/appState';
import { Form, Col } from 'react-bootstrap';

import SearchInput from './SearchInput'

const Search = () => {
  const { fetchDataByDS, fetchDataByUsl, addDsValue, addUslValue } = actions;
  const { status, diagnos, usl } = useSelector(({ appState }) => appState);
  return (
    <Form>
      <Form.Row>
        <Col>
          <SearchInput stringLength={2}
            status={status} 
            id='ds' value={diagnos.value} 
            addTextValue={addDsValue} 
            fetchData={actions.fetchDataByDS} 
          />
        </Col>
        <Col>
        <SearchInput 
          status={status} 
          stringLength={3} 
          id='usl' value={usl.value} 
          addTextValue={addUslValue}  
          fetchData={actions.fetchDataByUsl} />
        </Col>
      </Form.Row>
    </Form>
  )
};

export default Search;
