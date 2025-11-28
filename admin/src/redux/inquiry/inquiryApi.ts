import { apiSlice } from "../api/apiSlice";
import { InquiryResponse, IInquiry } from "@/types/inquiry-type";

export const inquiryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllInquiries: builder.query<InquiryResponse, void>({
      query: () => `api/inquiries/all`,
      providesTags: ["AllInquiries"],
      keepUnusedDataFor: 600,
    }),
    getInquiry: builder.query<IInquiry, string>({
      query: (id) => `api/inquiries/get/${id}`,
      transformResponse: (response: { success: boolean; result: IInquiry }) => {
        return response?.result || response;
      },
      providesTags: ["getInquiry"],
    }),
    updateInquiry: builder.mutation<{ message: string }, { id: string; data: Partial<IInquiry> }>({
      query({ id, data }) {
        return {
          url: `api/inquiries/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllInquiries", "getInquiry"],
    }),
    deleteInquiry: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `api/inquiries/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllInquiries"],
    }),
  }),
});

export const {
  useGetAllInquiriesQuery,
  useGetInquiryQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} = inquiryApi;

