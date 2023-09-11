import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";

export interface notificationSlice {
  value: string | null;
  status: string | null;
}

const initialState: notificationSlice = { value: null, status: null };

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSuccess(state, action: PayloadAction<string>) {
      state.value = action.payload;
      state.status = "success";
      return state;
    },
    setError(state, action: PayloadAction<string>) {
      state.value = action.payload;
      state.status = "error";
      return state;
    },
    clear(state, action: PayloadAction<null>) {
      state.value = action.payload;
      return state;
    },
  },
});

const { setSuccess, clear, setError } = slice.actions;

export const dispalySuccess = (message: string, time: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setSuccess(message));
    setTimeout(() => {
      dispatch(clear(null));
    }, time);
  };
};

export const dispalyError = (message: string, time: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setError(message));
    setTimeout(() => {
      dispatch(clear(null));
    }, time);
  };
};

export default slice.reducer;
