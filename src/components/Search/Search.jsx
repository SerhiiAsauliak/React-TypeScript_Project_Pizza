import s from "./search.module.scss";
import searchIcon from "../../assets/img/search-icon.svg";
import clearIcon from "../../assets/img/close-icon.svg";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/Slices/filterSlice";

const debounce = require("lodash.debounce");

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const updateInputValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value))
    }, 500),[]
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateInputValue(e.target.value);
  }
  
  const inputRef = useRef();
  
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={s.root}>
      <img className={s.iconSearch} src={searchIcon} alt="search icon" />
      <input
        onChange={(e) => onChangeInput(e)}
        value={value}
        ref={inputRef}
        className={s.input}
        placeholder="Название пиццы..."
      />
      {value && (
        <img
          onClick={() => onClickClear()}
          className={s.iconClear}
          src={clearIcon}
          alt="close icon"
        />
      )}
    </div>
  );
};
