import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  isAuthenticated: false,
  user: null,
};

export const register = createAsyncThunk("auth/register", async (body) => {
  return axios
    .post("http://localhost:3000/api/p/auth/register", body)
    .then((response) => response.data);
});

// export const createItem = createAsyncThunk("item/createItem", async (item) => {
//   return axios
//     .post("http://localhost:3000/api/a/items", item)
//     .then((response) => response.data);
// });

// export const deleteItem = createAsyncThunk("item/deleteItem", async (name) => {
//   return axios
//     .delete(`http://localhost:3000/api/a/items/${name}`)
//     .then((response) => {
//       response.data.itemName = name;
//       return response.data;
//     });
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    logout: () => {
        localStorage.setItem("token", "");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.result.token);
    });
    builder.addCase(register.rejected, (state, action) => {
        localStorage.setItem("token", "");
      });
    // builder.addCase(createItem.fulfilled, (state, action) => {
    //   state.items = [action.payload.item, ...state.items];
    // });
    // builder.addCase(deleteItem.fulfilled, (state, action) => {
    //   console.log("In reducer", action.payload);
    //   state.items = state.items.filter(
    //     (item) => item.name !== action.payload.itemName
    //   );
    // });
  },
});

export const { logout } = authSlice.actions

export default authSlice.reducer;
