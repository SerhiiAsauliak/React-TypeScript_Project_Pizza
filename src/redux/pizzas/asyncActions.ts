import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem } from "./types";


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