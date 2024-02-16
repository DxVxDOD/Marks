import { TCredentials, TLoggedUser } from "../../types/user";
import { marksApi } from "../marksBaseApi";
import { clearCredentials, setCredentials } from "../slices/auth";

const authApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoggedUser & { token: string }, TCredentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: {
                username: data.username,
                name: data.name,
              },
              token: data.token,
            }),
          );
        } catch (error) {
          dispatch(clearCredentials());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
