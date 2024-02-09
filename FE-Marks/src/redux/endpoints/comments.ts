import { TComment } from "../../types/comment";
import { marksApi } from "../marksBaseApi";

const commentApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<TComment, string>({
      query: () => "comments",
    }),
  }),
});

export const { useGetCommentsQuery } = commentApi;
