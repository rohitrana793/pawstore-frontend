import { createSlice } from "@reduxjs/toolkit";
import {
  getCartFromLocal,
  removeCartFromLocal,
  setCartToLocal,
} from "../local/local";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: getCartFromLocal() || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const isExists = state.cart.find((cart) => cart.id === action.payload.id);
      if (isExists) {
        state.cart = state.cart.map((cart) =>
          cart.id === action.payload.id ? action.payload : cart
        );
      } else {
        state.cart.push(action.payload);
      }
      setCartToLocal(state.cart);
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((cart) => cart.id !== action.payload.id);
      setCartToLocal(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      removeCartFromLocal();
    },
  },
});

export const { addToCart, removeCartItem, clearCart } = cartSlice.actions;
