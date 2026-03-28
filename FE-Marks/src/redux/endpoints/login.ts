import { TUserToFE } from "../../../../BE_Marks/src/types/user";
import { TCredentials } from "../../types/user";
import { marksApi } from "../marksBaseApi";

const authApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TUserToFE & { token: string }, TCredentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
