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

export const login = createAsyncThunk("auth/login", async (body) => {
  return axios
    .post("http://localhost:3000/api/p/auth/login", body)
    .then((response) => response.data);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return localStorage.getItem("token");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.result.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      localStorage.setItem("token", "");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.result.token);
    });
    builder.addCase(login.rejected, (state) => {
      state.isAuthenticated = false;
      localStorage.setItem("token", "");
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      localStorage.setItem("token", "");
     });
  },
});

export default authSlice.reducer;
