import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories/Categories";
import { Sort } from "./../components/Sort/Sort";
import { PizzaBlock } from "./../components/Pizza-block/Pizza-block";
import { SkeletonPizza } from "./../components/Pizza-block/SkeletonPizza";
import axios from "axios";

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedItem, setSelectedItem] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  const sortBy = selectedItem.sortProperty.replace('-', '');
  const order = selectedItem.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId ? 'category=' + categoryId : '';

  const res = () => {
    setIsLoading(true);
    axios
      .get(`https://6357011f9243cf412f91c477.mockapi.io/pizzaItems?${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    res();
  }, [categoryId, selectedItem]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}
                    onChangeCategory={(id) => setCategoryId(id)}/>
        <Sort value={selectedItem}
                    onChangeSort={(el) => setSelectedItem(el)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <SkeletonPizza key={index} />)
          : pizzas.map((el, index) => {
              return <PizzaBlock key={index} {...el} />;
            })}
      </div>
    </div>
  );
};
