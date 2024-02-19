import { configureStore } from "@reduxjs/toolkit";
import { marksApi } from "./marksBaseApi";
import auth from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth,
    [marksApi.reducerPath]: marksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
