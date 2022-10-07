import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const getItems = createAsyncThunk("item/getItems", async () => {
  return axios
    .get("http://localhost:3000/api/p/items")
    .then((response) => response.data);
});

export const createItem = createAsyncThunk("item/createItem", async (item) => {
  return axios
    .post("http://localhost:3000/api/a/items", item)
    .then((response) => response.data);
});

export const deleteItem = createAsyncThunk("item/deleteItem", async (name) => {
  return axios
    .delete(`http://localhost:3000/api/a/items/${name}`)
    .then((response) => {
      response.data.itemName = name;
      return response.data;
    });
});

export const itemSlice = createSlice({
  name: "item",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload.itemList;
    });
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.items = [action.payload.item, ...state.items];
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      console.log("In reducer", action.payload);
      state.items = state.items.filter(
        (item) => item.name !== action.payload.itemName
      );
    });
  },
});

export default itemSlice.reducer;
