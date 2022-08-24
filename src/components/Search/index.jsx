import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [value, setValue] = useState('');

  const clearInputHandler = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce(str => {
      dispatch(setSearchValue(str));
    }, 550),
    []
  );

  const onChangeInput = e => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы"
      />

      {value && (
        <svg
          onClick={clearInputHandler}
          className={styles.clear}
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
          <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
