import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  error: null, // Add an error state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegister: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>
    ) => {
      state.token = action.payload.accessToken;
      state.error = null; 
    },
    userLogin: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: string;
      }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.error = null; // Clear error on successful login
    },
    userLogout: (state) => {
      state.token = "";
      state.user = "";
    },
    setError: (state:any, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { userRegister, userLogin, userLogout, setError } =
  authSlice.actions;

export default authSlice.reducer;
