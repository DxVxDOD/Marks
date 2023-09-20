import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { AppThunk } from "../app/store";
import genericService from "../services/genericService.ts";

const baseUrl = "/api/users";

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
    const users = await genericService.getAll(baseUrl);
    dispatch(set(users));
  };
};

export const createUsers = (user: User): AppThunk => {
  return async (dispatch) => {
    const newUser = await genericService.create(user,baseUrl);
    dispatch(create(newUser));
  };
};

export default slice.reducer;
