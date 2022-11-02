import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas', async (params) => {
        const {currentPage, sortBy, category, order, search} = params;
        const res = await axios
        .get(`https://6357011f9243cf412f91c477.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        
        return res.data;
})

export const fetchPizzaItem = createAsyncThunk(
    'pizzaItem/fetchPizzaItem', async (id) => {
        const { data } = await axios.get(
            `https://6357011f9243cf412f91c477.mockapi.io/pizzaItems/${id}`
          );
        return data;
});

const initialState = {
    pizzas: [],
    pizzaItem: null,
    status: '', 
};

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.pizzas = [];
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'rejected';
                state.pizzas = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = 'received';
                state.pizzas = action.payload;
            })
            .addCase(fetchPizzaItem.pending, (state) => {
                state.status = 'loading';
                state.pizzaItem = [];
            })
            .addCase(fetchPizzaItem.rejected, (state, action) => {
                state.status = 'rejected';
                state.pizzaItem = [];
            })
            .addCase(fetchPizzaItem.fulfilled, (state, action) => {
                state.status = 'received';
                state.pizzaItem = action.payload;
            })
            
    }
});

export const selectPizzasData = (state) => state.pizzas;
export const selectPizzaItem = (state) => state.pizzas.pizzaItem;

export default pizzasSlice.reducer;