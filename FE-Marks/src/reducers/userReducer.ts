import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { User } from "../types/user";

const initialState = null as unknown as User;

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action: PayloadAction<User>) {
      state = action.payload;
      return state;
    },
  },
});

const { set } = slice.actions;

export const setUser = (user: User): AppThunk => {
  return async (dispatch) => {
    dispatch(set(user));
  };
};

export default slice.reducer;
