import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import { Jumbotron } from 'react-bootstrap';
import actions from '../actions';
import { FilterSelector } from '../reducers/appState';
import Form from './Form';

const App = () => {
  const { status, value } = useSelector(({ appState }) => appState);
  const inputRef = useRef(null);
  const list = useSelector(FilterSelector);
  const dispatch = useDispatch();
  const getData = async (textValue) => {
    if (textValue.length === 1) {
      const data = await axios(`/search?ds=${textValue}`)
        .then(({ data }) => data)
        .catch(() => console.log('fail'));
      dispatch(actions.fetchData(data));
    }
  };
  const getSuggestions = _.uniqBy(list, 'MKB_1');
  const getSuggestionsValue = (item) => item.MKB_1;

  const renderSuggestion = (suggestion) => (<span>{`${suggestion.MKB_1} - ${suggestion.MAIN_DS}`}</span>);

  const handleChange = (e, { newValue }) => {
    dispatch(actions.addTextValue(newValue));
    getData(value);
  };

  const handleClear = (value) => {
    if (value.length === 0) {
      dispatch(actions.clearDataList());
    }
  };

  const handleSelect = async (e, suggestion) => {
    await dispatch(actions.mkbSelected());
    await dispatch(actions.addDsValue(suggestion.MKB_1));
    inputRef.current.onSuggestionsClearRequested();
    console.log(list);
    dispatch(actions.addState(list));
  };

  const inputProps = {
    placeholder: 'Введите код диагноза',
    value,
    onChange: handleChange,
  };

  return (
    <Jumbotron>
      <Autosuggest
        ref={inputRef}
        suggestions={getSuggestions}
        getSuggestionValue={getSuggestionsValue}
        onSuggestionsFetchRequested={() => {}}
        onSuggestionsClearRequested={() => { handleClear(value); }}
        onSuggestionSelected={(e, { suggestion }) => { handleSelect(e, suggestion); }}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {status === 'selected' ? <Form status={status} /> : null}
    </Jumbotron>
  );
};

export default App;
