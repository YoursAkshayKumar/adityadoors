import { apiSlice } from "../api/apiSlice";

export const inquiryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addInquiry: builder.mutation({
      query: (data) => ({
        url: "api/inquiries/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddInquiryMutation } = inquiryApi;

