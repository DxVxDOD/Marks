import { createSlice } from "@reduxjs/toolkit";
import { TNewComment } from "../types/comment";
import genericService from "../services/genericService.ts";

const baseUrl = "/api/comments";

const initialState = [] as TNewComment[];

const slice = createSlice({
  name: "comment",
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

export const initializeComments = (): AppThunk => {
  return async (dispatch) => {
    const comments = await genericService.getAll(baseUrl);
    dispatch(set(comments));
  };
};

export const createComment = (comment: TNewComment): AppThunk => {
  return async (dispatch) => {
    const newComment = await genericService.create(comment, baseUrl);
    dispatch(create(newComment));
  };
};

export default slice.reducer;
