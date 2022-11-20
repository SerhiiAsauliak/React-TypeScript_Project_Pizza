import s from "./search.module.scss";
import searchIcon from "../../assets/img/search-icon.svg";
import clearIcon from "../../assets/img/close-icon.svg";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/Slices/filterSlice";
import debounce from 'lodash.debounce';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');

  const updateInputValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value))
    }, 500),[]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateInputValue(e.target.value);
  }
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={s.root}>
      <img className={s.iconSearch} src={searchIcon} alt="search icon" />
      <input
        onChange={(e) => onChangeInput(e)}
        value={value}
        ref={inputRef}
        className={s.input}
        placeholder="Назва піци..."
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

