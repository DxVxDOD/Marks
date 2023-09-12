import { createSlice } from "@reduxjs/toolkit";
import { MarkT } from "../types/mark";
import markService from "../services/blog";
import { AppThunk } from "../app/store";
import { dispalySuccess } from "./notificationReducer";

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
      dispalySuccess(`New blog: ${newMark.title} by ${newMark.author}!`, 5000),
    );
  };
};

export const updateMark = (blog: MarkT): AppThunk => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes! + 1 };
    const response = await markService.update(updatedBlog.id!, updatedBlog);

    dispatch(like(response));
    dispatch(
      dispalySuccess(
        `${response.title} by ${response.author} has been updated!`,
        5000,
      ),
    );
  };
};

export const deleteMark = (id: string): AppThunk => {
  return async (dispatch) => {
    await markService.remove(id);
    const blogs = await markService.getAll();
    dispatch(set(blogs));
  };
};

export default slice.reducer;
