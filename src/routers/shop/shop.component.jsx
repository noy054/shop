import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchCategoriesStart } from "../../store/categories/category.action";
import CategoriesPreview from "../cetegories-preview/categories-peview.component";
import Cetegory from "../cetegory/cetegory.componenet";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":cetegory" element={<Cetegory />} />
    </Routes>
  );
};

export default Shop;
