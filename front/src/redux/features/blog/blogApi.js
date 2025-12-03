import { apiSlice } from "@/redux/api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => `api/blog/all`,
      providesTags: ["Blog"],
      keepUnusedDataFor: 600,
    }),
    getBlog: builder.query({
      query: (id) => `api/blog/get/${id}`,
      providesTags: (result, error, arg) => [{ type: "Blog", id: arg }],
    }),
    getBlogBySlug: builder.query({
      query: (slug) => `api/blog/slug/${encodeURIComponent(slug)}`,
      providesTags: (result, error, arg) => [{ type: "Blog", id: arg }],
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogQuery, useGetBlogBySlugQuery } = blogApi;