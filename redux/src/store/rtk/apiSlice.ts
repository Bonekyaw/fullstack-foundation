import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../postsSlice";

const API_URL = "http://localhost:4000";

// Get /posts - Get all posts
// Get /posts/:id - Get post by ID
// Post /posts - Create new post
// Patch /posts/:id - Update post partially by ID
// Delete /posts/:id - Delete post by ID

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    addNewPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } =
  apiSlice;
