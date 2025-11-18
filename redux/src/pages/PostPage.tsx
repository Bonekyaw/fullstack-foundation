import PostsList from "../components/PostsList";
// import CounterPage from "./CounterPage";

function PostPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* <CounterPage /> */}
      <PostsList />
    </div>
  );
}

export default PostPage;
