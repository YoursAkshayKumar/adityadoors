import { apiSlice } from "@/redux/api/apiSlice";

export const carouselApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveCarousels: builder.query({
      query: () => `api/carousel/active`,
      providesTags: ["Carousels"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetActiveCarouselsQuery } = carouselApi;

