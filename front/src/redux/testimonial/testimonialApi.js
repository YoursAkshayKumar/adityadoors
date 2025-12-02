import { apiSlice } from "../api/apiSlice";

export const testimonialApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveTestimonials: builder.query({
      query: (category) => {
        const params = category ? `?category=${encodeURIComponent(category)}` : '';
        return `/api/testimonial/active${params}`;
      },
      providesTags: (result, error, category) => [
        { type: "Testimonials", id: category || "all" },
      ],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetActiveTestimonialsQuery } = testimonialApi;

