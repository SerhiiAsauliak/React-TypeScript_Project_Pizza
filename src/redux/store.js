import { configureStore } from '@reduxjs/toolkit'
import filter from './Slices/filterSlice'
import cart from './Slices/cartSlice';
import pizzas from './Slices/pizzasSlice';


export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
  devTools: true,
})