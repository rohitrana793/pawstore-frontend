import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: () => ({
        url: "/api/subscriber",
        method: "GET",
      }),
      providesTags: ["Subscribers"],
    }),

    addSubscriber: builder.mutation({
      query: (data) => ({
        url: "/api/subscriber",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscribers"],
    }),
  }),
});

export const { useGetSubscribersQuery, useAddSubscriberMutation } =
  subscriberApi;
