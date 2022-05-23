import React from "react";

import { selectNewCount } from "../../store/cart/cart.selector";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartIsOpen } from "../../store/cart/cart.selector";

import { CartIconContainer, Shopping, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectNewCount);
  const isCartOpen = useSelector(selectCartIsOpen);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <Shopping />
      <ItemCount> {cartCount} </ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
