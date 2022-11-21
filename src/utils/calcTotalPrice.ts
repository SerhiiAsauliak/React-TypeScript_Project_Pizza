import { CartItemType } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((total, amount) => (amount.price * amount.count) + total, 0)
}