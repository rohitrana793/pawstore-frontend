import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const breedApi = createApi({
  reducerPath: "breedApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getBreed: builder.query({
      query: () => ({
        url: "/api/breed",
        method: "GET",
      }),
      providesTags: ["Breeds"],
    }),
    getBreedById: builder.query({
      query: (id) => ({
        url: `/api/breed/${id}`,
        method: "GET",
      }),
      providesTags: ["Breeds"],
    }),
    addBreed: builder.mutation({
      query: (formData) => ({
        url: "/api/breed",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Breeds"],
    }),
    updateBreed: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/breed/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Breeds"],
    }),
    removeBreed: builder.mutation({
      query: (id) => ({
        url: `/api/breed/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Breeds"],
    }),
  }),
});

export const {
  useGetBreedQuery,
  useGetBreedByIdQuery,
  useAddBreedMutation,
  useUpdateBreedMutation,
  useRemoveBreedMutation,
} = breedApi;
