import { createSlice } from '@reduxjs/toolkit';
// import { updateCart } from '../utils/cartUtils';

const initialState = {
    wishlistItems:localStorage.getItem('wishlistItems')
  ? JSON.parse(localStorage.getItem('wishlistItems'))
  : []}

const wishSlice = createSlice({
  name: 'wishlistItems',
  initialState,
  reducers: {
    addToWistList: (state, action) => {
      
        
    },
  
  
    clearAllWishlist: (state, action) => {
      state.wishlistItems = [];
    //   localStorage.setItem('cart', JSON.stringify(state));
    },

    removeWishItem: (state, action) => {
        
      },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToWistList,
  removeWishItem,
  clearAllWishlist
} = wishSlice.actions;

export default wishSlice.reducer;
