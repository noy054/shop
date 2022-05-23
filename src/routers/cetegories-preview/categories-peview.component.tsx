import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/cetegory-preview/cetegory-preview.componenet'
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spunner/spinner.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner/> 
       ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
        );
      })
     )}
    </Fragment>
  );
};

export default CategoriesPreview;