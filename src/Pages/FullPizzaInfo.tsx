import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchPizzaItem, selectPizzasData } from "../redux/Slices/pizzasSlice";
// import { selectPizzaItem } from "../redux/Slices/pizzasSlice";

export const FullPizzaInfo: React.FC = () => {
  // const pizzaItem = useSelector(selectPizzaItem);
  // const {status} = useSelector(selectPizzasData);
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const getPizza = async () => {
  //   dispatch(fetchPizzaItem(id));
  // };

  // useEffect(() => {
  //   getPizza();
  // }, []);

  // if(status === 'loading'){
    return <h3>Loading...</h3>;
  // }

  // return (
  //   <div className="container">
  //       {status === 'received' && pizzaItem
  //       ? <>
  //              <img src={pizzaItem.imageUrl} alt="pizzaImage" />
  //              <h2>{pizzaItem.title}</h2>
  //              {pizzaItem.id}
  //           </>
  //       : <>
  //            <h3>Произошла ошибка...</h3>
  //           <p>Повторите попытку позже</p>
  //        </>
  //       }
  //   </div>
  // );
};
