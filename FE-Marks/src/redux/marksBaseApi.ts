import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const marksApi = createApi({
  reducerPath: "marksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const user = (getState() as RootState).auth.user;

      if (user) {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Comment", "Mark", "User"],
  endpoints: () => ({}),
});
