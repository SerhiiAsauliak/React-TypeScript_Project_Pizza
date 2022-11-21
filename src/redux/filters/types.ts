export type SortProperty = 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';

export type ISort = {
    name: string,
    sortProperty: SortProperty,
}

export interface FilterState {
    searchValue: string, 
    categoryId: number,
    currentPage: number,
    sort: ISort,
}