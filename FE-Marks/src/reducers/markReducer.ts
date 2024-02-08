import { createSlice } from "@reduxjs/toolkit";
import { TMark, TNewMark } from "../types/mark";
import markService from "../services/marks";
import { AppThunk } from "../app/store";
import { displaySuccess } from "./notificationReducer";

const initialState = [] as TMark[];

const slice = createSlice({
  name: "marks",
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

export const initializeMarks = (): AppThunk => {
  return async (dispatch) => {
    const marks = await markService.getAll();

    dispatch(set(marks));
  };
};

export const createMark = (mark: TNewMark): AppThunk => {
  return async (dispatch) => {
    const newMark = await markService.create(mark);
    dispatch(create(newMark));
    dispatch(displaySuccess(`New mark: ${newMark.title}!`, 5000));
  };
};

export const updateMark = (blog: TMark): AppThunk => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const response = await markService.update(updatedBlog.id, updatedBlog);
    dispatch(set(response));
    // temporary  need fix asap
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
