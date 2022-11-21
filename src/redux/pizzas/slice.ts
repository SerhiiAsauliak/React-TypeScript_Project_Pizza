import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzaItem, fetchPizzas } from './asyncActions';
import { PizzaState, Status } from './types';

const initialState: PizzaState = {
    pizzas: [],
    pizzaItem: {},
    status: Status.IDLE, 
};

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.pizzas = [];
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = Status.REJECTED;
                state.pizzas = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = Status.RECEIVED;
                state.pizzas = action.payload;
            })
            .addCase(fetchPizzaItem.pending, (state) => {
                state.status = Status.LOADING;
                state.pizzaItem = {};
            })
            .addCase(fetchPizzaItem.rejected, (state) => {
                state.status = Status.REJECTED;
                state.pizzaItem = {};
            })
            .addCase(fetchPizzaItem.fulfilled, (state, action) => {
                state.status = Status.RECEIVED;
                state.pizzaItem = action.payload;
            })
            
    }
});

export default pizzasSlice.reducer;