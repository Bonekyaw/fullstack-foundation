import { memo, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddNewPostMutation } from "@/store/rtk/postsSlice";

function PostInput() {
  const [addNewPost, { isLoading: isAddingNewPostLoading }] =
    useAddNewPostMutation();

  const [newPost, setNewPost] = useState("");

  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    // setLoading(true);
    try {
      setNewPost("");
      // await dispatch(addPost({ title: newPost, userId: "user2" })).unwrap();
      await addNewPost({ title: newPost, userId: "user2" }).unwrap();
    } catch (error) {
      alert("Failed to add new post: " + error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-6 w-full max-w-md">
      <Input
        placeholder="Write a new post..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <Button onClick={handleAddPost} disabled={isAddingNewPostLoading}>
        Add{" "}
        {isAddingNewPostLoading && <Loader2 className="animate-spin h-2 w-2" />}
      </Button>
    </div>
  );
}

export default memo(PostInput);
