import { RootState } from "../store";

export const selectPizzasData = (state: RootState) => state.pizzas;
export const selectPizzaItem = (state: RootState) => state.pizzas.pizzaItem;