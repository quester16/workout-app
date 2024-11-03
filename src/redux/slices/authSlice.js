import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TOKEN } from "../../app.constans.js";

const initialState = {
  isAuth: !!Cookies.get(TOKEN),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { setIsAuth } = authSlice.actions;
