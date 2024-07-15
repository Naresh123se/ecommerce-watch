import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
      let existingWishlist = state.wishlistItems?.findIndex(
        (item) => item._id === action.payload?._id
      );

        toast.success('Added to wishlist');
        let buildWishlistItems = { ...action.payload };
        state.wishlistItems?.push(buildWishlistItems);
        localStorage.setItem(
          'wishlistItems',
          JSON.stringify(state.wishlistItems)
        );
      
    },

    removeWishItem: (state, action) => {
      const updatedWishlists = (state.wishlistItems =
        state.wishlistItems?.filter((x) => x?._id !== action.payload));
      state.wishlistItems = updatedWishlists;
      localStorage.setItem(
        'wishlistItems',
        JSON.stringify(state.wishlistItems)
      );
    },
  },
});

export const { addToWistList, removeWishItem } = wishSlice.actions;
export default wishSlice.reducer;
