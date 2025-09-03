import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppDisptach, useAppSelector } from "@/hooks/useRedux";
import { fetchPosts } from "@/store/postsSlice";

function App() {
  const dispatch = useAppDisptach();
  const { items, status, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <h1>Post Manager</h1>
        {error && <div className="text-red-500">Error : {error}</div>}
        {status === "pending" ? (
          <div>Loading posts ... </div>
        ) : (
          <div className="grid gap-4 w-full max-w-md">
            {items.map((post) => (
              <div key={post.id}>{post.title}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
