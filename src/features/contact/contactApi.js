import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/api/contact",
        method: "GET",
      }),
      providesTags: ["Contacts"],
    }),

    addContact: builder.mutation({
      query: (data) => ({
        url: "/api/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const { useGetContactsQuery, useAddContactMutation } = contactApi;
