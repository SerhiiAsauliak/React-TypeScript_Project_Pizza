export type CartItemType = {
    id: string,
    title: string,
    types: string,
    size: number,
    price: number,
    count: number,
    imageUrl: string,
}

export interface CartState {
    items: CartItemType[],
    totalPrice: number,
}