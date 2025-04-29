import { useQuery } from "@apollo/client";
import { gql } from "./__generated__/";
import "./App.css";

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
      {data?.posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Published: {post.published ? "Yes" : "No"}</p>
          <p>
            Author: {post.author?.name} ({post.author?.email})
          </p>
        </div>
      ))}
    </>
  );
}

export default App;
