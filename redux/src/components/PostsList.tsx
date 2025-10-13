import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import {
  fetchPosts,
  addPost,
  // selectAllPosts,
  // selectPostsByUser,
  selectPostIds,
  selectPostsStatus,
  selectPostsError,
} from "@/store/postsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostDetail from "./PostDetail";

function PostsList() {
  const dispatch = useAppDispatch();
  // const { status, error } = useAppSelector((state) => state.posts);
  // const posts = useAppSelector((state) => selectPostsByUser(state, "user2"));
  //   const posts = useAppSelector(selectAllPosts);
  //   const userPosts = posts.filter((post) => post.userId === "user2");

  const postIds = useAppSelector(selectPostIds);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);

  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);
    try {
      await dispatch(addPost({ title: newPost, userId: "user2" })).unwrap();
      setNewPost("");
    } catch (error) {
      alert("Failed to add new post: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">📌 Post Manager</h1>

      <div className="flex gap-2 mb-6 w-full max-w-md">
        <Input
          placeholder="Write a new post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Button onClick={handleAddPost} disabled={loading}>
          Add {loading && <Loader2 className="animate-spin h-2 w-2" />}
        </Button>
      </div>

      {status === "pending" && (
        <div className="flex items-center gap-2 text-blue-600 mb-4">
          <Loader2 className="animate-spin h-5 w-5" />
          <span>Loading posts...</span>
        </div>
      )}

      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="grid gap-4 w-full max-w-md">
        {postIds.map((postId) => (
          <PostDetail key={postId} postId={postId} />
        ))}
      </div>
    </>
  );
}

export default PostsList;
