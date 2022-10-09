import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  isAuthenticated: null,
  isError: null,
  user: null,
  userName: null,
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

export const changeErrorState = createAsyncThunk(
  "auth/errorState",
  async () => {}
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isError = false;
      localStorage.setItem("token", action.payload.result.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isError = true;
      localStorage.setItem("token", "");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.result.token);
      state.userName = action.payload.result.name;
      state.isAuthenticated = !!(state.token)
      state.isError = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isError = true;
      state.isAuthenticated = false;
      localStorage.setItem("token", "");
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      localStorage.setItem("token", "");
    });
    builder.addCase(changeErrorState.fulfilled, (state, action) => {
      state.isError = false;
    });
  },
});

export default authSlice.reducer;
