import { isComment } from "../../type_guard/comments";
import { TComment, TNewComment } from "../../types/comment";
import { marksApi } from "../marksBaseApi";

const commentApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<TComment[], void>({
      query: () => "comments",
      providesTags: ["Comment"],
      transformResponse: (response: { data: TComment[] }, _meta, _arg) => {
        response.data.forEach(isComment);

        return response.data;
      },
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
    }),
    getComment: builder.query<TComment, string>({
      query: (id) => ({ url: `comments${id}` }),
      transformResponse: (response: { data: TComment }, _meta, _arg) => {
        if (!isComment(response.data)) {
          throw new Error("Malformed response");
        }
        return response.data;
      },
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      providesTags: (_result, _error, id) => [{ type: "Comment", id }],
    }),
    addNewComment: builder.mutation<TComment, TNewComment>({
      query: (newComment: TNewComment) => ({
        url: "comments",
        method: "POST",
        body: newComment,
      }),
      transformResponse: (response: { data: TComment }, _meta, _args) => {
        if (!isComment(response.data)) {
          throw new Error("Malformed response");
        }
        return response.data;
      },
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
      transformResponse: (response: { data: TComment }, _meta, _args) => {
        if (!isComment(response.data)) {
          throw new Error("Malformed response");
        }
        return response.data;
      },
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddNewCommentMutation,
  useEditCommentMutation,
  useGetCommentQuery,
} = commentApi;
