import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortBy, uniqBy, isEqual } from 'lodash';
import Autosuggest from 'react-autosuggest';
import actions from '../actions';
import { changeType, FilterSelector } from '../reducers/appState';

const renderFunctions = {
  diagnos: {
    getSuggestions: (list) => sortBy(uniqBy(list, 'MKB_1'), 'MKB_1'),
    getSuggestionsValue: (item) => item.MKB_1,
    renderSuggestion: (suggestion) => (<span>{`${suggestion.MKB_1} - ${suggestion.MAIN_DS}`}</span>),
  },
  usl: {
    getSuggestions: (list) => sortBy(uniqBy(list, 'COD_USL'), 'COD_USL'),
    getSuggestionsValue: (item) => item.COD_USL,
    renderSuggestion: (suggestion) => (<span>{`${suggestion.COD_USL} - ${suggestion.USL_NAME}`}</span>),
  },
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const SearchInput = (props) => {
  const {
    fetchData, stringLength, pathname, id, value, status, addTextValue, placeholder,
  } = props;
  const inputRef = useRef(null);
  const list = useSelector(FilterSelector);
  const dispatch = useDispatch();
  const previousState = usePrevious(list);
  useEffect(() => {
    if (previousState && !isEqual(previousState, list)) {
      dispatch(actions.addState(list));
    }
  }, [list]);
  const getData = async (inputValue) => {
    await dispatch(fetchData({ value: inputValue, pathname}));
  };

  const { getSuggestions, getSuggestionsValue, renderSuggestion } = renderFunctions[id];

  const handleChange = async (e, { newValue }) => {
    if (status === 'selected') {
      dispatch(actions.changeStatus('not selected'));
      dispatch(actions.addFilter({}))
      id === 'diagnos' ? dispatch(actions.changeType({ id: 'usl', type: 'input' }))
        : dispatch(actions.changeType({ id: 'diagnos', type: 'input' }));
    }
    await dispatch(addTextValue(newValue.replace(/а/gi, 'a')));
    if (newValue.length === stringLength) {
      await getData(newValue);
    }
  };

  const handleClear = () => {
    inputRef.current.input.blur();
  };

  const handleSelect = async (e, { suggestion }) => {
    const textValue = id === 'diagnos' ? suggestion.MKB_1 : suggestion.COD_USL;
    await handleChange(e, { newValue: textValue });
    dispatch(actions.changeStatus('selected'));
    id === 'diagnos' ? dispatch(actions.changeType({ id: 'usl', type: 'select' }))
      : dispatch(actions.changeType({ id: 'diagnos', type: 'select' }));
    inputRef.current.onSuggestionsClearRequested();
  };

  const inputProps = {
    placeholder,
    value,
    onChange: handleChange,
    onBlur: () => { dispatch(actions.changeStatus('not selected')); },
  };

  return (
    <Autosuggest
      id={id}
      ref={inputRef}
      suggestions={getSuggestions(list)}
      getSuggestionValue={getSuggestionsValue}
      onSuggestionsFetchRequested={() => { handleChange; }}
      onSuggestionsClearRequested={() => { handleClear(); }}
      onSuggestionSelected={(e, { suggestion }) => { handleSelect(e, { suggestion }); }}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchInput;
