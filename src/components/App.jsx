import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { Jumbotron } from 'react-bootstrap';
import actions from '../actions';
import { FilterSelector } from '../reducers/appState';
import Form from './Form';
import DropBox from './DropBox'

const App = () => {
  // const { status, value } = useSelector(({ appState }) => appState);
  
  // const getSuggestions = _.uniqBy(list, 'MKB_1');
  // const getSuggestionsValue = (item) => item.MKB_1;

  // const renderSuggestion = (suggestion) => (<span>{`${suggestion.MKB_1} - ${suggestion.MAIN_DS}`}</span>);

  // const handleChange = (e, { newValue }) => {
  //   dispatch(actions.addTextValue(newValue));
  //   getData(value);
  // };


  return (
    <Jumbotron>
      <DropBox />
      {status === 'selected' ? <Form status={status} /> : null}
    </Jumbotron>
  );
};

export default App;
