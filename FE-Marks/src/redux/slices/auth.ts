import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUserToFE } from "../../../../BE_Marks/src/types/user.ts";

const initialState = {
  user: null as TUserToFE | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      { payload: { user } }: PayloadAction<{ user: TUserToFE }>,
    ) {
      state.user = user;
      return state;
    },
    clearCredentials(state) {
      state.user = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
