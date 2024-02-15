import { TMark, TNewMark } from "../../types/mark";
import { marksApi } from "../marksBaseApi";

const marksSliceApi = marksApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMarks: builder.query<TMark[], void>({
      query: () => "marks",
      transformResponse: (response: { data: TMark[] }, _meta, _args) =>
        response.data,
      transformErrorResponse: (
        response: { status: number | string },
        _meta,
        _args,
      ) => response.status,
      providesTags: ["Mark"],
    }),
    getMark: builder.query<TMark, string>({
      query: (id) => ({ url: `marks${id}` }),
      transformResponse: (response: { data: TMark }, _meta, _args) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      providesTags: (_result, _error, id) => [{ type: "Mark", id }],
    }),
    addNewMark: builder.mutation<TMark, TNewMark>({
      query: (newMark: TNewMark) => ({
        url: "marks",
        method: "POST",
        body: newMark,
      }),
      transformResponse: (response: { data: TMark }, _meta, _args) =>
        response.data,
      invalidatesTags: ["Mark"],
    }),
    editMark: builder.mutation<TMark, Partial<TMark> & Pick<TMark, "id">>({
      query: ({ id, ...mark }) => ({
        url: `marks/${id}`,
        method: "PUT",
        body: mark,
      }),
      transformResponse: (response: { data: TMark }, _meta, _args) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        _meta,
        _args,
      ) => response.status,
      invalidatesTags: ["Mark"],
    }),
  }),
});

export const {
  useAddNewMarkMutation,
  useEditMarkMutation,
  useGetAllMarksQuery,
  useGetMarkQuery,
} = marksSliceApi;
