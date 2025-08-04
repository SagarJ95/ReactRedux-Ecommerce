import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const productInfo = createAsyncThunk('products/fethcproductList', async (categoryId) => {
    const requestBody = {
        category_id: categoryId ? [categoryId] : []
    };

    const response = await axios.post("https://keepinbasket.ortdemo.com/product_list", requestBody, {
        headers: {
            'x-api-key': 'IjMgJzUSIikuLi1yYAFiNWQfZ2s0MiQzeHl2YGAyN',
            'Accept': 'application/json'
        }
    });
    return response.data.data;
})


const productlist = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: 'idle'
    },
    extraReducers: (builder) => {
        builder
            .addCase(productInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(productInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(productInfo.rejected, (state) => {
                state.status = "failed";
            });
    }
});


export default productlist.reducer