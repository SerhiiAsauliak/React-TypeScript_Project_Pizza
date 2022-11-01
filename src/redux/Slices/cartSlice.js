import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   items: [],
   totalPrice: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(el => el.id === action.payload.id);
            if(findItem){
                findItem.count++;
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = state.items.reduce((total, amount) => {
                return (amount.price * amount.count) + total;
            }, 0)
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(el => el.id === action.payload.id);
            if(findItem){
                findItem.count--;
            }
            state.totalPrice = state.totalPrice - action.payload.price;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((el) => el.id !== action.payload)
            state.totalPrice = state.items.reduce((total, amount) => {
                return (amount.price * amount.count) + total;
            }, 0)
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;