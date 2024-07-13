import React, { useState } from 'react';


export const WishList = () => {

    const [wishlist, setWishlist] = useState([]);
    const [item, setItem] = useState('');

    const addItem = () => {
        if (item.trim()) {
            setWishlist([...wishlist, item]);
            setItem('');
        }
    };

    const removeItem = (index) => {
        const newWishlist = wishlist.filter((_, i) => i !== index);
        setWishlist(newWishlist);
    };

    return (
        <>
           
        </>
    )

}