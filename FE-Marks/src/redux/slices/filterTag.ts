import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = "all";

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTag(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export const { setTag } = tagSlice.actions;

export default tagSlice.reducer;
