import { Link } from "react-router";
import type { Post } from "../__generated__/types";
import { gql } from "../__generated__/";
import { useMutation } from "@apollo/client";
import { POSTS } from "../App";

const DELETE_POST = gql(`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`);

export default function PostCard({ post }: { post: Post }) {
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    variables: { id: post.id },
    refetchQueries: [{ query: POSTS }],
  });
  return (
    <>
      <h3>{post.title}</h3>
      <div className="row">
        <p>{post.content}</p>
        <p>Published: {post.published ? "Yes" : "No"}</p>
        <p>
          Author: {post.author?.name || "Unknown"} ({post.author?.email})
        </p>
        <Link to={`/post/${post.id}`}>See More</Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this post?")) {
              deletePost();
            }
          }}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
}
