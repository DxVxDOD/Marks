import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TNotification } from "../../types/notification";

const initialState: TNotification = { value: null, status: null };

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setSuccess(state, action: PayloadAction<string>) {
      state.value = action.payload;
      state.status = "success";
    },
    setError(state, action: PayloadAction<string>) {
      state.value = action.payload;
      state.status = "error";
    },
    clearNotifications(state, action: PayloadAction<null>) {
      state.value = action.payload;
    },
  },
});

export const { setSuccess, setError, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
