import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marksApi = createApi({
  reducerPath: "marksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Comment", "Mark", "User"],
  endpoints: () => ({}),
});
