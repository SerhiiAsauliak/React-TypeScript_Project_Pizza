import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartItemsFromLS } from './../../utils/getCartItemsFromLS';
import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { CartItemType, CartState } from './types';

const {items, totalPrice} = getCartItemsFromLS();

const initialState: CartState = {
    items,
    totalPrice,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const findItem = state.items.find(el => el.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<Pick<CartItemType, 'id' | 'price'>>) => {
            const findItem = state.items.find(el => el.id === action.payload.id);
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.totalPrice - action.payload.price;
        },
        removeItem: (state, action: PayloadAction<Pick<CartItemType, 'id'>>) => {
            state.items = state.items.filter((el) => el.id !== action.payload.toString())
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