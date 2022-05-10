import React from 'react';
import  { CatergoryPreview, Title, Preview} from './cetegory-preview.styles.jsx';

import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ( { title, products }) => {
    return(
        <CatergoryPreview>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {products
                .filter((_, idx) => idx < 4)
                .map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </Preview>
        </CatergoryPreview>
    );
}

export default CategoryPreview;