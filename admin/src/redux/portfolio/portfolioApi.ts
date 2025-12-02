import { apiSlice } from "../api/apiSlice";
import { PortfolioResponse, IAddPortfolio, IPortfolio } from "@/types/portfolio-type";

export const portfolioApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllPortfolios: builder.query<PortfolioResponse, void>({
      query: () => `/api/portfolio/all`,
      providesTags: ["AllPortfolios"],
      keepUnusedDataFor: 600,
    }),
    addPortfolio: builder.mutation<{ message: string }, IAddPortfolio>({
      query(data: IAddPortfolio) {
        return {
          url: `/api/portfolio/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllPortfolios"],
    }),
    deletePortfolio: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `/api/portfolio/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllPortfolios"],
    }),
    editPortfolio: builder.mutation<{ message: string }, { id: string; data: Partial<IAddPortfolio> }>({
      query({ id, data }) {
        return {
          url: `/api/portfolio/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllPortfolios", "getPortfolio"],
    }),
    getPortfolio: builder.query<IPortfolio, string>({
      query: (id) => `/api/portfolio/get/${id}`,
      providesTags: ["getPortfolio"],
    }),
  }),
});

export const {
  useGetAllPortfoliosQuery,
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
  useEditPortfolioMutation,
  useGetPortfolioQuery,
} = portfolioApi;

