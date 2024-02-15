import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/user";
import { RootState } from "../store";

const initialState = {
  user: null as TUser | null,
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
      }: PayloadAction<{ user: TUser; token: string }>,
    ) {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
