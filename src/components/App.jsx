import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {sortBy, uniqBy} from 'lodash';
import Autosuggest from 'react-autosuggest';
import { Jumbotron } from 'react-bootstrap';
import actions from '../actions';
import { FilterSelector } from '../reducers/appState';
import Table from './Table';
import compState from '../reducers/compState';

const App = () => {
  const { status, value } = useSelector(({ appState }) => appState);
  const tableList = useSelector(({ compState }) => compState.list);
  const inputRef = useRef(null);
  const list = useSelector(FilterSelector);
  const dispatch = useDispatch();
  useEffect(() => list.length > 0 ? dispatch(actions.addState(list)) : list ,[list])
  const getData = async (value) => {
    await dispatch(actions.fetchData(value));
  }
  const getSuggestions = sortBy(uniqBy(list, 'MKB_1'), 'MKB_1');
  const getSuggestionsValue = (item) => item.MKB_1

  const renderSuggestion = (suggestion) => (<span>{`${suggestion.MKB_1} - ${suggestion.MAIN_DS}`}</span>);

  const handleChange = async (e, { newValue }) => {
    if(newValue.length > 0){
      await dispatch(actions.addTextValue(newValue));
      await getData(newValue)
    }
  };

  const handleClear = () => {
    dispatch(actions.clearDataList())
  };


  const handleSelect = async (e, {suggestion}) => {
    const value = suggestion.MKB_1
    await handleChange(e, {newValue: value})
    dispatch(actions.mkbSelected());
    inputRef.current.onSuggestionsClearRequested();
  };

  const inputProps = {
    placeholder: 'Введите код диагноза',
    value,
    onBlur: (e) => {console.log(e.type)},
    onChange: handleChange,
  };

  return (
    <>
    <Jumbotron>
      <Autosuggest
        ref={inputRef}
        suggestions={getSuggestions}
        getSuggestionValue={getSuggestionsValue}
        onSuggestionsFetchRequested={() => {handleChange}}
        onSuggestionsClearRequested={() => {handleClear()}}
        onSuggestionSelected={ (e, {suggestion}) => { handleSelect(e, {suggestion}) }}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </Jumbotron>
     
    </>
  );
};

export default App;
