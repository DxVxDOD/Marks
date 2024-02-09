import { TComment, TNewComment } from "../../types/comment";
import { marksApi } from "../marksBaseApi";

const commentApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<TComment[], void>({
      query: () => "comments",
      providesTags: ["Comment"],
      transformResponse: (response: { data: TComment[] }, _meta, _arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
    }),
    getComment: builder.query<TComment, string>({
      query: (id) => ({ url: `comments${id}` }),
      transformResponse: (response: { data: TComment }, _meta, _arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      providesTags: (_result, _error, id) => [{ type: "Comment", id }],
    }),
    addNewComment: builder.mutation({
      query: (newComment: TNewComment) => ({
        url: "comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),
    editComment: builder.mutation<
      TComment,
      Partial<TComment> & Pick<TComment, "id">
    >({
      query: ({ id, ...comment }) => ({
        url: `comments/${id}`,
        method: "PUT",
        body: comment,
      }),
      transformResponse: (response: { data: TComment }, _meta, _args) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery, useAddNewCommentMutation } = commentApi;
