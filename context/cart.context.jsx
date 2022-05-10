import React from 'react';
import { createContext, useReducer } from 'react';
import { createAction } from '../utils/firebase/reducer/reducre.utils';

const addCartItem = (cartItem, productAdd) => {
    
   
    const existingCartItem = cartItem.find(
    (cartItem) => cartItem.id === productAdd.id
    )

    if (existingCartItem) {
        return cartItem.map((cartItem) =>
        cartItem.id === productAdd.id
            ?{ ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
        
    

    return [...cartItem, {...productAdd, quantity: 1}];
    

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
        )

    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    } 

    return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
        ?{ ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );

};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}









export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
   
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS :
            return {
            ...state,
            ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
            ...state,
            isCartOpen:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
};

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal  }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

   
 
    const updateCartItemEeducer = (newCartItems, newCartOpen) =>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
         

        


        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                isCartOpen: newCartOpen ,
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            })
        )
    };



    const addItemToCart = (productAdd) => {
        const newCartItems = addCartItem(cartItems, productAdd);
        updateCartItemEeducer(newCartItems);
    };

    const  removeItemToCart = (cartItemToRemove) => {
      const newCartItems  = removeCartItem(cartItems, cartItemToRemove);
      updateCartItemEeducer(newCartItems);
    };
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems ,cartItemToClear);
        updateCartItemEeducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));   
    }


    const value = {isCartOpen, setIsCartOpen ,addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal };
    

    return  <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};