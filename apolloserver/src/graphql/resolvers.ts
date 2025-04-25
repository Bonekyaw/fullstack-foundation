import type { Resolvers } from "../types.js";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
} from "../services/postService.js";

export const resolvers: Resolvers = {
  Query: {
    posts: async () => {
      return getPosts();
    },
    post: async (_, args, contextValue) => {
      // const token = contextValue.token;
      return getPost(args.id);
    },
  },
  Mutation: {
    createPost: async (_, { input }) => {
      // Must validate the input

      try {
        if (!input) {
          throw new Error("Input is required to create a post");
        }
        const response = await createPost(input);
        return {
          code: 200,
          success: true,
          message: "Post created successfully",
          post: response,
        };
      } catch (error: any) {
        return {
          code: 500,
          success: false,
          message: error.extensions.response.body || "Internal server error",
          post: null,
        };
      }
    },
    deletePost: async (_, { id }) => {
      try {
        await deletePost(id);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
