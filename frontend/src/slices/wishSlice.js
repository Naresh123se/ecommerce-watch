import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : [],
};

const wishSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    addToWistList: (state, action) => {
      let buildWishlistItems = { ...action.payload };
      state.wishlistItems?.push(buildWishlistItems);
      localStorage.setItem('wishlistItems',JSON.stringify(state.wishlistItems));
    },

    removeWishItem: (state, action) => {},
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    // resetCart: (state) => (state = initialState),
  },
});

export const { addToWistList, removeWishItem, clearAllWishlist } =
  wishSlice.actions;

export default wishSlice.reducer;
