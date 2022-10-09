import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice" 
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer
  },

});
