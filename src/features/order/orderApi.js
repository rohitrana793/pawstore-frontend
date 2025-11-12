import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/api/order",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getUserOrder: builder.query({
      query: () => ({
        url: "/api/order/user",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/api/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    generateSignature: builder.mutation({
      query: (data) => ({
        url: "/api/order/generate-signature",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetUserOrderQuery,
  useAddOrderMutation,
  useGenerateSignatureMutation,
} = orderApi;
