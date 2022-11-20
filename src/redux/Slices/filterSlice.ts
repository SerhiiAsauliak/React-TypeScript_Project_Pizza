import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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

const initialState: FilterState = {
    searchValue: '', 
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: 'rating',
    },
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {state.categoryId = action.payload},
        setSearchValue: (state, action: PayloadAction<string>) => {state.searchValue = action.payload},
        setSort: (state, action: PayloadAction<ISort>) => {state.sort = action.payload},
        setCurrentPage: (state, action: PayloadAction<number>) => {state.currentPage = action.payload},
        setFilters: (state, action: PayloadAction<FilterState>) => {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;