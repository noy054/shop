import React from 'react';
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import {  useSelector } from 'react-redux';
import Spinner from '../../components/spunner/spinner.component'; 

import  {CategoryContainer, CategoryTitle} from './cetegory.styles.jsx';

import ProductCard from "../../components/product-card/product-card.component";


import { selectCategoriesMap, selectIsLoading} from '../../store/categories/category.selector';


const Cetegory = () => {
    const { cetegory } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    const [products, setProducts] = useState(categoriesMap[cetegory]);
  
        
    useEffect(() => {
        setProducts(categoriesMap[cetegory]);
    }, [cetegory, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{cetegory.toUpperCase()}</CategoryTitle>
            {isLoading ? ( <Spinner/> 
            ) : (
             <CategoryContainer>
                {products && 
                products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </CategoryContainer>
            )}
        </Fragment>
    );
}

export default Cetegory;