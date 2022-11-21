export type PizzaItem = {
    category?: number,
    id?: string,
    imageUrl?: string,
    price?: number,
    rating?: number,
    sizes?: number[],
    title?: string,
    types?: number[],
}

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    RECEIVED = 'received',
    REJECTED = 'rejected', 
}

export interface PizzaState {
    pizzas: PizzaItem[],
    pizzaItem: PizzaItem,
    status: Status,
}

export type SearchPizzaParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: string,
}