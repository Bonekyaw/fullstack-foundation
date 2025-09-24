import {
  createSlice,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from ".";
import { createAppAsyncThunk } from "./withTypes";

const POST_API_URL = "http://localhost:4000/posts";

export interface Post {
  id: string;
  title: string;
  userId: string;
}

interface PostsState {
  items: Post[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: null,
};

// dispatch(fetchPosts()) // type: "posts/fetchPosts"

export const fetchPosts = createAppAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(POST_API_URL);
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay in dev mode
    return response.data;
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState());
      if (postsStatus !== "idle") {
        return false;
      }
    },
  }
);

// 1. type: "posts/fetchPosts/pending"
// 2. type: "posts/fetchPosts/fulfilled", payload: response.data
// OR type: "posts/fetchPosts/rejected" , payload: response.data

export const addPost = createAppAsyncThunk(
  "posts/addPost",
  async (post: Omit<Post, "id">) => {
    const response = await axios.post(POST_API_URL, post);
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay in dev mode
    return response.data;
  }
);

// Update post ( patch / put )
export const updatePost = createAppAsyncThunk(
  "posts/updatePost",
  async (post: Partial<Post>) => {
    const response = await axios.patch(`${POST_API_URL}/${post.id}`, post);
    return response.data;
  }
);

// Delete post
export const deletePost = createAppAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await axios.delete(`${POST_API_URL}/${id}`);
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add new post";
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        // const { id, title } = action.payload;
        // const existingPost = state.items.find((post) => post.id === id);
        // if (existingPost) {
        //   existingPost.title = title;
        // }

        const index = state.items.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectAllPosts = (state: RootState) => state.posts.items;

// Wrong way
// export const selectPostsByUser = (state: RootState, userId: string) => {
//   const allPosts = selectAllPosts(state);
//   return allPosts.filter((post) => post.userId === userId);
// };

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
