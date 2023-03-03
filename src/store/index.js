import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import cart from './slices/cart.slice'

const store = configureStore({
    reducer: {
        products,
        cart
    }
})

export default store