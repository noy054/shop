import { createSelector } from "reselect";

import { CartState } from "./cart.reducer";

import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCart = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartIsOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectNewCount = createSelector([selectCart], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectNewTotal = createSelector([selectCart], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
