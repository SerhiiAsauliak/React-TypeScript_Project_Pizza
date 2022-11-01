import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas', async (params) => {
        const {currentPage, sortBy, category, order, search} = params;
        const res = await axios
        .get(`https://6357011f9243cf412f91c477.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        
        return res.data;
})

const initialState = {
    pizzas: [],
    status: '', 
};

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action) => {state.pizzas = action.payload},
    },
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
    }
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;