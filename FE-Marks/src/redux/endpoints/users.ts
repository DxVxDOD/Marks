import { TNewUser, TUser } from "../../types/user";
import { marksApi } from "../marksBaseApi";

const userApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<TUser[], void>({
      query: () => "users",
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      providesTags: ["User"],
    }),
    getUser: builder.query<TUser, string>({
      query: (id) => ({ url: `users/${id}` }),
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    addNewUser: builder.mutation<TUser, TNewUser>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation<TUser, TUser & Pick<TUser, "id">>({
      query: ({ id, ...user }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: user,
      }),
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useEditUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
} = userApi;
