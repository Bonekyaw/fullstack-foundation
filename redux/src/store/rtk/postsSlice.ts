import { apiSlice } from "./apiSlice";
import type { Post } from "../postsSlice";

// Get /posts - Get all posts
// Get /posts/:id - Get post by ID
// Post /posts - Create new post
// Patch /posts/:id - Update post partially by ID
// Delete /posts/:id - Delete post by ID

export const apiSliceWithPosts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      // providesTags: ["Post"],
      providesTags: (result = []) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post", id } as const)),
      ],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH", // PUT
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSliceWithPosts;
