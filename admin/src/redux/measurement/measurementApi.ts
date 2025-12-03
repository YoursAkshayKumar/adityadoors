import { apiSlice } from "../api/apiSlice";

export interface IMeasurement {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

export interface MeasurementResponse {
  success: boolean;
  result: IMeasurement[];
}

export const measurementApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllMeasurements: builder.query<MeasurementResponse, void>({
      query: () => `api/measurements/all`,
      providesTags: ["AllMeasurements"],
      keepUnusedDataFor: 600,
    }),
    getMeasurement: builder.query<IMeasurement, string>({
      query: (id) => `api/measurements/get/${id}`,
      transformResponse: (response: { success: boolean; result: IMeasurement }) => {
        return response?.result || response;
      },
      providesTags: ["getMeasurement"],
    }),
    updateMeasurement: builder.mutation<{ message: string }, { id: string; data: Partial<IMeasurement> }>({
      query({ id, data }) {
        return {
          url: `api/measurements/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllMeasurements", "getMeasurement"],
    }),
    deleteMeasurement: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `api/measurements/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllMeasurements"],
    }),
  }),
});

export const {
  useGetAllMeasurementsQuery,
  useGetMeasurementQuery,
  useUpdateMeasurementMutation,
  useDeleteMeasurementMutation,
} = measurementApi;

