import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../types/user";
import { AppThunk } from "../app/store.ts";
import genericService from "../services/genericService.ts";

const baseUrl = "/api/users";

const initialState = [] as TUser[];

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

export const createUsers = (user: TUser): AppThunk => {
  return async (dispatch) => {
    const newUser = await genericService.create(user, baseUrl);
    dispatch(create(newUser));
  };
};

export default slice.reducer;
