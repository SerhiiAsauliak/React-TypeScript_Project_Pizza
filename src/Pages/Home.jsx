import React, { useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import axios from "axios";
import qs from 'qs';

import { Categories } from "../components/Categories/Categories";
import { listItems, Sort } from "./../components/Sort/Sort";
import { PizzaBlock } from "./../components/Pizza-block/Pizza-block";
import { SkeletonPizza } from "./../components/Pizza-block/SkeletonPizza";
import { Pagination } from "../components/Pagination/Pagination";
import {setCategoryId, setCurrentPage, setFilters} from '../redux/Slices/filterSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortProperty = sort.sortProperty;
  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sortProperty.replace('-', '');
    const order = sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId ? 'category=' + categoryId : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(`https://6357011f9243cf412f91c477.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

 // Если изменили параметры и был первый рендер
  useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, currentPage])

// Если был первый рендер, то проверяем URl-параметры и сохраняем в redux
  useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      const sort = listItems.find(el => el.sortProperty === params.sortProperty);
      dispatch(setFilters({
        ...params,
        sort,
      }))
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current){
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}
                    onChangeCategory={(id) => dispatch(setCategoryId(id))}/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <SkeletonPizza key={index} />)
          : pizzas.map((el, index) => {
              return <PizzaBlock key={index} {...el} />;
            })}
      </div>
      <Pagination currentPage={currentPage}
                  onChangePage={(num) => dispatch(setCurrentPage(num))}/>
    </div>
  );
};
