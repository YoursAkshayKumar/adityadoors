import { apiSlice } from "../api/apiSlice";
import {
  CarouselResponse,
  IAddCarousel,
  ICarousel,
} from "@/types/carousel-type";

export const carouselApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCarousels: builder.query<CarouselResponse, void>({
      query: () => `/api/carousel/all`,
      providesTags: ["AllCarousels"],
      keepUnusedDataFor: 600,
    }),
    addCarousel: builder.mutation<{ message: string }, IAddCarousel>({
      query(data: IAddCarousel) {
        return {
          url: `/api/carousel/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCarousels"],
    }),
    deleteCarousel: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query(id: string) {
        return {
          url: `/api/carousel/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCarousels"],
    }),
    editCarousel: builder.mutation<
      { message: string },
      { id: string; data: Partial<IAddCarousel> }
    >({
      query({ id, data }) {
        return {
          url: `/api/carousel/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCarousels", "getCarousel"],
    }),
    getCarousel: builder.query<ICarousel, string>({
      query: (id) => `/api/carousel/get/${id}`,
      providesTags: ["getCarousel"],
    }),
  }),
});

export const {
  useGetAllCarouselsQuery,
  useAddCarouselMutation,
  useDeleteCarouselMutation,
  useEditCarouselMutation,
  useGetCarouselQuery,
} = carouselApi;

