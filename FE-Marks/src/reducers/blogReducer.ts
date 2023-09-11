import { createSlice } from "@reduxjs/toolkit";
import { BlogT } from "../types/blog";
import blogService from "../services/blog";
import { AppThunk } from "../app/store";
import { dispalySuccess } from "./notificationReducer";

const initialState = [] as BlogT[];

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
      const blog = action.payload;
      const blogToUpdate = state.find((state) => state.id === blog.id)!;
      const updated = { ...blogToUpdate, likes: blogToUpdate?.likes! + 1 };
      return state.map((s) => (s.id === updated.id ? updated : s));
    },
  },
});

const { set, create, like } = slice.actions;

export const initializeBlogs = (): AppThunk => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (blog: BlogT): AppThunk => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(create(newBlog));
    dispatch(
      dispalySuccess(`New blog: ${newBlog.title} by ${newBlog.author}!`, 5000),
    );
  };
};

export const addUpdatedBlog = (blog: BlogT): AppThunk => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes! + 1 };
    const response = await blogService.update(updatedBlog.id!, updatedBlog);

    dispatch(like(response));
    dispatch(
      dispalySuccess(
        `${response.title} by ${response.author} has been updated!`,
        5000,
      ),
    );
  };
};

export const deleteBlog = (id: string): AppThunk => {
  return async (dispatch) => {
    await blogService.remove(id);
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export default slice.reducer;
