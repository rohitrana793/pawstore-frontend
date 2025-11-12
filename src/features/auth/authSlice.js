import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromLocal,
  removeUserFromLocal,
  setUserToLocal,
} from "../local/local";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: getUserFromLocal(),
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      setUserToLocal(state.user);
    },

    logoutUser: (state, action) => {
      state.user = null;
      removeUserFromLocal();
    },
  },
});

export const { setCredentials, removeCredentials, logoutUser } =
  authSlice.actions;
