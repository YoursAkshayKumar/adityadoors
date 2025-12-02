import { apiSlice } from "../api/apiSlice";
import { FAQResponse, IAddFAQ, IFAQ } from "@/types/faq-type";

export const faqApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllFAQs: builder.query<FAQResponse, void>({
      query: () => `/api/faq/all`,
      providesTags: ["AllFAQs"],
      keepUnusedDataFor: 600,
    }),
    addFAQ: builder.mutation<{ message: string }, IAddFAQ>({
      query(data: IAddFAQ) {
        return {
          url: `/api/faq/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllFAQs"],
    }),
    deleteFAQ: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `/api/faq/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllFAQs"],
    }),
    editFAQ: builder.mutation<{ message: string }, { id: string; data: Partial<IAddFAQ> }>({
      query({ id, data }) {
        return {
          url: `/api/faq/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllFAQs", "getFAQ"],
    }),
    getFAQ: builder.query<IFAQ, string>({
      query: (id) => `/api/faq/get/${id}`,
      providesTags: ["getFAQ"],
    }),
  }),
});

export const {
  useGetAllFAQsQuery,
  useAddFAQMutation,
  useDeleteFAQMutation,
  useEditFAQMutation,
  useGetFAQQuery,
} = faqApi;

