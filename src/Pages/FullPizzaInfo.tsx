import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPizzaItem } from "../redux/pizzas/asyncActions";
import { selectPizzaItem, selectPizzasData } from "../redux/pizzas/selectors";
import { useAppDispatch } from "../redux/store";

const FullPizzaInfo: React.FC = () => {
  const pizzaItem = useSelector(selectPizzaItem);
  const {status} = useSelector(selectPizzasData);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const getPizza = async () => {
    if(id){
      dispatch(fetchPizzaItem(id));
    }
  };

  useEffect(() => {
    getPizza();
  }, []);

  if(status === 'loading'){
    return <h3>Завантаження...</h3>;
  }

  return (
    <div className="container">
      <div className="full-pizza">
        {status === "received" && pizzaItem ? (
          <>
            <img src={pizzaItem.imageUrl} alt="pizzaImage" />
            <h2>{pizzaItem.title}</h2>
          </>
        ) : (
          <>
            <h3>Виникла помилка...</h3>
            <p>Спробуйте пізніше</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FullPizzaInfo;