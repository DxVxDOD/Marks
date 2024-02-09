import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TNewComment } from "../../types/comment";

const baseUrl = "/api/comments";

const initialState: TNewComment[] = [];

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    set(state, action: PayloadAction<TNewComment[]>) {
      state = action.payload;
    },
    appendComment(state, action: PayloadAction<TNewComment>) {
      state.push(action.payload);
    },
  },
});
