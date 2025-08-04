import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categoryInfo = createAsyncThunk("category/getchcategory", async () => {
    const response = await axios.get("https://keepinbasket.ortdemo.com/category_list", {
        headers: {
            'x-api-key': 'IjMgJzUSIikuLi1yYAFiNWQfZ2s0MiQzeHl2YGAyN',
            'Accept': 'application/json'
        }
    });

    return response.data.data;
})

const categorylist = createSlice({
    name: "category",
    initialState: {
        list: [],
        category_status: 'idle'
    },
    extraReducers: (builder) => {
        builder.addCase(categoryInfo.pending, (state) => {
            state.category_status = "pending"
        })
            .addCase(categoryInfo.fulfilled, (state, action) => {
                state.category_status = "successed",
                    state.list = action.payload
            })
            .addCase(categoryInfo.rejected, (state) => {
                state.category_status = "rejected"
            })
    }
})

export default categorylist.reducer