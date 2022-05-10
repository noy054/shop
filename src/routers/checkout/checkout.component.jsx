import React from "react";
import { useSelector } from "react-redux";

import { selectCart, selectNewTotal } from "../../store/cart/cart.selector";

import {
  CheackoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form-component";

const CheckOut = () => {
  const cartItems = useSelector(selectCart);
  const cartTotal = useSelector(selectNewTotal);
  return (
    <CheackoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>

      <PaymentForm />
    </CheackoutContainer>
  );
};

export default CheckOut;
