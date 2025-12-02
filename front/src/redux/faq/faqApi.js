import { apiSlice } from "../api/apiSlice";

export const faqApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveFAQs: builder.query({
      query: () => `/api/faq/active`,
      providesTags: ["FAQs"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetActiveFAQsQuery } = faqApi;

