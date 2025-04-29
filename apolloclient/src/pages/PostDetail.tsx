import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/";
// import type { Post } from "../__generated__/types";

const POST_DETAIL = gql(`
    query Post($id: ID!) {
        post(id: $id) {
            id
            title
            content
            published
            author {
                name
            }
        }
    }
`);

export default function PostDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(POST_DETAIL, {
    variables: { id: id! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.post) return <p>Post not found</p>;

  const post = data.post;

  return (
    <>
      <h2>{post.title}</h2>
      <p>
        {" "}
        Post ID : {post.id} | Status: {post.published ? "Published" : "Draft"} |
        Author: {post.author?.name || "Unknown"}
      </p>
      <p>{post.content}</p>
    </>
  );
}
