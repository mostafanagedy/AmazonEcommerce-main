import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "INCREASE_QTY":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QTY":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart    = (product) => dispatch({ type: "ADD_TO_CART",    payload: product });
  const removeFromCart = (id)    => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const increaseQty  = (id)      => dispatch({ type: "INCREASE_QTY",  payload: id });
  const decreaseQty  = (id)      => dispatch({ type: "DECREASE_QTY",  payload: id });
  const clearCart    = ()        => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}