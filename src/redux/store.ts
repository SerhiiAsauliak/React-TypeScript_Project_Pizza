import { configureStore } from '@reduxjs/toolkit'
import filter from './filters/slice';
import cart from './cart/slice';
import pizzas from './pizzas/slice';
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