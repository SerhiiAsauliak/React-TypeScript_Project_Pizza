import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "./../components/Sort/Sort";
import { PizzaBlock } from "./../components/Pizza-block/Pizza-block";
import { SkeletonPizza } from "./../components/Pizza-block/SkeletonPizza";
import axios from "axios";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import {setCategoryId} from '../redux/Slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector(state => state.filter);
  const sortProperty = sort.sortProperty;
  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const sortBy = sortProperty.replace('-', '');
  const order = sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId ? 'category=' + categoryId : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const res = () => {
    setIsLoading(true);
    axios
      .get(`https://6357011f9243cf412f91c477.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    res();
    window.scrollTo(0, 0);
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
      <Pagination onChangePage={(num) => setCurrentPage(num)}/>
    </div>
  );
};
