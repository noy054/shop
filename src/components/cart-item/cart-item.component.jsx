import React from 'react';
import {CartItemContainer, ItemDetails, Img ,Name, price } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price , quantity } = cartItem;
    return(
        <CartItemContainer>
            <Img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <Name>{name}</Name>
                <span >{quantity} x { price }</span>
            </ItemDetails> 
        </CartItemContainer>
    );
};

export default CartItem;