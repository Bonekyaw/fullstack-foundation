import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "@/store/postsSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

function App() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.posts);

  const [newPost, setNewPost] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
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
      await dispatch(addPost({ title: newPost })).unwrap();
      setNewPost("");
    } catch (error) {
      alert("Failed to add new post: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (id: string) => {
    if (!editText.trim()) return;
    try {
      await dispatch(updatePost({ id, title: editText })).unwrap();
      setEditId(null);
      setEditText("");
    } catch (error) {
      alert("Failed to update post: " + error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await dispatch(deletePost(id)).unwrap();
    } catch (error) {
      alert("Failed to delete post: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
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
        {items.map((post) => (
          <Card key={post.id} className="bg-white shadow-md">
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
                  <Button onClick={() => handleUpdatePost(post.id)}>
                    Save
                  </Button>
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
                  <Button
                    variant="destructive"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
