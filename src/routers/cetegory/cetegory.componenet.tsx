import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/spunner/spinner.component";

import { CategoryContainer, CategoryTitle } from "./cetegory.styles";

import ProductCard from "../../components/product-card/product-card.component";

import {
  selectCategoriesMap,
  selectIsLoading,
} from "../../store/categories/category.selector";

type CategoryRouteParms = {
  category: string;
};

const Cetegory = () => {
  const { category } = useParams<
    keyof CategoryRouteParms
  >() as CategoryRouteParms;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Cetegory;
