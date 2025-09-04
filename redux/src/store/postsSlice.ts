import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from ".";
import { createAppAsyncThunk } from "./withTypes";

const POST_API_URL = "http://localhost:4000/posts";

export interface Post {
  id: string;
  title: string;
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
    const response = await axios.post(POST_API_URL + "ss", post);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay in dev mode
    return response.data;
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
      });
  },
});

export default postsSlice.reducer;

export const selectPostsStatus = (state: RootState) => state.posts.status;
