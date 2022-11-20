import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { RootState } from '../store';

type PizzaItem = {
    category: number,
    id: string,
    imageUrl: string,
    price: number,
    rating: number,
    sizes: number[],
    title: string,
    types: number[],
}

enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    RECEIVED = 'received',
    REJECTED = 'rejected',
}

interface PizzaState {
    pizzas: PizzaItem[],
    pizzaItem: [],
    status: Status,
}

export type SearchPizzaParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: string,
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
    'pizzas/fetchPizzas', async (params) => {
        const {currentPage, sortBy, category, order, search} = params;
        const res = await axios
        .get<PizzaItem[]>(`https://6357011f9243cf412f91c477.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        
        return res.data;
})

export const fetchPizzaItem = createAsyncThunk(
    'pizzaItem/fetchPizzaItem', async (id) => {
        const { data } = await axios.get(
            `https://6357011f9243cf412f91c477.mockapi.io/pizzaItems/${id}`
          );
        return data;
});

const initialState: PizzaState = {
    pizzas: [],
    pizzaItem: [],
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
                state.pizzaItem = [];
            })
            .addCase(fetchPizzaItem.rejected, (state) => {
                state.status = Status.REJECTED;
                state.pizzaItem = [];
            })
            .addCase(fetchPizzaItem.fulfilled, (state, action) => {
                state.status = Status.RECEIVED;
                state.pizzaItem = action.payload;
            })
            
    }
});

export const selectPizzasData = (state: RootState) => state.pizzas;
export const selectPizzaItem = (state: RootState) => state.pizzas.pizzaItem;

export default pizzasSlice.reducer;