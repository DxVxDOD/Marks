import { createSlice } from "@reduxjs/toolkit";
import { MarkT } from "../types/mark";
import markService from "../services/marks";
import { AppThunk } from "../app/store";
import { displaySuccess } from "./notificationReducer";

const initialState = [] as MarkT[];

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    set(state, action) {
      state = action.payload;
      return state;
    },
    create(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const mark = action.payload;
      const markToUpdate = state.find((state) => state.id === mark.id)!;
      const updated = { ...markToUpdate, likes: markToUpdate?.likes! + 1 };
      return state.map((s) => (s.id === updated.id ? updated : s));
    },
  },
});

const { set, create, like } = slice.actions;

export const initializeMarks = (): AppThunk => {
  return async (dispatch) => {
    const marks = await markService.getAll();
    dispatch(set(marks));
  };
};

export const createMark = (mark: MarkT): AppThunk => {
  return async (dispatch) => {
    const newMark = await markService.create(mark);
    dispatch(create(newMark));
    dispatch(
      displaySuccess(`New mark: ${newMark.title}!`, 5000),
    );
  };
};

export const updateMark = (blog: MarkT): AppThunk => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes! + 1 };
    const response = await markService.update(updatedBlog.id!, updatedBlog);
    dispatch(like(response));
  };
};

export const deleteMark = (id: string): AppThunk => {
  return async (dispatch) => {
    await markService.remove(id);
    const mark = await markService.getAll();
    dispatch(set(mark));
  };
};

export default slice.reducer;
