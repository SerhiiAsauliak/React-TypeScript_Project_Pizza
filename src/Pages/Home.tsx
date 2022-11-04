import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { Categories } from "../components/Categories/Categories";
import { listItems, Sort } from "../components/Sort/Sort";
import { PizzaBlock } from "../components/Pizza-block/Pizza-block";
import { SkeletonPizza } from "../components/Pizza-block/SkeletonPizza";
import { Pagination } from "../components/Pagination/Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slices/filterSlice";
import { fetchPizzas, selectPizzasData } from "../redux/Slices/pizzasSlice";

export const Home: React.FC = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue, categoryId, sort, currentPage } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzasData);
  const sortProperty = sort.sortProperty;

  const getPizzas = async () => {
    const sortBy = sortProperty.replace("-", "");
    const order = sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId ? "category=" + categoryId : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    // @ts-ignore
    dispatch(fetchPizzas({ currentPage, sortBy, order, category, search }));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listItems.find(
        (el) => el.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  const pizzaItems = pizzas.map((el: any, index: number) => {
    return <PizzaBlock key={index} {...el} />;
  })
  const skeleton = [...new Array(6)].map((_, index) => <SkeletonPizza key={index}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id: number) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "rejected" ? (
        <div className="content__error-items">
          <h2>Произошла ошибка...</h2>
          <p>К сожалению не удалось загрузить пиццы. Пожалуйста повторите попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzaItems}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(num: number) => dispatch(setCurrentPage(num))}
      />
    </div>
  );
};
