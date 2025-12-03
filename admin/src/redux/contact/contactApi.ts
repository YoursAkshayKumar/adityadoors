import { apiSlice } from "../api/apiSlice";

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "replied" | "closed";
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactResponse {
  success: boolean;
  result: IContact[];
}

export const contactApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllContacts: builder.query<ContactResponse, void>({
      query: () => `api/contacts/all`,
      providesTags: ["AllContacts"],
      keepUnusedDataFor: 600,
    }),
    getContact: builder.query<IContact, string>({
      query: (id) => `api/contacts/get/${id}`,
      transformResponse: (response: { success: boolean; result: IContact }) => {
        return response?.result || response;
      },
      providesTags: ["getContact"],
    }),
    updateContact: builder.mutation<{ message: string }, { id: string; data: Partial<IContact> }>({
      query({ id, data }) {
        return {
          url: `api/contacts/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllContacts", "getContact"],
    }),
    deleteContact: builder.mutation<{ success: boolean; message: string }, string>({
      query(id: string) {
        return {
          url: `api/contacts/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllContacts"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;

