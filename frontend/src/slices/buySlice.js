import { createSlice } from '@reduxjs/toolkit';
import { updateBuy } from '../utils/buyUtils';

const initialState = localStorage.getItem('buyProduct')
  ? JSON.parse(localStorage.getItem('buyProduct'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'khalti' };

//   console.log(shippingAddress)
const buySlice = createSlice({
  name: 'buyProduct',
  initialState,
  reducers: {
    addToBuy: (state, action) => {
        console.log("first")
      // NOTE: we don't need user, rating, numReviews or reviews
      // in the cart
      const { user, rating, numReviews, reviews, ...item } = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateBuy(state, item);
    },
    removeFromBuy: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateBuy(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('buyProduct', JSON.stringify(state));
    },
    saveBuyPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('buyProduct', JSON.stringify(state));
    },
    clearBuyItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('buyProduct', JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToBuy,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = buySlice.actions;

export default buySlice.reducer;
