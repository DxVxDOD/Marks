import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";
import userService from "../services/user";
import { AppThunk } from "../app/store";

const initialState = [] as User[];

const slice = createSlice({
  name: "userArray",
  initialState,
  reducers: {
    set(state, action) {
      state = action.payload;
      return state;
    },
    create(state, action) {
      state.push(action.payload);
    },
  },
});

const { set, create } = slice.actions;

export const initializeUsers = (): AppThunk => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(set(users));
  };
};

export const createUsers = (user: User): AppThunk => {
  return async (dispatch) => {
    const newUser = await userService.create(user);
    dispatch(create(newUser));
  };
};

export default slice.reducer;
