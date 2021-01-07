import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortBy, uniqBy } from 'lodash';
import Autosuggest from 'react-autosuggest';
import { Jumbotron } from 'react-bootstrap';
import actions from '../actions';
import { FilterSelector } from '../reducers/appState';
import Table from './Table';

const App = () => {
  const { status, value } = useSelector(({ appState }) => appState);
  const tableList = useSelector(({ compState }) => compState.list);
  const inputRef = useRef(null);
  const list = useSelector(FilterSelector);
  const dispatch = useDispatch();
  useEffect(() => (list.length > 0 ? dispatch(actions.addState(list)) : list), [list]);
  const getData = async (inputValue) => {
    await dispatch(actions.fetchData(inputValue));
  };
  const getSuggestions = sortBy(uniqBy(list, 'MKB_1'), 'MKB_1');
  const getSuggestionsValue = (item) => item.MKB_1;

  const renderSuggestion = (suggestion) => (<span>{`${suggestion.MKB_1} - ${suggestion.MAIN_DS}`}</span>);

  const handleChange = async (e, { newValue }) => {
    if (status === 'selected') {
      dispatch(actions.changeStatus('not selected'));
      dispatch(actions.clearDataList());
    }
    await dispatch(actions.addTextValue(newValue));
    if (newValue.length === 2) {
      await getData(newValue);
    }
  };

  const handleClear = () => {
    inputRef.current.input.blur();
  };

  const handleSelect = async (e, { suggestion }) => {
    const MKB = suggestion.MKB_1;
    await handleChange(e, { newValue: MKB });
    dispatch(actions.changeStatus('selected'));
    inputRef.current.onSuggestionsClearRequested();
  };

  const inputProps = {
    placeholder: 'Введите код диагноза',
    value,
    onChange: handleChange,
    onBlur: () => { dispatch(actions.changeStatus('not selected')) },
  };

  return (
    <>
      <Jumbotron className="bg-primary mb-0">
        <h1 className="text-center  text-white mb-3">Группировщик КСГ</h1>
        <div className="mt-3 w-100 d-flex justify-content-center">
          <Autosuggest
            ref={inputRef}
            suggestions={getSuggestions}
            getSuggestionValue={getSuggestionsValue}
            onSuggestionsFetchRequested={() => { handleChange; }}
            onSuggestionsClearRequested={() => { handleClear(); }}
            onSuggestionSelected={(e, { suggestion }) => { handleSelect(e, { suggestion }); }}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
      </Jumbotron>
      {status === 'selected' ? <Table status={status} /> : null}
    </>
  );
};

export default App;
