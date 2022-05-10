import React from 'react';
import  { CartDropdunContainer, CartToItems , EmptyMessage} from './cart-dropdown.styles.jsx';

import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component';

import  {selectCart } from '../../store/cart/cart.selector'
import { useSelector } from 'react-redux';



const CartDropdown = () => {
    const cartItems  = useSelector(selectCart);
    const navigate = useNavigate();

   

    const goToChechoutHandler = () => {
        navigate('/checkout')
    }

    
         
    return(
        <CartDropdunContainer>
            <CartToItems>
            {cartItems.length ? (
                cartItems.map((item) =>  
                <CartItem key={item.id} cartItem={item} /> )
            ) : (
                <EmptyMessage>Your cart is empty</EmptyMessage>
           )}
            </CartToItems>
              <Button onClick={goToChechoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdunContainer>
    );
};

export default CartDropdown;