import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (q) => ({
        url: "/api/product",
        params: q,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/api/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/product/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useAddReviewMutation,
} = productApi;
