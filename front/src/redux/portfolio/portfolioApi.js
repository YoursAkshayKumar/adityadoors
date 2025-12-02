import { apiSlice } from "../api/apiSlice";

export const portfolioApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActivePortfolios: builder.query({
      query: () => `/api/portfolio/active`,
      providesTags: ["Portfolios"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetActivePortfoliosQuery } = portfolioApi;

