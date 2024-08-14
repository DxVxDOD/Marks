import { TCredentials } from "../../types/user";
import { TUserToFE } from "../../../../BE_Marks/src/types/user";
import { marksApi } from "../marksBaseApi";
import { clearCredentials, setCredentials } from "../slices/auth";

const authApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TUserToFE & { token: string }, TCredentials>({
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
                createdAt: data.createdAt,
                marks_length: data.marks_length,
                email: data.email,
                token: data.token,
              },
            }),
          );
          window.localStorage.setItem("logged_in_user", JSON.stringify(data));
        } catch (error) {
          console.log("clear");
          dispatch(clearCredentials());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
