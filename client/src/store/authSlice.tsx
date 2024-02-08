import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: null | { username: string; roles: string[] };
  registrationMessage: string | null;
  loginError: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null, 
  isAuthenticated: !!localStorage.getItem("token"), 
  user: null,
  registrationMessage: null,
  loginError: null,
};
console.log(!localStorage.getItem("token"))
console.log(!!localStorage.getItem("token"))

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        userData
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        userData
      );
      return { data: response.data, message: response.data.message };
    } catch (error) {
      return { error: error.response?.data, message: "Registration failed" };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registrationMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError =
          action.payload?.message || "An error occurred during login";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationMessage = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
