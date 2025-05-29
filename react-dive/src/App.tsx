import { useActionState, useOptimistic, startTransition } from "react";
import "./App.css";
// import Submit from "./components/Submit";

type PostType = {
  id: string;
  title: string;
  votes: number;
};

async function createPost(_previous: unknown, formData: FormData) {
  const title = formData.get("title") as string;

  // Validation logic
  if (title === "hello") {
    return {
      error: "You cannot create a post with the title 'hello'.",
      title,
    };
  }

  const res = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, votes: 0 }),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  const post = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
  return post;
}

export default function App() {
  const [createdPost, createPostAction, isPending] = useActionState(
    createPost,
    {}
  );

  const [voteState, increaseVoteAction, isVoting] = useActionState(
    incrementVotes,
    null
  );

  async function incrementVotes(
    _previous: PostType | null,
    formData: FormData
  ) {
    const postId = formData.get("id") as string;
    const votes = formData.get("votes") || 0;
    const currentVotes = _previous ? _previous.votes : Number(votes);

    startTransition(() => {
      addOptimistic(+currentVotes + 1);
    });

    try {
      const res = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: +currentVotes + 1 }),
      });
      if (!res.ok) {
        throw new Error("Failed to increment votes");
      }
      const post = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
      return post;
    } catch (error) {
      console.log("Error incrementing votes:", error);
      return {
        id: postId,
        votes,
      };
    }
  }

  const [optimisticVotes, addOptimistic] = useOptimistic(
    voteState ? voteState.votes : createdPost?.votes || 0,
    (_state, votes) => votes
  );

  return (
    <div className="App">
      <h1>Create New Post</h1>
      <form action={createPostAction} className="row">
        <input
          type="text"
          name="title"
          placeholder="Enter Post Title"
          defaultValue={createdPost?.title || ""}
        />
        {createdPost?.error && <p>{createdPost.error}</p>}
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Post"}
        </button>
        {/* <Submit /> */}
      </form>
      {createdPost.id && (
        <div>
          <h2>Post Created Successfully!</h2>
          <p>Post ID: {createdPost.id}</p>
          <h2>Post Title: {createdPost.title}</h2>
          <p>Votes: {optimisticVotes || createdPost.votes || 0}</p>
          <form>
            <input type="hidden" name="id" value={createdPost.id} />
            <input type="hidden" name="votes" value={String(optimisticVotes)} />
            <button formAction={increaseVoteAction} disabled={isVoting}>
              {isVoting ? "Voting..." : "+ Votes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
