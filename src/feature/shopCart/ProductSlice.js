import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const productInfo = createAsyncThunk('products/fethcproductList', async ({ categoryId, page, sort_by_price }) => {
    const access_token = localStorage.getItem('access_token')
    const requestBody = {
        category_id: categoryId ? [categoryId] : [],
        page: page ? page : 1,
        sort_by_price: (sort_by_price) ? sort_by_price : ''
    };

    const response = await axios.post("https://keepinbasket.ortdemo.com/product_list", requestBody, {
        headers: {
            'x-api-key': 'IjMgJzUSIikuLi1yYAFiNWQfZ2s0MiQzeHl2YGAyN',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });

    return response.data;
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