import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../feature/shopCart/ProductSlice'
import categroyReducer from '../feature/category/categorySlice'
import CartReducer from '../feature/cartList/cartSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        category: categroyReducer,
        cart: CartReducer
    }
})
