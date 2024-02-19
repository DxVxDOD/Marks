import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TLoggedUser } from "../../types/user";
import { RootState } from "../store";

const initialState = {
  user: null as TLoggedUser | null,
  token: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: TLoggedUser; token: string }>,
    ) {
      state.user = user;
      state.token = token;
    },
    clearCredentials(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
