import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/filters/slice";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filters/selectors";
import { selectPizzasData } from "../redux/pizzas/selectors";
import { fetchPizzas } from "../redux/pizzas/asyncActions";
import { SearchPizzaParams } from "../redux/pizzas/types";
import { Categories, Pagination, PizzaBlock, SkeletonPizza, Sort, listItems } from '../components';

export const Home: React.FC = () => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

    dispatch(fetchPizzas({ currentPage: String(currentPage), sortBy, order, category, search }));
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
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = listItems.find(
        (el) => el.sortProperty === params.sortBy
      );

      dispatch(
        setFilters({
          searchValue: params.search, 
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || listItems[0]
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [dispatch])

  const pizzaItems = pizzas.map((el: any, index: number) => {
    return <PizzaBlock key={index} {...el} />;
  })
  const skeleton = [...new Array(6)].map((_, index) => <SkeletonPizza key={index}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === "rejected" ? (
        <div className="content__error-items">
          <h2>Виникла помилка...</h2>
          <p>Нажаль не вдалось завантажити піци. Будь ласка спробуйте пізніше.</p>
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
