import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/firebase/reducer/reducre.utils";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase/firebase.utils.js';


export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArry) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCES, categoriesArry);

export const fetchCategoriesFailure = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

