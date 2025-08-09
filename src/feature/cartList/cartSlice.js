import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productInfo } from '../shopCart/ProductSlice'

//fetch Product qty
export const fetchCartInfo = createAsyncThunk("cart/fetchCartList", async () => {
    const access_token = localStorage.getItem('access_token')

    const getCartlist = await axios.post("https://keepinbasket.ortdemo.com/cart_list", {}, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    return getCartlist.data;
})

// Add item to cart
export const addItem = createAsyncThunk("addcart/addItem", async (arg, thunkAPI) => {
    const token = localStorage.getItem("access_token");
    const bodyPart = {
        id: 0,
        product_id: arg.productId,
        qty: 1,
    };
    const response = await axios.post("https://keepinbasket.ortdemo.com/add_update_cart", bodyPart, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data.status === true) {
        thunkAPI.dispatch(fetchCartInfo());
        thunkAPI.dispatch(productInfo({
            categoryId: arg.categoryId,
            page: arg.page,
            sort_by_price: arg.sort_by_price
        })) // refresh cart
    }
    return response.data;
});

// Update item to cart
export const updateItem = createAsyncThunk("addcart/updateItem", async (arg, thunkAPI) => {

    const token = localStorage.getItem("access_token");
    const bodyPart = {
        id: arg.cartId,
        product_id: arg.productId,
        qty: arg.updateQty,
    };
    const response = await axios.post("https://keepinbasket.ortdemo.com/add_update_cart", bodyPart, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data.status === true) {
        thunkAPI.dispatch(fetchCartInfo());
        thunkAPI.dispatch(productInfo({
            categoryId: arg.categoryId,
            page: arg.page,
            sort_by_price: arg.sort_by_price
        }))// refresh cart
    }
    return response.data;
});

// Remove item from cart
export const removeItem = createAsyncThunk("addcart/removeItem", async (arg, thunkAPI) => {
    const token = localStorage.getItem("access_token");
    const bodyPart = {
        cart_id: arg.cart_id
    };
    const response = await axios.post("https://keepinbasket.ortdemo.com/delete_product_cart", bodyPart, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data.status === true) {
        thunkAPI.dispatch(fetchCartInfo());
        thunkAPI.dispatch(productInfo({
            categoryId: arg.categoryId,
            page: arg.page,
            sort_by_price: arg.sort_by_price
        })) // refresh cart
    }

    return response.data;
});

const cartlist = createSlice({
    name: "cart",
    initialState: {
        list: [],
        status: 'idle'
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartInfo.pending, (state) => {
            state.status = "loading"
        })
            .addCase(fetchCartInfo.fulfilled, (state, action) => {
                state.status = "successed",
                    state.list = action.payload
            })
            .addCase(fetchCartInfo.rejected, (state) => {
                state.status = "rejected"
            })
            // Add Item
            .addCase(addItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.loading = false;
                // You can update state.items here if needed
                console.log("Add item success:", action.payload.message);
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update Item
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                // You can update state.items here if needed
                console.log("Add item success:", action.payload.message);
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Remove Item
            .addCase(removeItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally filter out deleted item from items array
                console.log("Remove item success:", action.payload.message);
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default cartlist.reducer