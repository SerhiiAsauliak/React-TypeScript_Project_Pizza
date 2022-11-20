import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CartItemProps } from '../../components/CartItem/CartItem';
import { RootState } from '../store';

export type CartItemType = {
    id: string,
    title: string, 
    types: string, 
    size: number, 
    price: number, 
    count: number, 
    imageUrl: string,
  }

interface CartState {
    items: CartItemType[],
    totalPrice: number,
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
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
            state.totalPrice = state.items.reduce((total, amount) => {
                return (amount.price * amount.count) + total;
            }, 0)
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(el => el.id === id);

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;