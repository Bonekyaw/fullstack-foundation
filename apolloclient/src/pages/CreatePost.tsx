import { useMutation } from "@apollo/client";
import { gql } from "../__generated__/";
import { useState } from "react";
import { useNavigate } from "react-router";
import { POSTS } from "../App";

const CREATE_POST = gql(`
    mutation CreatePost($input: PostInput) {
        createPost(input: $input) {
            code
            success
            message
            post {
                id
                title
                content
                published
                author {
                    name
                }
            }
        }
    }
    `);

export default function CreatePost() {
  const navigate = useNavigate();
  // Use react-hook-form or useReducer for form state management
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    published: false,
    authorId: "",
  });

  const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
    variables: {
      input: {
        authorId: "21fdfa0d-ca6a-46a0-8e6a-687540fb0399", // Replace with actual author ID
        content: formState.content,
        published: formState.published,
        title: formState.title,
      },
    },
    refetchQueries: [{ query: POSTS }],
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={formState.content}
            onChange={(e) =>
              setFormState({ ...formState, content: e.target.value })
            }
            required
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="published">Published</label>
          <input
            type="checkbox"
            id="published"
            checked={formState.published}
            onChange={(e) =>
              setFormState({ ...formState, published: e.target.checked })
            }
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <p>Error: {error.message}</p>}
        {data && data.createPost.success && <p>Post created successfully!</p>}
      </form>
    </div>
  );
}
