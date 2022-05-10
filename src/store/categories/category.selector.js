import { createSelector } from 'reselect';

const selectCategortReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategortReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
    
        }, {})
);

export const selectIsLoading = createSelector(
    [selectCategortReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
