import s from './search.module.scss';
import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/close-icon.svg';

export const Search = ({searchValue, setSearchValue}) => {
  return (
    <div className={s.root}>
        <img className={s.iconSearch} src={searchIcon} alt="search icon"/>
        <input onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className={s.input} 
                placeholder='Название пиццы...'/>
        {searchValue && <img onClick={() => setSearchValue('')}
                className={s.iconClear} src={clearIcon} alt="close icon"/>}
    </div>
  )
}
