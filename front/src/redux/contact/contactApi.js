import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (data) => ({
        url: "api/contacts/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
    getAllContacts: builder.query({
      query: () => "api/contacts/all",
      providesTags: ["Contacts"],
    }),
    getSingleContact: builder.query({
      query: (id) => `api/contacts/get/${id}`,
      providesTags: ["Contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/contacts/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `api/contacts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetAllContactsQuery,
  useGetSingleContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;

