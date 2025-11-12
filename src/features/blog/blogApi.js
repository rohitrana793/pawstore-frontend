import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/api/blog",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/api/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    addBlog: builder.mutation({
      query: (formData) => ({
        url: "/api/blog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/blog/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Blogs"],
    }),
    removeBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useRemoveBlogMutation,
} = blogApi;
