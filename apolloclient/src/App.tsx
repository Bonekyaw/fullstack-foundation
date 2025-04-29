import { useQuery } from "@apollo/client";
import { gql } from "./__generated__/";
import "./App.css";
import PostCard from "./components/Post";
import { Link } from "react-router";

export const POSTS = gql(`
  query GetAllPostsQuery {
    posts {
      id
      title
      content
      published
      author {
        id
        name
        email
      }
    }
  }
  `);

function App() {
  const { loading, error, data } = useQuery(POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Lists of All Posts</h1>
      <Link to="/post/create">Create New Post</Link>
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}

export default App;
