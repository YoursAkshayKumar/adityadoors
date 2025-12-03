import { apiSlice } from "../api/apiSlice";

export const measurementApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addMeasurement: builder.mutation({
      query: (data) => ({
        url: "api/measurements/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Measurements"],
    }),
    getAllMeasurements: builder.query({
      query: () => "api/measurements/all",
      providesTags: ["Measurements"],
    }),
    getSingleMeasurement: builder.query({
      query: (id) => `api/measurements/get/${id}`,
      providesTags: ["Measurements"],
    }),
    updateMeasurement: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/measurements/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Measurements"],
    }),
    deleteMeasurement: builder.mutation({
      query: (id) => ({
        url: `api/measurements/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Measurements"],
    }),
  }),
});

export const {
  useAddMeasurementMutation,
  useGetAllMeasurementsQuery,
  useGetSingleMeasurementQuery,
  useUpdateMeasurementMutation,
  useDeleteMeasurementMutation,
} = measurementApi;

