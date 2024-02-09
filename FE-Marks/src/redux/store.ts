import { configureStore } from "@reduxjs/toolkit";
import notifications from "./slices/notifications";
import { marksApi } from "./marksBaseApi";

export const store = configureStore({
  reducer: {
    notifications,
    [marksApi.reducerPath]: marksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
