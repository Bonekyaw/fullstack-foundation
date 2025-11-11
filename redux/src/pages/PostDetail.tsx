import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import type { Post } from "@/store/postsSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { updatePost, deletePost } from "@/store/postsSlice";
import { useParams } from "react-router";
import { useGetPostQuery } from "@/store/rtk/postsSlice";

function PostDetailPage() {
  const { pid } = useParams();
  const dispatch = useAppDispatch();
  // const post = useAppSelector((state) => selectPostById(state, pid!));
  const { data: post, isLoading, isSuccess } = useGetPostQuery(pid!);

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleUpdatePost = async () => {
    if (!editText.trim()) return;
    try {
      await dispatch(updatePost({ id: pid, title: editText })).unwrap();
      setEditId(null);
      setEditText("");
    } catch (error) {
      alert("Failed to update post: " + error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePost(pid!)).unwrap();
    } catch (error) {
      alert("Failed to delete post: " + error);
    }
  };

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess && post) {
    content = (
      <Card className="bg-white shadow-md">
        <CardHeader>
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

  return <>{content}</>;
}

export default PostDetailPage;
