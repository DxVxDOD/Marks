import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { TNewUser } from "../types/user";

const initialState = null as unknown as TNewUser;

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action: PayloadAction<TNewUser>) {
      state = action.payload;
      return state;
    },
  },
});

const { set } = slice.actions;

export const setUser = (user: TNewUser): AppThunk => {
  return async (dispatch) => {
    dispatch(set(user));
  };
};

export default slice.reducer;
