import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Post } from "@/store/postsSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  updatePost,
  deletePost,
  // selectPostById
} from "@/store/postsSlice";
import { Link } from "react-router";

// function PostItem({ postId }: { postId: string }) {
function PostItem({ post }: { post: Post }) {
  const dispatch = useAppDispatch();
  // const post = useAppSelector((state) => selectPostById(state, postId));

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleUpdatePost = async () => {
    if (!editText.trim()) return;
    try {
      await dispatch(updatePost({ id: post.id, title: editText })).unwrap();
      setEditId(null);
      setEditText("");
    } catch (error) {
      alert("Failed to update post: " + error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePost(post.id)).unwrap();
    } catch (error) {
      alert("Failed to delete post: " + error);
    }
  };

  return (
    <Card key={post.id} className="bg-white shadow-md">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>
            {editId === post.id ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              post.title
            )}
          </CardTitle>
          <Link to={`/${post.id}`} className="text-sm text-blue-400">
            See more
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex gap-2">
        {editId === post.id ? (
          <>
            <Button onClick={handleUpdatePost}>Save</Button>
            <Button variant="secondary" onClick={() => setEditId(null)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setEditId(post.id);
                setEditText(post.title);
              }}
            >
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default PostItem;
