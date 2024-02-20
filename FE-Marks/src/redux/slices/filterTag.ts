import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { string } from "prop-types";

const initialState = {
  tag: "all",
  on: true,
};

type TTag = typeof initialState;

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTag(state, { payload: { on, tag } }: PayloadAction<TTag>) {
      (state.on = on), (state.tag = tag);
    },
  },
});

export const { setTag } = tagSlice.actions;

export default tagSlice.reducer;
