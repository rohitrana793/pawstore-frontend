import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getBreed: builder.query({
      query: () => ({
        url: "/api/admin/breed",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getProduct: builder.query({
      query: () => ({
        url: "/api/admin/product",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getBlog: builder.query({
      query: () => ({
        url: "/api/admin/blog",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getOrder: builder.query({
      query: () => ({
        url: "/api/admin/order",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getSubscriber: builder.query({
      query: () => ({
        url: "/api/admin/subscriber",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getSubscriber: builder.query({
      query: () => ({
        url: "/api/admin/subscriber",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getContact: builder.query({
      query: () => ({
        url: "/api/admin/contact",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetBreedQuery,
  useGetProductQuery,
  useGetBlogQuery,
  useGetOrderQuery,
  useGetSubscriberQuery,
  useGetContactQuery,
} = adminApi;
