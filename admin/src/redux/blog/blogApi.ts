import { apiSlice } from "../api/apiSlice";
import { BlogResponse, IAddBlog, IBlog } from "@/types/blog-type";

export const blogApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllBlogs: builder.query<BlogResponse, void>({
      query: () => `/api/blog/all`,
      providesTags: ["AllBlogs"],
      keepUnusedDataFor: 600,
    }),
    addBlog: builder.mutation<{ message: string }, IAddBlog>({
      query(data: IAddBlog) {
        return {
          url: `/api/blog/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    deleteBlog: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `/api/blog/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    editBlog: builder.mutation<{ message: string }, { id: string; data: Partial<IAddBlog> }>({
      query({ id, data }) {
        return {
          url: `/api/blog/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogs", "getBlog"],
    }),
    getBlog: builder.query<IBlog, string>({
      query: (id) => `/api/blog/get/${id}`,
      providesTags: ["getBlog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetBlogQuery,
} = blogApi;