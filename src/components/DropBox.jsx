import React, { useRef } from 'react';
import { useCombobox } from 'downshift';
import { useDispatch, useSelector } from 'react-redux';
import { FilterSelector } from '../reducers/appState';
import actions from '../actions';
import axios from 'axios';


const DropBox = () => {
  const { value } = useSelector(({ appState }) => appState);
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
  const handleChange = (newValue ) => {
    dispatch(actions.addTextValue(newValue));
    getData(value);
  };
  const items =_.uniqBy(list, 'MKB_1').map(item => item.MKB_1);
  console.log(items)
  function DropdownCombobox() {
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items,
      onInputValueChange: ({ inputValue }) => {
       handleChange(inputValue)
      },
    });
    return (
      <div>
        <label {...getLabelProps()}>Choose an element:</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps()} />
        </div>
        <ul {...getMenuProps()} >
          {isOpen
              && items.map((item, index) => {
                  console.log(item)
                  return (
                    <li
                      style={
                        highlightedIndex === index
                          ? { backgroundColor: '#bde4ff' }
                          : {}
                      }
                      key={`${item}${index}`}
                      {...getItemProps({ item, index })}
                    >
                      {item}
                    </li>
                  )
              })}
        </ul>
      </div>
    );
  }
  return <DropdownCombobox />;
};

export default DropBox