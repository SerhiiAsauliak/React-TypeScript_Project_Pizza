import { configureStore } from '@reduxjs/toolkit'
import filter from './Slices/filterSlice'
import cart from './Slices/cartSlice';
import pizzas from './Slices/pizzasSlice';
import { useDispatch } from 'react-redux';


export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState> 

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;